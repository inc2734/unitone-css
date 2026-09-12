import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const sourceRoot = fileURLToPath(new URL('../packages/skills/', import.meta.url));
const installer = path.join(sourceRoot, 'bin/skillpack-install.mjs');

function setup(t) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'unitone skills test-'));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  const dest = path.join(cwd, 'project');
  return {
    cwd,
    dest,
    run: (...args) => spawnSync(process.execPath, [installer, '--dest=project', '--targets=codex', ...args], {
      cwd,
      encoding: 'utf8',
    }),
  };
}

test('installing from another directory includes required skills and their references', (t) => {
  const { dest, run } = setup(t);
  const result = run('--skills=unitone-css-vision-to-code');
  assert.equal(result.status, 0, result.stderr);
  const root = path.join(dest, '.codex/skills');
  assert.deepEqual(fs.readdirSync(root).sort(), ['unitone-css-coding-assistant', 'unitone-css-vision-to-code']);
  for (const skill of fs.readdirSync(root)) {
    const entrypoint = path.join(root, skill, 'SKILL.md');
    assert.equal(fs.readFileSync(entrypoint, 'utf8'), fs.readFileSync(path.join(sourceRoot, skill, 'SKILL.md'), 'utf8'));
    for (const match of fs.readFileSync(entrypoint, 'utf8').matchAll(/\]\(((?:\.\.?\/|references\/)[^)]+)\)/g)) {
      assert(fs.existsSync(path.resolve(root, skill, match[1])), match[1]);
    }
  }
});

test('coding guidance installs independently with its local selection references', (t) => {
  const { dest, run } = setup(t);
  const result = run('--skills=unitone-css-coding-assistant');
  assert.equal(result.status, 0, result.stderr);
  const root = path.join(dest, '.codex/skills');
  assert.deepEqual(fs.readdirSync(root), ['unitone-css-coding-assistant']);
  for (const file of ['primitive-selection.md', 'token-approximation.md']) {
    assert(fs.existsSync(path.join(root, 'unitone-css-coding-assistant/references', file)));
  }
});

test('router installation includes each skill it can select', (t) => {
  const { dest, run } = setup(t);
  const result = run('--skills=unitone-css-router');
  assert.equal(result.status, 0, result.stderr);
  const available = fs.readdirSync(sourceRoot).filter((name) => fs.existsSync(path.join(sourceRoot, name, 'SKILL.md'))).sort();
  assert.deepEqual(fs.readdirSync(path.join(dest, '.codex/skills')).sort(), available);
});

for (const [name, expected] of [
  ['unitone-css-add-layout-primitive', ['unitone-css-add-behavior', 'unitone-css-add-layout-primitive', 'unitone-css-doc-sync']],
  ['unitone-css-add-behavior', ['unitone-css-add-behavior', 'unitone-css-doc-sync']],
]) {
  test(`${name} installs the workflows it requires`, (t) => {
    const { dest, run } = setup(t);
    const result = run(`--skills=${name}`);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(fs.readdirSync(path.join(dest, '.codex/skills')).sort(), expected);
  });
}

test('dry-run resolves dependencies without creating the destination', (t) => {
  const { dest, run } = setup(t);
  const result = run('--skills=unitone-css-vision-to-code', '--dry-run');
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /unitone-css-coding-assistant/);
  assert(!fs.existsSync(dest));
});

for (const args of [
  ['--mode=invalid'],
  ['--skills=missing'],
  ['--skills=unitone-css-coding-assistant,missing'],
  ['--targets=codex,invalid'],
  ['--targets='],
  ['--skills='],
  ['--skills=unitone-css-coding-assistant,'],
]) {
  test(`invalid install arguments fail before writing: ${args.join(' ')}`, (t) => {
    const { dest, run } = setup(t);
    const existing = path.join(dest, '.codex/skills/unitone-css-coding-assistant/SKILL.md');
    fs.mkdirSync(path.dirname(existing), { recursive: true });
    fs.writeFileSync(existing, 'existing skill');
    const result = run(...args);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Invalid|Unknown|non-empty/);
    assert.equal(fs.readFileSync(existing, 'utf8'), 'existing skill');
    assert.deepEqual(fs.readdirSync(path.join(dest, '.codex/skills')), ['unitone-css-coding-assistant']);
  });
}

test('merge preserves extra files and replace removes only selected skill folders', (t) => {
  const { dest, run } = setup(t);
  const root = path.join(dest, '.codex/skills');
  const skill = path.join(root, 'unitone-css-add-behavior');
  fs.mkdirSync(skill, { recursive: true });
  fs.writeFileSync(path.join(skill, 'local.txt'), 'local');
  fs.mkdirSync(path.join(root, 'unrelated'));
  fs.writeFileSync(path.join(root, 'unrelated/SKILL.md'), 'unrelated');

  const merged = run('--skills=unitone-css-add-behavior', '--mode=merge');
  assert.equal(merged.status, 0, merged.stderr);
  assert.equal(fs.readFileSync(path.join(skill, 'local.txt'), 'utf8'), 'local');
  assert(fs.existsSync(path.join(skill, 'SKILL.md')));

  const replaced = run('--skills=unitone-css-add-behavior', '--mode=replace');
  assert.equal(replaced.status, 0, replaced.stderr);
  assert(!fs.existsSync(path.join(skill, 'local.txt')));
  assert(fs.existsSync(path.join(skill, 'SKILL.md')));
  assert.equal(fs.readFileSync(path.join(root, 'unrelated/SKILL.md'), 'utf8'), 'unrelated');
});

test('a missing skill source fails instead of reporting a successful empty install', (t) => {
  const { cwd, dest } = setup(t);
  const copy = path.join(cwd, 'bin/skillpack-install.mjs');
  fs.mkdirSync(path.dirname(copy));
  fs.copyFileSync(installer, copy);
  const result = spawnSync(process.execPath, [copy, `--dest=${dest}`, '--targets=codex'], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /No skills found/);
  assert(!fs.existsSync(dest));
});
