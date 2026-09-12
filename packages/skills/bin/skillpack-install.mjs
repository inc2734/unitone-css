import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const VALID_TARGETS = [
  "codex",
  "vscode",
  "claude",
  "claude-global",
  "cursor",
  "cursor-global",
];

function parseList(value, option) {
  const entries = value.split(",").map((entry) => entry.trim());
  if (entries.some((entry) => !entry)) {
    throw new Error(`${option} requires a non-empty comma-separated list.`);
  }
  return [...new Set(entries)];
}

function parseArgs(argv) {
  const args = {
    dest: "",
    targets: ["codex", "claude"],
    skills: [],
    mode: "replace",
    dryRun: false,
  };

  for (const arg of argv) {
    if (arg.startsWith("--dest=")) {
      args.dest = arg.slice("--dest=".length);
    } else if (arg.startsWith("--targets=")) {
      args.targets = parseList(arg.slice("--targets=".length), "--targets");
    } else if (arg.startsWith("--skills=")) {
      args.skills = parseList(arg.slice("--skills=".length), "--skills");
    } else if (arg.startsWith("--mode=")) {
      args.mode = arg.slice("--mode=".length);
    } else if (arg === "--dry-run") {
      args.dryRun = true;
    } else if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printUsage() {
  process.stdout.write(
    [
      "Usage:",
      "  node packages/skills/bin/skillpack-install.mjs --dest=/path/to/repo [--targets=codex,claude,cursor,vscode]",
      "",
      "Installs skills directly from packages/skills into agent-specific directories.",
      "Required skill dependencies are included automatically.",
      `Targets: ${VALID_TARGETS.join(", ")}`,
      "Options: --skills=name[,name] --mode=replace|merge --dry-run",
      "Relative --dest paths are resolved from the current working directory.",
      "",
    ].join("\n")
  );
}

function listSkillDirs(root) {
  if (!fs.existsSync(root)) {
    return [];
  }

  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(root, entry.name))
    .filter((dir) => fs.existsSync(path.join(dir, "SKILL.md")));
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (entry.name === ".DS_Store") {
      continue;
    }

    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyDir(src, dest);
    } else if (entry.isFile()) {
      fs.copyFileSync(src, dest);
    }
  }
}

function destinationRoot(destRepo, target) {
  switch (target) {
    case "codex":
      return path.join(destRepo, ".codex", "skills");
    case "vscode":
      return path.join(destRepo, ".github", "skills");
    case "claude":
      return path.join(destRepo, ".claude", "skills");
    case "cursor":
      return path.join(destRepo, ".cursor", "skills");
    case "claude-global":
      return path.join(os.homedir(), ".claude", "skills");
    case "cursor-global":
      return path.join(os.homedir(), ".cursor", "skills");
    default:
      throw new Error(`Unsupported target: ${target}`);
  }
}

function resolveSkills(sourceRoot, requested) {
  const available = new Map(listSkillDirs(sourceRoot).map((dir) => [path.basename(dir), dir]));
  if (available.size === 0) {
    throw new Error(`No skills found in: ${sourceRoot}`);
  }
  const dependencies = JSON.parse(fs.readFileSync(path.join(sourceRoot, "dependencies.json"), "utf8"));
  const selected = new Set();

  function include(name) {
    if (!available.has(name)) {
      throw new Error(`Unknown skill: ${name}`);
    }
    if (selected.has(name)) {
      return;
    }
    selected.add(name);
    const required = dependencies[name] ?? [];
    if (!Array.isArray(required) || required.some((dependency) => typeof dependency !== "string")) {
      throw new Error(`Invalid dependencies for skill: ${name}`);
    }
    for (const dependency of required) {
      include(dependency);
    }
  }

  for (const name of requested.length > 0 ? requested : available.keys()) {
    include(name);
  }

  return [...selected].sort().map((name) => available.get(name));
}

function installTarget({ destRepo, target, skillDirs, mode, dryRun }) {
  const destRoot = destinationRoot(destRepo, target);
  if (dryRun) {
    process.stdout.write(`[dry-run] ${target} -> ${destRoot}\n`);
    for (const skillDir of skillDirs) {
      process.stdout.write(`  - ${path.basename(skillDir)}\n`);
    }
    return;
  }

  fs.mkdirSync(destRoot, { recursive: true });

  for (const skillDir of skillDirs) {
    const skillName = path.basename(skillDir);
    const skillDest = path.join(destRoot, skillName);

    if (mode === "replace") {
      fs.rmSync(skillDest, { recursive: true, force: true });
    }

    copyDir(skillDir, skillDest);
  }

  process.stdout.write(`Installed ${skillDirs.length} skill(s) to ${destRoot}\n`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const sourceRoot = fileURLToPath(new URL("../", import.meta.url));

  if (!["replace", "merge"].includes(args.mode)) {
    throw new Error(`Invalid mode: ${args.mode}. Expected replace or merge.`);
  }

  for (const target of args.targets) {
    if (!VALID_TARGETS.includes(target)) {
      throw new Error(`Invalid target: ${target}`);
    }
  }

  if (
    args.targets.some((target) => target !== "claude-global" && target !== "cursor-global") &&
    !args.dest
  ) {
    throw new Error("--dest is required unless only using global targets.");
  }

  // Resolve the complete selection before creating or replacing any files.
  const skillDirs = resolveSkills(sourceRoot, args.skills);
  const destRepo = args.dest ? path.resolve(args.dest) : process.cwd();

  for (const target of args.targets) {
    installTarget({
      destRepo,
      target,
      skillDirs,
      mode: args.mode,
      dryRun: args.dryRun,
    });
  }
}

try {
  main();
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
