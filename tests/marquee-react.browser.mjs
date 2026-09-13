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
  'React owns marquee item copies through hydration and updates',
  { timeout: 60000 },
  async (t) => {
    const entry = path.resolve('tests/marquee-react-entry.jsx');
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
            if (id === entry)
              return `
            import React from 'react';
            import { createRoot, hydrateRoot } from 'react-dom/client';
            import { flushSync } from 'react-dom';
            import { renderToString } from 'react-dom/server.browser';
            import { Marquee } from '../src/layout-primitives/marquee/react.jsx';
            import { getMarqueeParts } from '../src/layout-primitives/marquee/layout.js';
            import { setMarquee, marqueeResizeObserver } from '../src/library.js';
            Object.assign(window, { React, createRoot, hydrateRoot, flushSync, renderToString, Marquee, getMarqueeParts, setMarquee, marqueeResizeObserver });
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
    await browser.command('Emulation.setDeviceMetricsOverride', {
      width: 1600,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await browser.evaluate(`
    window.errors = [];
    window.addEventListener('error', event => errors.push(event.message));
    console.error = (...args) => errors.push(args.map(String).join(' '));
    document.head.innerHTML = '<style></style>';
    document.querySelector('style').textContent = ${JSON.stringify(sass.compile('src/app.scss').css)};
  `);
    await browser.evaluate(output[0].code + '\nvoid 0;');
    const run = (expression) =>
      browser.evaluate(
        expression.includes('await ') ? `(async () => { ${expression} })()` : expression,
      );
    const near = (actual, expected) =>
      assert(Math.abs(actual - expected) < 0.05, `${actual} != ${expected}`);
    await run(`
    window.settle = () => new Promise(resolve => setTimeout(resolve, 100));
    window.h = React.createElement;
    window.view = () => document.querySelector('[data-unitone-marquee-react]');
    window.parts = () => getMarqueeParts(view());
    window.metrics = () => {
      const { marquee, originals, copies } = parts();
      const rtl = getComputedStyle(marquee).direction === 'rtl';
      const last = originals.at(-1)?.getBoundingClientRect();
      const firstCopy = copies[0]?.getBoundingClientRect();
      return {
        width: parseFloat(getComputedStyle(marquee).width),
        widths: originals.map(item => item.getBoundingClientRect().width),
        distance: Math.abs(parseFloat(marquee.style.getPropertyValue('--unitone--marquee-travel'))),
        boundary: firstCopy && last ? (rtl ? last.left - firstCopy.right : firstCopy.left - last.right) : null,
        copies: copies.length,
        inaccessible: copies.every(copy => copy.inert && copy.getAttribute('aria-hidden') === 'true'),
        originalIds: originals.map(item => item.dataset.id),
        copyIds: copies.map(item => item.dataset.id),
      };
    };
    window.Item = function Item({ id, label }) {
      const [value, setValue] = React.useState(0);
      return h('div', { 'data-id': id, style: { height: 40 }, onClick: () => setValue(value + 1) }, label + ':' + value);
    };
    window.App = function App({ initial = ['a', 'b', 'c', 'd'] }) {
      const [list, setList] = React.useState(initial);
      const [settings, setSettings] = React.useState({});
      window.setList = setList;
      window.setSettings = setSettings;
      return h(Marquee, { style: { width: 1200, '--unitone--gap': '10px' }, itemWidth: 'max(300px, 30%)', ...settings },
        list.map(id => h(Item, { key: id, id, label: id.toUpperCase() })));
    };
    window.mount = async (element) => {
      if (window.root) flushSync(() => root.unmount());
      document.body.innerHTML = '<div id="root"></div>';
      window.root = createRoot(document.getElementById('root'));
      flushSync(() => root.render(h(React.StrictMode, null, element)));
      await settle();
    };
  `);

    await t.test(
      'StrictMode renders one moving marquee with React-owned, inert copies',
      async () => {
        await run('mount(h(App))');
        const result = await run('metrics()');
        near(result.width, 1200);
        result.widths.forEach((width) => near(width, 360));
        near(result.distance, 1480);
        near(result.boundary, 10);
        assert.equal(result.copies, 4);
        assert(result.inaccessible);
        assert.equal(await run('view().children.length'), 1);
        assert.equal(await run('parts().marquee.getAnimations().length'), 1);
      },
    );

    await t.test(
      'keyed additions, removals and reordering preserve original nodes and local state',
      async () => {
        await run(`
      window.saved = Object.fromEntries(parts().originals.map(item => [item.dataset.id, item]));
      saved.a.click();
      await settle();
      flushSync(() => setList(['d', 'a', 'e', 'c']));
      await settle();
    `);
        const result = await run('metrics()');
        assert.deepEqual(result.originalIds, ['d', 'a', 'e', 'c']);
        assert.deepEqual(result.copyIds, ['d', 'a', 'e', 'c']);
        assert(
          await run(
            'parts().originals[0] === saved.d && parts().originals[1] === saved.a && parts().originals[3] === saved.c && !saved.b.isConnected',
          ),
        );
        assert.equal(await run('saved.a.textContent'), 'A:1');
        near(result.boundary, 10);
        await run('flushSync(() => setList([])); await settle()');
        assert.equal((await run('metrics()')).copies, 0);
        await run("flushSync(() => setList(['a'])); await settle()");
        const short = await run('metrics()');
        assert.equal(short.copies, 4);
        near(short.distance, 370);
      },
    );

    await t.test(
      'refs and focused uncontrolled input remain attached to the original',
      async () => {
        await run(`
      window.inputRef = React.createRef();
      window.wrapperRef = React.createRef();
      window.inputTree = () => h(Marquee, { ref: wrapperRef, style: { width: 1200, '--unitone--gap': '10px' }, itemWidth: '200px', pauseOnHover: true },
        h('div', { key: 'input' }, h('input', { ref: inputRef, defaultValue: 'initial', autoFocus: true })));
      await mount(inputTree());
      window.savedInput = inputRef.current;
    `);
        assert(
          await run(
            'inputRef.current === parts().originals[0].firstElementChild && wrapperRef.current === view()',
          ),
        );
        assert(await run('document.activeElement === savedInput'));
        await browser.command('Input.insertText', { text: ' edited' });
        const value = await run('savedInput.value');
        await run(`
      view().style.width = '1600px';
      setMarquee(view());
      await settle();
      flushSync(() => root.render(h(React.StrictMode, null, inputTree())));
      await settle();
    `);
        assert(
          await run('document.activeElement === savedInput && inputRef.current === savedInput'),
        );
        assert.equal(await run('savedInput.value'), value);
        assert(await run("parts().marquee.getAnimations()[0].playState === 'paused'"));
        assert((await run('metrics()')).inaccessible);
      },
    );

    await t.test(
      'fragments and components with multiple DOM roots keep items directly under marquee',
      async () => {
        await run(`
      window.Pair = () => h(React.Fragment, null,
        h('div', { style: { width: 100, height: 40 }, 'data-id': 'a' }),
        h('div', { style: { width: 150, height: 40 }, 'data-id': 'b' }));
      await mount(h(Marquee, { style: { width: 1200, '--unitone--gap': '10px' } }, h(Pair)));
    `);
        const result = await run('metrics()');
        near(result.distance, 270);
        near(result.boundary, 10);
        assert.equal(result.copies, 10);
        assert(result.inaccessible);
        assert(
          await run(
            'parts().originals.concat(parts().copies).every(item => item.parentElement === parts().marquee)',
          ),
        );
      },
    );

    await t.test(
      'props, RTL, reverse and hidden-to-visible updates preserve animation progress',
      async () => {
        await run('mount(h(App))');
        await run(`
      window.animation = parts().marquee.getAnimations()[0];
      animation.pause(); animation.currentTime = 8000;
      flushSync(() => setSettings({ reverse: true, dir: 'rtl', itemWidth: '100px', duration: '20s' }));
      await settle();
    `);
        const result = await run('metrics()');
        near(result.distance, 440);
        near(result.boundary, 10);
        assert(
          await run(
            'parts().marquee.getAnimations()[0] === animation && animation.currentTime === 8000',
          ),
        );
        await run(
          "flushSync(() => setSettings({ style: { width: 1200, display: 'none', '--unitone--gap': '10px' } })); await settle()",
        );
        assert.equal((await run('metrics()')).copies, 0);
        await run('flushSync(() => setSettings({})); await settle()');
        near((await run('metrics()')).distance, 1480);
      },
    );

    await t.test(
      'SSR stays unchanged until hydration; the imported HTML behavior skips React roots',
      async () => {
        await run(`
      flushSync(() => root.unmount()); window.root = null;
      document.body.innerHTML = '<div id="root"></div>';
      window.serverTree = h(React.StrictMode, null, h(App));
      document.getElementById('root').innerHTML = renderToString(serverTree);
      window.serverMarkup = document.getElementById('root').innerHTML;
      window.serverItem = parts().originals[0];
      window.stopDirectObserver = marqueeResizeObserver(view());
      await settle();
    `);
        assert(await run("document.getElementById('root').innerHTML === serverMarkup"));
        assert.equal((await run('metrics()')).copies, 0);
        await run(`
      window.root = hydrateRoot(document.getElementById('root'), serverTree, { onRecoverableError: error => errors.push(error.message) });
      await settle();
    `);
        assert(await run('parts().originals[0] === serverItem'));
        near((await run('metrics()')).distance, 1480);
        assert((await run('metrics()')).inaccessible);
        await run('stopDirectObserver(); stopDirectObserver(); setMarquee(view()); await settle()');
        near((await run('metrics()')).distance, 1480);
      },
    );

    await t.test('no per-frame measurements, detached updates or React warnings', async () => {
      await run(`
      window.measures = 0;
      for (const item of [view(), ...parts().originals, ...parts().copies]) {
        const measure = item.getBoundingClientRect.bind(item);
        item.getBoundingClientRect = () => { measures++; return measure(); };
      }
      await settle();
    `);
      assert.equal(await run('measures'), 0);
      await run(`
      window.detached = view();
      flushSync(() => root.unmount()); window.root = null;
      detached.style.width = '200px'; setMarquee(detached);
      await settle();
    `);
      assert.equal(await run('measures'), 0);
      assert.deepEqual(await run('errors'), []);
    });
  },
);
