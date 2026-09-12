import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { after, before, test } from 'node:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const client = new Client({ name: 'unitone-css-tests', version: '1.0.0' });

before(async () => {
  const serverPath = path.join(repoRoot, 'packages/mcp/server.js');
  await client.connect(new StdioClientTransport({
    command: process.platform === 'win32' ? process.execPath : serverPath,
    args: process.platform === 'win32' ? [serverPath] : [],
    cwd: repoRoot,
    env: { ...process.env, UNITONE_CSS_ROOT: repoRoot },
  }));
});

after(async () => client.close());

async function call(name, args = {}) {
  const result = await client.callTool({ name, arguments: args });
  assert.notEqual(result.isError, true);
  return JSON.parse(result.content[0].text);
}

test('MCP lists expanded utility classes without Sass prefixes', async () => {
  const { utilityClassCandidates: classes } = await call('list_utilities');
  for (const name of ['-font-size:xl', '-font-size:6xl', '-padding:-3', '-padding:7m', '-gap:1s', '-color:text-alt']) {
    assert(classes.includes(name.replaceAll(':', '\\:')), name);
  }
  for (const name of ['-color', '-font-size\\:', '-padding\\:', '-gap\\:']) {
    assert(!classes.includes(name), name);
  }
});

test('MCP utility lookups accept markup and selector names and return original Sass lines', async () => {
  for (const [name, file] of [
    ['-font-size:xl', '_font-size.scss'],
    ['-padding:1', '_padding.scss'],
    ['-padding-inline:7m', '_padding.scss'],
    ['-gap:-3', '_gap.scss'],
    ['-gap:7s', '_gap.scss'],
    ['-color:text', '_color.scss'],
    ['-color:text-alt', '_color.scss'],
    ['-box-shadow', '_global.scss'],
  ]) {
    const result = await call('get_utilities', { name });
    const escaped = await call('get_utilities', { name: `.${name.replaceAll(':', '\\:')}` });
    assert.deepEqual(escaped, result);
    assert.equal(result.files.length, 1);
    assert.equal(result.files[0].path, `src/utilities/${file}`);
    const lines = fs.readFileSync(path.join(repoRoot, result.files[0].path), 'utf8').split('\n');
    assert(result.files[0].matches.length > 0);
    for (const match of result.files[0].matches) {
      assert.equal(match.text, lines[match.line - 1].trim());
      assert(match.text.includes('{'));
    }
    if (name === '-color:text') {
      assert(result.files[0].matches.every((match) => match.text.startsWith('&\\:text {')));
    }
    if (name === '-font-size:xl') {
      assert(result.files[0].matches.some((match) => match.text.includes('#{ $name }')));
    }
  }
  for (const name of ['-color:te', '-font-size:7xl', '-padding:8', '-color']) {
    await assert.rejects(call('get_utilities', { name }), /Unknown utility/);
  }
});

test('MCP expands named font-size tokens and preserves static tokens', async () => {
  const { cssCustomPropertyCandidates: tokens } = await call('get_variables');
  for (const name of ['2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl']) {
    assert(tokens.includes(`--unitone--font-size-${name}`), name);
    assert(tokens.includes(`--unitone--font-size-${name}-fluid`), name);
  }
  assert(tokens.includes('--unitone--p1'));
  assert(tokens.includes('--unitone--color--text'));
  assert(!tokens.includes('--unitone--font-size-'));
});

test('MCP only accepts listed primitive directories', async () => {
  const primitive = await call('get_primitive', { name: 'stack' });
  assert.equal(primitive.hasReactWrapper, true);
  assert(primitive.files.includes('src/layout-primitives/stack/_index.scss'));
  for (const name of ['../../packages/mcp', '../', '../layout-primitives/stack', '_index.scss', 'missing']) {
    await assert.rejects(call('get_primitive', { name }), /Unknown primitive/);
  }
});
