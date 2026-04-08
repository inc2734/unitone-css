import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const VALID_TARGETS = [
  "codex",
  "vscode",
  "claude",
  "claude-global",
  "cursor",
  "cursor-global",
];

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
      args.targets = arg.slice("--targets=".length).split(",").filter(Boolean);
    } else if (arg.startsWith("--skills=")) {
      args.skills = arg.slice("--skills=".length).split(",").filter(Boolean);
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

function installTarget({ sourceRoot, destRepo, target, skills, mode, dryRun }) {
  const destRoot = destinationRoot(destRepo, target);
  let skillDirs = listSkillDirs(sourceRoot);

  if (skills.length > 0) {
    const requested = new Set(skills);
    skillDirs = skillDirs.filter((dir) => requested.has(path.basename(dir)));
  }

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
  const repoRoot = process.cwd();
  const sourceRoot = path.join(repoRoot, "packages", "skills");

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

  const destRepo = args.dest ? path.resolve(repoRoot, args.dest) : repoRoot;

  for (const target of args.targets) {
    installTarget({
      sourceRoot,
      destRepo,
      target,
      skills: args.skills,
      mode: args.mode,
      dryRun: args.dryRun,
    });
  }
}

main();
