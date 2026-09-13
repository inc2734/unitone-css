import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { test } from 'node:test';
import * as sass from 'sass';
import { launchChrome } from './helpers/chrome.mjs';

// Run explicitly with: node --test tests/marquee.browser.mjs (CHROME_BIN is optional).
test('marquee item copies and observer integration in Chrome', { timeout: 60000 }, async (t) => {
  const browser = await launchChrome();
  t.after(() => browser.close());
  await browser.command('Emulation.setDeviceMetricsOverride', {
    width: 1600,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });
  const css = sass.compile('src/app.scss').css;
  const source = (
    await Promise.all(
      ['observer-scope.js', 'layout-primitives/marquee/layout.js', 'library.js'].map((file) =>
        readFile(new URL(`../src/${file}`, import.meta.url), 'utf8'),
      ),
    )
  )
    .join('\n')
    .replace(/^import[\s\S]*?;\n/gm, '')
    .replace(/^export /gm, '');
  await browser.evaluate(
    `document.head.innerHTML = '<style></style>'; document.querySelector('style').textContent = ${JSON.stringify(css)};`,
  );
  await browser.evaluate(
    `${source}\nObject.assign(window, { setMarquee, marqueeResizeObserver, getMarqueeParts }); void 0;`,
  );
  await browser.evaluate(`
    window.settle = () => new Promise(resolve => setTimeout(resolve, 80));
    window.fixture = async ({ width = 1200, itemWidth = 'max(300px, 30%)', count = 4, gap = '10px', rtl = false, reverse = false, observe = false, hidden = false, extra = '' } = {}) => {
      window.stop?.();
      document.body.innerHTML = '<section><div data-unitone-layout="marquee-wrapper"><div data-unitone-layout="marquee"></div></div></section>';
      window.wrapper = document.querySelector('[data-unitone-layout="marquee-wrapper"]');
      window.original = wrapper.firstElementChild;
      wrapper.style.cssText = 'width: ' + width + 'px; --unitone--item-width: ' + itemWidth + '; --unitone--gap: ' + gap + ';' + extra;
      wrapper.dir = rtl ? 'rtl' : 'ltr';
      if (reverse) wrapper.dataset.unitoneLayout += ' -reverse';
      if (hidden) wrapper.style.display = 'none';
      for (let index = 0; index < count; index++) {
        const item = document.createElement('div');
        item.style.cssText = 'height: 40px; width: ' + (100 + index * 25) + 'px';
        item.textContent = String(index);
        original.append(item);
      }
      window.items = [...original.children];
      window.stop = observe ? marqueeResizeObserver(wrapper) : undefined;
      if (!observe) setMarquee(wrapper);
      await settle();
    };
    window.metrics = () => {
      const { originals, copies } = getMarqueeParts(wrapper);
      const rtl = getComputedStyle(original).direction === 'rtl';
      const last = originals.at(-1)?.getBoundingClientRect();
      const next = copies[0]?.getBoundingClientRect();
      return {
        widths: originals.map(item => item.getBoundingClientRect().width),
        marqueeWidths: [parseFloat(getComputedStyle(original).width)],
        distance: Math.abs(parseFloat(original.style.getPropertyValue('--unitone--marquee-travel'))) || 0,
        boundary: next && last ? (rtl ? last.left - next.right : next.left - last.right) : null,
        copies: copies.length,
        height: wrapper.getBoundingClientRect().height,
        identities: items.every((item, i) => item === originals[i]),
        accessible: copies.every(copy => copy.getAttribute('aria-hidden') === 'true' && copy.inert),
      };
    };
    window.seek = (progress) => {
      for (const marquee of wrapper.children) {
        const animation = marquee.getAnimations()[0];
        animation.pause();
        animation.currentTime = progress * 20000;
      }
    };
    window.assertCoverage = () => {
      const edge = wrapper.getBoundingClientRect();
      const intervals = [...wrapper.children].flatMap(marquee => [...marquee.children].map(item => {
        const rect = item.getBoundingClientRect();
        return [rect.left, rect.right];
      })).sort((a, b) => a[0] - b[0]);
      let right = edge.left;
      for (const [start, end] of intervals) {
        if (end < right) continue;
        if (start - right > 10.1) throw new Error('Unexpected empty interval: ' + (start - right));
        right = end;
        if (right >= edge.right - 10.1) return;
      }
      throw new Error('Insufficient coverage: ' + (edge.right - right));
    };
  `);
  const run = (expression) =>
    browser.evaluate(
      expression.includes('await ') ? `(async () => { ${expression} })()` : expression,
    );
  const near = (actual, expected, tolerance = 0.05) =>
    assert(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);

  await t.test('percent math uses W; copies, boundary and full-cycle travel use L', async () => {
    await run('fixture()');
    const result = await run('metrics()');
    result.widths.forEach((width) => near(width, 360));
    assert.deepEqual(result.marqueeWidths, [1200]);
    near(result.distance, 1480);
    near(result.boundary, 10);
    near(result.height, 40);
    assert(result.identities && result.accessible);
    await run('seek(0.5)');
    near(await run('parseFloat(getComputedStyle(original).translate)'), -740);
    await run('setMarquee(wrapper)');
    near((await run('metrics()')).boundary, 10);
    near(await run('original.getAnimations()[0].currentTime'), 10000);
  });

  for (const [itemWidth, expected] of [
    ['auto', [100, 125, 150, 175]],
    ['125.25px', [125.25, 125.25, 125.25, 125.25]],
    ['10vw', [160, 160, 160, 160]],
    ['30%', [360, 360, 360, 360]],
    ['min(400px, 25%)', [300, 300, 300, 300]],
    ['clamp(200px, 30%, 400px)', [360, 360, 360, 360]],
  ]) {
    await t.test('item width ' + itemWidth, async () => {
      await run(`fixture({ itemWidth: ${JSON.stringify(itemWidth)} })`);
      const result = await run('metrics()');
      result.widths.forEach((width, index) => near(width, expected[index]));
      near(result.distance, expected.reduce((sum, width) => sum + width, 0) + 40);
      near(result.boundary, 10);
    });
  }

  for (const rtl of [false, true])
    for (const reverse of [false, true])
      for (const itemWidth of ['100px', '1500px'])
        for (const count of [1, 4]) {
          await t.test(
            `coverage, order and direction: RTL=${rtl}, reverse=${reverse}, width=${itemWidth}, count=${count}`,
            async () => {
              await run(
                `fixture({ rtl: ${rtl}, reverse: ${reverse}, count: ${count}, itemWidth: '${itemWidth}' })`,
              );
              for (const progress of [0, 0.01, 0.5, 0.99, 1]) {
                await run(`seek(${progress}); assertCoverage()`);
                const result = await run('metrics()');
                near(result.boundary, 10);
                assert(result.identities);
              }
              await run('seek(0.25)');
              const before = await run('original.firstElementChild.getBoundingClientRect().left');
              await run('seek(0.75)');
              const after = await run('original.firstElementChild.getBoundingClientRect().left');
              assert.equal(after > before, rtl !== reverse);
            },
          );
        }

  await t.test('fractional gaps, percent gaps and original gap overrides', async () => {
    for (const [gap, expected] of [
      ['10.25px', 10.25],
      ['1%', 12],
      ['calc(1% + 0.25px)', 12.25],
    ]) {
      await run(`fixture({ gap: ${JSON.stringify(gap)} })`);
      let result = await run('metrics()');
      near(result.distance, 1440 + expected * 4);
      near(result.boundary, expected);
      await run("original.style.columnGap = '7.5px'; setMarquee(wrapper); await settle()");
      result = await run('metrics()');
      near(result.distance, 1470);
      near(result.boundary, 7.5);
    }
  });

  await t.test('intrinsic image sizes do not expand percent math item widths', async () => {
    await run('fixture({ observe: true, count: 0 })');
    await run(`
      const source = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="1000"/>');
      for (let index = 0; index < 4; index++) {
        const image = new Image();
        image.src = source;
        original.append(image);
      }
      await Promise.all([...original.children].map(image => image.decode()));
      await settle();
    `);
    const result = await run('metrics()');
    result.widths.forEach((width) => near(width, 360));
    near(result.distance, 1480);
    near(result.boundary, 10);
  });

  await t.test(
    'duration remains the time for one original group and its boundary gap',
    async () => {
      await run("fixture({ extra: '--unitone--animation-duration: 5s;' })");
      await run(`
      for (const marquee of wrapper.children) {
        const animation = marquee.getAnimations()[0];
        animation.pause();
        animation.currentTime = 2500;
      }
    `);
      near(await run('parseFloat(getComputedStyle(original).translate)'), -740);
      await run(
        "wrapper.style.setProperty('--unitone--item-width', '100px'); setMarquee(wrapper); await settle()",
      );
      near(await run('original.getAnimations()[0].effect.getComputedTiming().duration'), 5000);
      near(await run('original.getAnimations()[0].currentTime'), 2500);
      near(await run('parseFloat(getComputedStyle(original).translate)'), -220);
      near((await run('metrics()')).boundary, 10);
    },
  );

  await t.test(
    'ancestor scales and wrapper padding preserve the origin and CSS distance',
    async () => {
      await run(
        "fixture({ extra: 'box-sizing: content-box; padding: 13.25px 17.5px; border: 2px solid;' })",
      );
      await run(
        "wrapper.parentElement.style.transform = 'translate(23px, 17px) scale(1.5, 0.75)'; seek(0.37); setMarquee(wrapper)",
      );
      const result = await run('metrics()');
      near(result.distance, 1480);
      near(result.boundary, 15);
      assert.deepEqual(result.marqueeWidths, [1200]);
      near(
        await run(
          'getMarqueeParts(wrapper).copies[0].getBoundingClientRect().top - original.firstElementChild.getBoundingClientRect().top',
        ),
        0,
      );
    },
  );

  await t.test(
    'observes wrapper, item widths, markup, settings and hidden-to-visible changes',
    async () => {
      await run("fixture({ observe: true, itemWidth: 'auto' })");
      await run("original.children[0].style.width = '250px'; await settle()");
      near((await run('metrics()')).distance, 740);
      await run("wrapper.style.setProperty('--unitone--item-width', '30%'); await settle()");
      near((await run('metrics()')).distance, 1480);
      await run("wrapper.style.width = '1000px'; await settle()");
      near((await run('metrics()')).distance, 1240);
      await run('original.append(original.firstElementChild.cloneNode(true)); await settle()');
      near((await run('metrics()')).distance, 1550);
      await run(
        "getMarqueeParts(wrapper).originals.at(-1).remove(); original.firstElementChild.textContent = 'updated'; await settle()",
      );
      assert.equal(await run('getMarqueeParts(wrapper).copies[0].textContent'), 'updated');
      await run("original.style.columnGap = '15.5px'; await settle()");
      near((await run('metrics()')).distance, 1262);
      await run("wrapper.style.display = 'none'; await settle()");
      assert.equal((await run('metrics()')).copies, 0);
      await run("wrapper.style.display = ''; await settle()");
      near((await run('metrics()')).boundary, 15.5);
      await run(
        "fixture({ observe: true, hidden: true }); wrapper.style.display = ''; await settle()",
      );
      near((await run('metrics()')).distance, 1480);
    },
  );

  await t.test('empty and zero-width sources create no copies; observation recovers', async () => {
    for (const options of [
      { count: 0 },
      { width: 0 },
      { count: 1, itemWidth: '0px' },
      { itemWidth: '0px' },
    ]) {
      await run(`fixture(${JSON.stringify(options)})`);
      assert.equal((await run('metrics()')).copies, 0);
    }
    await run('fixture({ observe: true })');
    await run('original.replaceChildren(); await settle()');
    assert.equal((await run('metrics()')).copies, 0);
    await run('original.innerHTML = \'<div style="height: 40px">restored</div>\'; await settle()');
    near((await run('metrics()')).distance, 370);
  });

  await t.test(
    'image loading changes the distance while the marquee width stays fixed',
    async () => {
      const server = createServer((request, response) => {
        setTimeout(() => {
          response.writeHead(200, { 'Content-Type': 'image/svg+xml' });
          response.end('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="40"/>');
        }, 200);
      });
      await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
      try {
        await run("fixture({ observe: true, itemWidth: 'auto', count: 1 })");
        await run(`
        window.loadedImage = new Image();
        loadedImage.style.height = '40px';
        loadedImage.src = 'http://127.0.0.1:${server.address().port}/image.svg';
        original.append(loadedImage);
        await settle();
      `);
        const before = await run('metrics().distance');
        await run('await loadedImage.decode(); await settle()');
        const result = await run('metrics()');
        assert(result.distance > before);
        near(result.distance, 520);
        assert(result.marqueeWidths.every((width) => width === 1200));
        near(result.boundary, 10);
      } finally {
        server.closeAllConnections();
        await new Promise((resolve) => server.close(resolve));
      }
    },
  );

  await t.test('font loading changes auto item widths without DOM mutations', async () => {
    await run("fixture({ observe: true, itemWidth: 'auto', count: 1 })");
    await run(`
      original.firstElementChild.style.cssText = 'font: 32px MarqueeTestFont, monospace';
      original.firstElementChild.textContent = 'iiiiiiiiiiiiiiii';
      await settle();
    `);
    const before = await run('metrics().distance');
    await run(`
      const font = new FontFace('MarqueeTestFont', 'local("Arial"), local("Liberation Sans"), local("DejaVu Sans")');
      document.fonts.add(font);
      await font.load();
      await settle();
    `);
    const result = await run('metrics()');
    assert(Math.abs(result.distance - before) > 1);
    near(result.distance, result.widths[0] + 10);
    near(result.boundary, 10);
  });

  await t.test('ancestor settings and viewport media queries can change only the gap', async () => {
    await run("fixture({ observe: true, gap: 'var(--test-gap, 10px)' })");
    await run("wrapper.parentElement.style.setProperty('--test-gap', '12.5px'); await settle()");
    near((await run('metrics()')).distance, 1490);
    await run(`
      window.mediaStyle = document.createElement('style');
      mediaStyle.textContent = '@media(max-width: 1500px) { [data-unitone-layout~="marquee"] { column-gap: 20px; } }';
      document.head.append(mediaStyle);
    `);
    await browser.command('Emulation.setDeviceMetricsOverride', {
      width: 1400,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await run('settle()');
    near((await run('metrics()')).distance, 1520);
    near((await run('metrics()')).boundary, 20);
    await run('mediaStyle.remove()');
    await browser.command('Emulation.setDeviceMetricsOverride', {
      width: 1600,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
  });

  await t.test(
    'updates and direction changes preserve the original animation and source nodes',
    async () => {
      await run('fixture({ observe: true })');
      await run(
        'seek(0.4); window.savedAnimation = original.getAnimations()[0]; window.savedCopy = getMarqueeParts(wrapper).copies[0]',
      );
      await run("wrapper.style.width = '1000px'; await settle()");
      assert(
        await run(
          'original.getAnimations()[0] === savedAnimation && getMarqueeParts(wrapper).copies[0] === savedCopy',
        ),
      );
      near(await run('savedAnimation.currentTime'), 8000);
      await run("wrapper.dataset.unitoneLayout += ' -reverse'; await settle()");
      assert(await run('original.getAnimations()[0] === savedAnimation'));
      near(await run('savedAnimation.currentTime'), 8000);
      await run("wrapper.dir = 'rtl'; await settle()");
      near((await run('metrics()')).boundary, 10);
      assert((await run('metrics()')).identities);
      assert(
        await run(
          "[...wrapper.children].every(marquee => marquee.getAnimations()[0].playState === 'paused' && marquee.getAnimations()[0].currentTime === 8000)",
        ),
      );
    },
  );

  await t.test('focus and hover pause, clone refresh and resume stay synchronized', async () => {
    await run("fixture({ observe: true, itemWidth: '100px', count: 1 })");
    await run(`
      wrapper.dataset.unitoneLayout += ' -pause-on-hover';
      original.firstElementChild.tabIndex = 0;
      original.firstElementChild.focus();
      await settle();
    `);
    const time = await run('original.getAnimations()[0].currentTime');
    await run(
      "original.firstElementChild.textContent = 'changed while paused'; wrapper.style.width = '1400px'; await settle()",
    );
    assert(
      await run(
        `[...wrapper.children].every(marquee => marquee.getAnimations()[0].playState === 'paused' && Math.abs(marquee.getAnimations()[0].currentTime - ${time}) < 0.01)`,
      ),
    );
    await run('original.firstElementChild.blur(); await settle()');
    assert(
      await run(
        "[...wrapper.children].every(marquee => marquee.getAnimations()[0].playState === 'running')",
      ),
    );
    await browser.command('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 30, y: 20 });
    await run('settle()');
    assert(
      await run(
        "[...wrapper.children].every(marquee => marquee.getAnimations()[0].playState === 'paused')",
      ),
    );
    await browser.command('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 1500, y: 900 });
    await run('settle()');
    assert(
      await run(
        "[...wrapper.children].every(marquee => marquee.getAnimations()[0].playState === 'running')",
      ),
    );
    const times = await run(
      '[...wrapper.children].map(marquee => marquee.getAnimations()[0].currentTime)',
    );
    times.forEach((current) => near(current, times[0], 0.01));
  });

  await t.test(
    'regular animation does not measure each frame and cleanup cancels updates',
    async () => {
      await run('fixture({ observe: true })');
      await run(`
      window.measurements = 0;
      for (const element of [wrapper, original, ...original.children]) {
        const measure = element.getBoundingClientRect.bind(element);
        element.getBoundingClientRect = () => { measurements++; return measure(); };
      }
      await settle();
    `);
      assert.equal(await run('measurements'), 0);
      await run("original.firstElementChild.style.height = '60px'; await settle()");
      assert(await run('measurements > 0'));
      await run(
        "measurements = 0; original.firstElementChild.style.height = '70px'; stop(); await settle()",
      );
      assert.equal(await run('measurements'), 0);
    },
  );
});
