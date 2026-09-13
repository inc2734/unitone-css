import assert from 'node:assert/strict';
import { test } from 'node:test';
import path from 'node:path';
import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import * as sass from 'sass';
import { launchChrome } from './helpers/chrome.mjs';

test(
  'layout behaviors follow React commits and preserve server markup until hydration',
  { timeout: 60000 },
  async (t) => {
    const entry = path.resolve('tests/layout-react-entry.jsx');
    const bundle = await rollup({
      input: entry,
      onwarn(warning, warn) {
        if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') warn(warning);
      },
      plugins: [
        {
          name: 'fixture',
          resolveId(id) {
            if (id === entry) return entry;
          },
          load(id) {
            if (id !== entry) return;
            return `
            import React from 'react';
            import { createRoot, hydrateRoot } from 'react-dom/client';
            import { flushSync } from 'react-dom';
            import { renderToString } from 'react-dom/server.browser';
            import { Stack } from '../src/layout-primitives/stack/react.jsx';
            import { Cluster } from '../src/layout-primitives/cluster/react.jsx';
            import { WithSidebar } from '../src/layout-primitives/with-sidebar/react.jsx';
            import { ResponsiveGrid } from '../src/layout-primitives/responsive-grid/react.jsx';
            import { Switcher } from '../src/layout-primitives/switcher/react.jsx';
            import { VerticalWriting } from '../src/layout-primitives/vertical-writing/react.jsx';
            import * as library from '../src/library.js';
            import '../src/app.js';
            Object.assign(window, { React, createRoot, hydrateRoot, flushSync, renderToString,
              Stack, Cluster, WithSidebar, ResponsiveGrid, Switcher, VerticalWriting, library });
          `;
          },
          transform(code) {
            return { code: code.replaceAll('process.env.NODE_ENV', '"development"'), map: null };
          },
        },
        resolve({ browser: true, extensions: ['.js', '.jsx'] }),
        commonjs(),
        babel({
          babelHelpers: 'bundled',
          babelrc: false,
          configFile: false,
          presets: ['@babel/preset-react'],
          extensions: ['.js', '.jsx'],
          exclude: 'node_modules/**',
        }),
      ],
    });
    const { output } = await bundle.generate({ format: 'iife' });
    await bundle.close();
    const browser = await launchChrome();
    t.after(() => browser.close());
    const run = (code) => browser.evaluate(`(async () => { ${code} })()`);
    await browser.evaluate(`
    window.errors = [];
    console.error = (...args) => errors.push(args.map(String).join(' '));
    window.addEventListener('error', event => errors.push(event.message));
    document.head.innerHTML = '<style></style>';
    document.querySelector('style').textContent = ${JSON.stringify(sass.compile('src/app.scss').css)};
    window.liveObservers = new Set();
    for (const name of ['ResizeObserver', 'MutationObserver', 'IntersectionObserver']) {
      const Original = window[name];
      window[name] = class extends Original {
        observe(...args) { liveObservers.add(this); return super.observe(...args); }
        disconnect() { liveObservers.delete(this); return super.disconnect(); }
      };
    }
  `);
    await browser.evaluate(output[0].code + '\nvoid 0;');
    await run(`
    window.h = React.createElement;
    window.settle = () => new Promise(resolve => setTimeout(resolve, 450));
    window.items = [0, 1, 2].map(i => h('div', { key: i, style: { height: 50 } }, 'item ' + i));
    window.mount = async tree => {
      if (window.root) flushSync(() => root.unmount());
      document.body.innerHTML = '<div id="root"></div>';
      window.root = createRoot(document.getElementById('root'));
      flushSync(() => root.render(h(React.StrictMode, null, tree)));
      await settle();
    };
    window.update = async tree => {
      flushSync(() => root.render(h(React.StrictMode, null, tree)));
      await settle();
    };
    window.info = selector => {
      const e = document.querySelector(selector);
      return { layout: e.dataset.unitoneLayout, visible: getComputedStyle(e).visibility,
        steps: [...e.children].map(c => c.style.getPropertyValue('--unitone--stairs-step')) };
    };
  `);

    await t.test('enabling, disabling and re-enabling dividers and stairs', async () => {
      for (const [component, props, selector, initialized] of [
        ['Stack', { divider: 'divide' }, 'stack', 'divider:initialized'],
        ['Cluster', { divider: 'divide' }, 'cluster', 'divider:initialized'],
        ['WithSidebar', { divider: 'divide' }, 'with-sidebar', 'divider:initialized'],
        [
          'ResponsiveGrid',
          { divider: 'divide', stairs: 1 },
          'responsive-grid',
          'stairs:initialized',
        ],
        ['Switcher', { stairs: 1, threshold: '0px' }, 'switcher', 'stairs:initialized'],
      ]) {
        await run(
          `await mount(h(${component}, {}, items)); await update(h(${component}, ${JSON.stringify(props)}, items));`,
        );
        const get = () => run(`return info('[data-unitone-layout~="${selector}"]');`);
        assert.equal((await get()).visible, 'visible', component);
        assert((await get()).layout.includes(initialized), component);
        await run(`await update(h(${component}, {}, items));`);
        const disabled = await get();
        assert(!disabled.layout.includes(':initialized'), component);
        assert(
          disabled.steps.every((value) => value === ''),
          component,
        );
        await run(`await update(h(${component}, ${JSON.stringify(props)}, items));`);
        assert.equal((await get()).visible, 'visible', component);
      }
    });

    await t.test(
      'stairs direction and vertical text orientation update without a resize',
      async () => {
        await run(`await mount(h(Switcher, { stairs: 1, threshold: '0px' }, items));
      await update(h(Switcher, { stairs: 1, threshold: '0px', stairsUp: 'up-down' }, items));`);
        let result = await run(`return info('[data-unitone-layout~="switcher"]');`);
        assert.equal(result.visible, 'visible');
        assert.deepEqual(result.steps, ['0', '1', '0']);
        await run(`window.vertical = orientation => h(VerticalWriting, { textOrientation: orientation }, h('p', null, '日本語の文章です。'));
      await mount(vertical('mixed')); await update(vertical('upright'));`);
        result = await run(`return info('[data-unitone-layout~="vertical-writing"]');`);
        assert.equal(result.visible, 'visible');
        assert(result.layout.includes('vertical-writing:initialized'));
      },
    );

    await t.test('a child-only commit restores divider flags', async () => {
      await run(`window.Child = function Child() {
      const [gap, setGap] = React.useState(0); window.setGap = setGap;
      return h(Stack, { gap }, h('p', null, 'Child'));
    };
    await mount(h(Cluster, { divider: 'divide' }, h(Child), h('div', null, 'Other')));
    flushSync(() => setGap(1)); await settle();`);
      assert(
        await run(
          `return document.querySelector('[data-unitone-layout~="cluster"]').firstElementChild.dataset.unitoneLayout.includes('-bol');`,
        ),
      );
    });

    await t.test('tag replacements update forwarded refs and retire old observers', async () => {
      await run(`window.forwarded = React.createRef(); await mount(h(Cluster, { ref: forwarded, divider: 'divide' }, items));
      window.oldTarget = forwarded.current; window.observerCount = liveObservers.size;
      await update(h(Cluster, { ref: forwarded, tagName: 'section', divider: 'divide' }, items));`);
      assert(
        await run(
          `return !oldTarget.isConnected && forwarded.current.tagName === 'SECTION' && liveObservers.size === observerCount;`,
        ),
      );
      assert.equal((await run(`return info('section');`)).visible, 'visible');
    });

    await t.test(
      'HTML attributes initialize and release behaviors on existing elements',
      async () => {
        await run(`flushSync(() => root.unmount()); window.root = null;
      document.body.innerHTML = '<div id="html" data-unitone-layout="switcher" style="--unitone--threshold:0px"><div>A</div><div>B</div><div>C</div></div>';
      await settle(); window.htmlTarget = document.getElementById('html');
      htmlTarget.dataset.unitoneLayout = 'switcher -stairs:1'; await settle();`);
        assert.equal((await run(`return info('#html');`)).visible, 'visible');
        assert((await run(`return info('#html');`)).layout.includes('stairs:initialized'));
        await run(`htmlTarget.dataset.unitoneLayout = 'switcher'; await settle();`);
        assert((await run(`return info('#html');`)).steps.every((value) => value === ''));
        await run(`htmlTarget.dataset.unitoneLayout = 'cluster -divider:divide'; await settle();`);
        assert((await run(`return info('#html');`)).layout.includes('divider:initialized'));
      },
    );

    await t.test(
      'SSR markup is unchanged before delayed hydration, even with explicit helpers',
      async () => {
        for (const [component, props, name, set, observe] of [
          [
            'Cluster',
            { divider: 'divide' },
            'cluster',
            'setDividerLinewrap',
            'dividersResizeObserver',
          ],
          [
            'Switcher',
            { stairs: 1, threshold: '0px' },
            'switcher',
            'setStairsStep',
            'stairsResizeObserver',
          ],
          [
            'VerticalWriting',
            {},
            'vertical-writing',
            'setColumnCountForVertical',
            'verticalsResizeObserver',
          ],
        ]) {
          const result = await run(`
        if (window.root) flushSync(() => root.unmount()); window.root = null;
        document.body.innerHTML = '<div id="root"></div>';
        const tree = h(${component}, ${JSON.stringify(props)}, items);
        const container = document.getElementById('root'); container.innerHTML = renderToString(tree);
        const html = container.innerHTML; const target = container.querySelector('[data-unitone-layout~="${name}"]');
        library.${set}(target); const stop = library.${observe}(target); stop(); stop();
        await settle(); const unchanged = container.innerHTML === html;
        window.root = hydrateRoot(container, tree); await settle();
        return { unchanged, visibility: getComputedStyle(target).visibility };
      `);
          assert(result.unchanged, component);
          assert.equal(result.visibility, 'visible', component);
        }
      },
    );

    await t.test(
      'vertical thresholds and child text updates settle without observing temporary nodes',
      async () => {
        await run(`window.VerticalChild = function VerticalChild() {
        const [text, setText] = React.useState('短い文章'); window.setText = setText;
        return h('p', null, text);
      };
      await mount(h(VerticalWriting, { threshold: '200px' }, h(VerticalChild)));
      flushSync(() => setText('長さを変更した日本語の文章です。')); await settle();
      window.measures = 0; window.originalMeasure = Element.prototype.getBoundingClientRect;
      Element.prototype.getBoundingClientRect = function(...args) { measures++; return originalMeasure.apply(this, args); };
      await settle();`);
        const measures = await run('return measures;');
        await run('Element.prototype.getBoundingClientRect = originalMeasure;');
        assert.equal(measures, 0);
        assert.equal(
          (await run(`return info('[data-unitone-layout~="vertical-writing"]');`)).visible,
          'visible',
        );
      },
    );

    await t.test(
      'settled layouts stop measuring and unmount releases all component observers',
      async () => {
        await run(`await mount(h(ResponsiveGrid, { divider: 'divide', stairs: 1 }, items));
      window.measures = 0; window.originalMeasure = Element.prototype.getBoundingClientRect;
      Element.prototype.getBoundingClientRect = function(...args) { measures++; return originalMeasure.apply(this, args); };
      await settle();`);
        assert.equal(await run('return measures;'), 0);
        await run(`Element.prototype.getBoundingClientRect = originalMeasure;
      flushSync(() => root.unmount()); window.root = null; await settle();`);
        assert.equal(await run('return liveObservers.size;'), 1);
        assert.deepEqual(await run('return errors;'), []);
      },
    );
  },
);
