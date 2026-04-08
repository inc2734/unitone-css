import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(process.cwd(), "..");
const websiteRoot = process.cwd();

const targets = [
  {
    source: path.join(repoRoot, "packages", "mcp", "README.md"),
    destination: path.join(websiteRoot, "src", "content", "docs", "mcp.mdx"),
  },
  {
    source: path.join(repoRoot, "packages", "skills", "README.md"),
    destination: path.join(websiteRoot, "src", "content", "docs", "skills.mdx"),
  },
];

for (const { source, destination } of targets) {
  const markdown = fs.readFileSync(source, "utf8").trim();
  const output = [markdown, ""].join("\n");

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, output);
}
