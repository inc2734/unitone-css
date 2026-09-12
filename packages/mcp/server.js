#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { compile } from "sass";
import postcss from "postcss";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const primitiveInputSchema = z.object({
  name: z.string().min(1),
});

const utilityInputSchema = z.object({
  name: z.string().min(1),
});

function getRepoRoot() {
  return process.env.UNITONE_CSS_ROOT || process.cwd();
}

function listDirectories(root) {
  if (!fs.existsSync(root)) {
    return [];
  }

  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort();
}

function listFiles(root) {
  if (!fs.existsSync(root)) {
    return [];
  }

  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort();
}

function listPrimitives(repoRoot) {
  return listDirectories(path.join(repoRoot, "src", "layout-primitives"));
}

function getPrimitive(repoRoot, name) {
  if (!listPrimitives(repoRoot).includes(name)) {
    throw new Error(`Unknown primitive: ${name}`);
  }

  const primitiveRoot = path.join(repoRoot, "src", "layout-primitives", name);
  const files = listFiles(primitiveRoot).map((file) =>
    path.posix.join("src", "layout-primitives", name, file)
  );

  return {
    name,
    files,
    hasReactWrapper: files.some((file) => file.endsWith("/react.jsx")),
    hasBehaviorModule: files.some((file) => file.endsWith("/behavior.js")),
  };
}

function listBehaviors(repoRoot) {
  const behaviorRoot = path.join(repoRoot, "src", "behaviors");

  return listFiles(behaviorRoot)
    .filter((file) => file.startsWith("_") || file.endsWith(".js"))
    .map((file) => file.replace(/^_/, "").replace(/\.(scss|js)$/, ""))
    .filter((name, index, all) => all.indexOf(name) === index)
    .sort();
}

function compileStylesheet(repoRoot, relativePath) {
  const filePath = path.resolve(repoRoot, relativePath);
  const result = compile(filePath, {
    sourceMap: true,
    sourceMapIncludeSources: true,
  });

  // Keep generated CSS in memory and map results back to the Sass source.
  return postcss.parse(result.css, {
    from: filePath,
    map: { prev: result.sourceMap },
  });
}

function getVariables(repoRoot) {
  const variableRoot = path.join(repoRoot, "src", "variables");
  const settingsRoot = path.join(repoRoot, "src", "settings");
  const variableFiles = listFiles(variableRoot).map((file) =>
    path.posix.join("src", "variables", file)
  );
  const settingsFiles = listFiles(settingsRoot).map((file) =>
    path.posix.join("src", "settings", file)
  );

  const css = compileStylesheet(repoRoot, "src/settings/_index.scss");
  const cssCustomPropertyCandidates = new Set();
  css.walkDecls((declaration) => {
    if (declaration.prop.startsWith("--")) {
      cssCustomPropertyCandidates.add(declaration.prop);
    }
    for (const name of declaration.value.match(/--[a-z0-9_-]+/gi) || []) {
      cssCustomPropertyCandidates.add(name);
    }
  });
  css.walkAtRules("property", (rule) => {
    cssCustomPropertyCandidates.add(rule.params);
  });

  return {
    variableFiles,
    settingsFiles,
    cssCustomPropertyCandidates: [...cssCustomPropertyCandidates].sort(),
    scannedFileCount: variableFiles.length + settingsFiles.length,
  };
}

function getUtilityFiles(repoRoot) {
  const utilityRoot = path.join(repoRoot, "src", "utilities");
  return listFiles(utilityRoot).map((file) => path.posix.join("src", "utilities", file));
}

function utilityClasses(selector) {
  return (selector.match(/\.-[a-z0-9\\:-]+/gi) || []).map((name) => name.slice(1));
}

function listUtilities(repoRoot) {
  const utilityFiles = getUtilityFiles(repoRoot);
  const utilityCandidates = new Set();
  const css = compileStylesheet(repoRoot, "src/utilities/_index.scss");
  css.walkRules((rule) => {
    for (const name of utilityClasses(rule.selector)) {
      utilityCandidates.add(name);
    }
  });

  return {
    utilityFiles,
    utilityClassCandidates: [...utilityCandidates].sort(),
    scannedFileCount: utilityFiles.length,
  };
}

function getUtility(repoRoot, name) {
  const normalizedName = name.replace(/^\./, "").replace(/\\?:/g, "\\:");
  const css = compileStylesheet(repoRoot, "src/utilities/_index.scss");
  const matchesByFile = new Map();

  css.walkRules((rule) => {
    if (!utilityClasses(rule.selector).includes(normalizedName)) {
      return;
    }

    const { input, start } = rule.source;
    const origin = input.origin(start.line, start.column);
    if (!origin?.file || !origin.line || !origin.source) {
      throw new Error(`Missing Sass source location for utility: ${name}`);
    }

    const relativePath = path.relative(path.resolve(repoRoot), origin.file).split(path.sep).join("/");
    const matches = matchesByFile.get(relativePath) || new Map();
    matches.set(origin.line, {
      line: origin.line,
      text: origin.source.split("\n")[origin.line - 1].trim(),
    });
    matchesByFile.set(relativePath, matches);
  });

  const files = [...matchesByFile].sort(([a], [b]) => a.localeCompare(b)).map(([file, matches]) => ({
    path: file,
    matches: [...matches.values()].sort((a, b) => a.line - b.line),
  }));

  if (files.length === 0) {
    throw new Error(`Unknown utility: ${name}`);
  }

  return {
    name: normalizedName,
    files,
  };
}

function listDocs(repoRoot, dir = "") {
  const docsRoot = path.join(repoRoot, "website", "src", "content", "docs");
  const targetDir = path.join(docsRoot, dir);

  if (!fs.existsSync(targetDir)) {
    return [];
  }

  const entries = fs.readdirSync(targetDir, { withFileTypes: true });
  let results = [];

  for (const entry of entries) {
    const relativePath = path.posix.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".")) {
      results = results.concat(listDocs(repoRoot, relativePath));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      results.push(relativePath);
    }
  }

  return results.sort();
}

function resolveDocPath(repoRoot, relativePath) {
  const docsRoot = path.resolve(repoRoot, "website", "src", "content", "docs");
  const filePath = path.resolve(docsRoot, relativePath);
  const relative = path.relative(docsRoot, filePath);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Unknown or invalid doc path: ${relativePath}`);
  }

  return { docsRoot, filePath };
}

function getDoc(repoRoot, relativePath) {
  const { filePath } = resolveDocPath(repoRoot, relativePath);

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    throw new Error(`Unknown or invalid doc path: ${relativePath}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function buildSearchRegex(query) {
  try {
    return new RegExp(query, "i");
  } catch (error) {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(escaped, "i");
  }
}

function searchDocs(repoRoot, query) {
  const docsRoot = path.resolve(repoRoot, "website", "src", "content", "docs");
  const results = [];
  const regex = buildSearchRegex(query);

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith(".")) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
        const content = fs.readFileSync(fullPath, "utf8");
        const lines = content.split("\n");
        const matches = lines
          .map((line, index) => (regex.test(line) ? { line: index + 1, text: line.trim() } : null))
          .filter(Boolean);

        if (matches.length > 0) {
          results.push({
            path: path.posix.relative(docsRoot, fullPath),
            matches: matches.slice(0, 5), // Limit to first 5 matches per file
          });
        }
      }
    }
  }

  walk(docsRoot);
  return results;
}

function asText(data) {
  return {
    content: [
      {
        type: "text",
        text: typeof data === "string" ? data : JSON.stringify(data, null, 2),
      },
    ],
  };
}

const server = new Server(
  {
    name: "unitone-css",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_primitives",
      description: "List available layout primitives in unitone-css.",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "get_primitive",
      description: "Get file-level details for a specific layout primitive.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Primitive directory name such as stack or cluster.",
          },
        },
        required: ["name"],
      },
    },
    {
      name: "list_behaviors",
      description: "List available behaviors in unitone-css.",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "list_utilities",
      description: "List available utility classes in unitone-css.",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "get_utilities",
      description: "Get file-level details for a specific utility class.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Utility class name such as -box-shadow or -color:text. CSS-escaped colons and a leading dot are also accepted.",
          },
        },
        required: ["name"],
      },
    },
    {
      name: "get_variables",
      description:
        "Return Sass variable files, settings files, and tokens (Global CSS Variables) candidates.",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "list_docs",
      description: "List available documentation files (MDX) in the website.",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "get_doc",
      description: "Read the content of a specific documentation file.",
      inputSchema: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Relative path to the MDX file, e.g., 'layout-primitives/stack.mdx'.",
          },
        },
        required: ["path"],
      },
    },
    {
      name: "search_docs",
      description: "Search for a keyword or regex pattern within the documentation files.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Keyword or regex to search for. Invalid regex is treated as a plain keyword.",
          },
        },
        required: ["query"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const repoRoot = getRepoRoot();

  switch (request.params.name) {
    case "list_primitives":
      return asText({
        repoRoot,
        primitives: listPrimitives(repoRoot),
      });

    case "get_primitive": {
      const { name } = primitiveInputSchema.parse(request.params.arguments ?? {});
      return asText(getPrimitive(repoRoot, name));
    }

    case "list_behaviors":
      return asText({
        repoRoot,
        behaviors: listBehaviors(repoRoot),
      });

    case "list_utilities":
      return asText(listUtilities(repoRoot));

    case "get_utilities": {
      const { name } = utilityInputSchema.parse(request.params.arguments ?? {});
      return asText(getUtility(repoRoot, name));
    }

    case "get_variables":
      return asText(getVariables(repoRoot));

    case "list_docs":
      return asText({
        repoRoot,
        docs: listDocs(repoRoot),
      });

    case "get_doc": {
      const { path: docPath } = z
        .object({ path: z.string() })
        .parse(request.params.arguments ?? {});
      return asText(getDoc(repoRoot, docPath));
    }

    case "search_docs": {
      const { query } = z
        .object({ query: z.string() })
        .parse(request.params.arguments ?? {});
      return asText({
        repoRoot,
        query,
        results: searchDocs(repoRoot, query),
      });
    }

    default:
      throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
