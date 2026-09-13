import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import vm from 'node:vm';
import { rollup } from 'rollup';
import React from 'react';
import { renderToString } from 'react-dom/server';
import configs from '../rollup.config.js';

test('the published marquee entry preserves its client directive and renders without a DOM', async () => {
  const { output: outputOptions, ...inputOptions } = configs.find(
    ({ input }) => input === 'src/layout-primitives/marquee/react.jsx',
  );
  const bundle = await rollup({
    ...inputOptions,
    onwarn(warning, warn) {
      if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') warn(warning);
    },
  });
  try {
    const { output } = await bundle.generate(outputOptions);
    assert.match(output[0].code, /^['"]use client['"];\s*['"]use strict['"];/);
    const module = { exports: {} };
    vm.runInNewContext(output[0].code, {
      module,
      exports: module.exports,
      require: createRequire(import.meta.url),
    });
    const html = renderToString(
      React.createElement(
        module.exports.Marquee,
        { itemWidth: '30%' },
        React.createElement('img', { src: '/image.png', alt: '' }),
      ),
    );
    assert(html.includes('data-unitone-marquee-react=""'));
    assert(html.includes('data-unitone-marquee-boundary=""'));
    assert(!html.includes('data-unitone-marquee-copy'));
    assert(!html.includes('marquee:initialized'));
  } finally {
    await bundle.close();
  }
});
