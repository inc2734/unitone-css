import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// bin/ から見たルートディレクトリ
const REPO_ROOT = path.resolve(__dirname, '../');
const DOCS_DIR = path.join(REPO_ROOT, 'website/src/content/docs');
const OUTPUT_FILE = path.join(REPO_ROOT, 'llms.txt');

function getMdxFiles(dir) {
	if (!fs.existsSync(dir)) return [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	let files = [];
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory() && !entry.name.startsWith('.')) {
			files = files.concat(getMdxFiles(fullPath));
		} else if (entry.isFile() && entry.name.endsWith('.mdx')) {
			files.push(fullPath);
		}
	}
	return files;
}

function parseMdx(filePath) {
	const content = fs.readFileSync(filePath, 'utf8');
	const lines = content.split('\n');
	let title = '';
	let introLines = [];
	let codeBlocks = [];
	let currentBlock = null;
	let inIntro = false;

	const isCandidateLine = (trimmed) => {
		return (
			trimmed &&
			!trimmed.startsWith('#') &&
			!trimmed.startsWith('import ') &&
			!trimmed.startsWith('<') &&
			!trimmed.startsWith('`')
		);
	};

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const trimmed = line.trim();

		if (line.startsWith('# ') && !title) {
			title = line.replace('# ', '').trim();
			inIntro = true;
		} else if (inIntro && (/^##\s+Usage$/.test(trimmed) || line.startsWith('## '))) {
			inIntro = false;
		} else if (line.startsWith('```')) {
			if (currentBlock) {
				codeBlocks.push(currentBlock.join('\n'));
				currentBlock = null;
			} else {
				currentBlock = [];
			}
		} else if (currentBlock !== null) {
			currentBlock.push(line);
		} else if (inIntro && isCandidateLine(trimmed)) {
			introLines.push(trimmed);
		}
	}

	if (0 === introLines.length) {
		for (const line of lines) {
			const trimmed = line.trim();
			if (isCandidateLine(trimmed)) {
				introLines.push(trimmed);
			}
		}
	}

	const description = introLines.join(' ');

	return { title, description, codeBlocks };
}

function generate() {
	console.log(`Scanning docs in: ${DOCS_DIR}`);
	let output = `# unitone-css Full Specification\n\n`;
	output += `This file is a generated summary of unitone-css layout primitives and documentation.\n\n`;

	const files = getMdxFiles(DOCS_DIR);

	if (files.length === 0) {
		console.error('No MDX files found in documentation directory.');
		return;
	}

	// First pass for layout-primitives
	output += `## Layout Primitives\n\n`;
	const primitives = files.filter(f => f.includes('layout-primitives/'));
	for (const file of primitives) {
		const { title, description, codeBlocks } = parseMdx(file);
		if (!title) continue;
		output += `### ${title}\n${description}\n\n`;
		if (codeBlocks.length > 0) {
			output += `Example:\n\`\`\`jsx\n${codeBlocks[0]}\n\`\`\`\n\n`;
		}
	}

	// Second pass for general docs
	output += `## General Documentation\n\n`;
	const general = files.filter(f => !f.includes('layout-primitives/'));
	for (const file of general) {
		const { title, description } = parseMdx(file);
		if (!title || title === 'Stack' /* skip duplicates */) continue;
		output += `- **${title}**: ${description}\n`;
	}

	fs.writeFileSync(OUTPUT_FILE, output);
	console.log(`Successfully generated ${OUTPUT_FILE}`);
}

generate();
