import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from 'node:test';
import { rollup } from 'rollup';
import configs from '../rollup.config.js';

const clientEntry = 'src/layout-primitives/stack/react.jsx';
const knownModule = path.resolve('src/use-layout-behaviors.js');

async function collectWarnings(entry, moduleId, source) {
  const { output, ...config } = configs.find(({ input }) => input === entry);
  const warnings = [];
  const bundle = await rollup({
    ...config,
    plugins: [
      {
        name: 'directive-warning-fixture',
        resolveId(id) {
          return id === moduleId ? id : null;
        },
        load(id) {
          if (id === path.resolve(entry)) {
            return `import ${JSON.stringify(moduleId)}; export const entry = true;`;
          }
          return id === moduleId ? source : null;
        },
      },
      ...config.plugins,
    ],
    onwarn(warning) {
      config.onwarn(warning, (unhandled) => warnings.push(unhandled));
    },
  });
  try {
    await bundle.generate(output);
    return warnings;
  } finally {
    await bundle.close();
  }
}

test('unknown directives in known client modules remain visible', async () => {
  const warnings = await collectWarnings(clientEntry, knownModule, '"use server"; export const value = 1;');
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].code, 'MODULE_LEVEL_DIRECTIVE');
  assert.match(warnings[0].message, /"use server"/);
});

test('client directives in unknown modules remain visible', async () => {
  const moduleId = '\0unknown-client.js';
  const warnings = await collectWarnings(clientEntry, moduleId, '"use client"; export const value = 1;');
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].code, 'MODULE_LEVEL_DIRECTIVE');
  assert.equal(warnings[0].id, moduleId);
});

test('client directives remain visible when the output has no client banner', async () => {
  const warnings = await collectWarnings('src/library.js', knownModule, '"use client"; export const value = 1;');
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].code, 'MODULE_LEVEL_DIRECTIVE');
  assert.equal(warnings[0].id, knownModule);
});

test('unrelated warnings in known client modules remain visible', async () => {
  const warnings = await collectWarnings(clientEntry, knownModule, '"use client"; eval("globalThis");');
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].code, 'EVAL');
  assert.equal(warnings[0].id, knownModule);
});
