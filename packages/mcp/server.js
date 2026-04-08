import fs from "node:fs";
import path from "node:path";
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
  const primitiveRoot = path.join(repoRoot, "src", "layout-primitives", name);

  if (!fs.existsSync(primitiveRoot)) {
    throw new Error(`Unknown primitive: ${name}`);
  }

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

function getVariables(repoRoot) {
  const variableRoot = path.join(repoRoot, "src", "variables");
  const settingsRoot = path.join(repoRoot, "src", "settings");
  const variableFiles = listFiles(variableRoot).map((file) =>
    path.posix.join("src", "variables", file)
  );
  const settingsFiles = listFiles(settingsRoot).map((file) =>
    path.posix.join("src", "settings", file)
  );

  const cssCustomPropertyCandidates = [...variableFiles, ...settingsFiles].flatMap(
    (relativePath) => {
      const absolutePath = path.join(repoRoot, relativePath);
      const source = fs.readFileSync(absolutePath, "utf8");
      const matches = source.match(/--[a-z0-9-_]+/gi) || [];
      return matches;
    }
  );

  return {
    variableFiles,
    settingsFiles,
    cssCustomPropertyCandidates: [...new Set(cssCustomPropertyCandidates)].sort(),
    scannedFileCount: variableFiles.length + settingsFiles.length,
  };
}

function asText(data) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
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
      name: "get_variables",
      description:
        "Return Sass variable files, settings files, and CSS custom property candidates.",
      inputSchema: {
        type: "object",
        properties: {},
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

    case "get_variables":
      return asText(getVariables(repoRoot));

    default:
      throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
