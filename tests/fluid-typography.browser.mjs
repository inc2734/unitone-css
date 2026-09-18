import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as sass from 'sass';
import { launchChrome } from './helpers/chrome.mjs';

// Run with: node --test tests/fluid-typography.browser.mjs (CHROME_BIN is optional).
const minProperty = '--unitone--fluid-typography-min-length';
const maxProperty = '--unitone--fluid-typography-max-length';
const modes = ['attribute', 'class', 'mixed', 'direct'];
const typography = (mode) =>
  ({
    attribute: 'data-unitone-layout="-font-size:3xl -fluid-typography"',
    class: 'class="-font-size:3xl -fluid-typography"',
    mixed: 'class="-font-size:3xl" data-unitone-layout="-fluid-typography"',
    direct: 'class="example"',
  })[mode];
const probe = (id, reference, mode = 'direct') =>
  `<div id="${id}" data-reference="${reference}" ${typography(mode)}>Text</div>`;
const probes = (prefix, reference) =>
  modes.map((mode) => probe(`${prefix}-${mode}`, reference, mode)).join('');
const context = (mode) =>
  ({
    class: 'class="-container-type:inline-size -responsive-context:container"',
    attribute:
      'data-unitone-layout="decorator -container-type:inline-size -responsive-context:container"',
    mixed:
      'class="-container-type:inline-size" data-unitone-layout="-responsive-context:container"',
  })[mode];

// The default 3xl endpoints are 23/15 rem at 432px and 2rem at 1280px.
// Bounds only clip this line; changing them must not change its slope.
const expected = (width, min = (23 / 15) * 16, max = 32) =>
  Math.max(min, Math.min(max, (23 / 15) * 16 + ((32 - (23 / 15) * 16) / 848) * (width - 432)));
const near = (actual, target, label) =>
  assert(Math.abs(actual - target) < 0.001, `${label}: ${actual}px != ${target}px`);

test('fluid typography bounds and reference scopes in Chrome', { timeout: 60000 }, async (t) => {
  const browser = await launchChrome();
  t.after(() => browser.close());
  const viewport = (width) =>
    browser.command('Emulation.setDeviceMetricsOverride', {
      width,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
  const css = sass.compile('src/app.scss').css;
  await browser.evaluate(`
    document.head.innerHTML = '<style></style><style id="custom"></style>';
    document.querySelector('style').textContent = ${JSON.stringify(css + '\nhtml { font-size: 16px } .example { font-size: var(--unitone--font-size-3xl-fluid) }')};
  `);
  const fixture = async (html, width = 1600, custom = '') => {
    await viewport(width);
    await browser.evaluate(`
      document.documentElement.style.cssText = '';
      document.getElementById('custom').textContent = ${JSON.stringify(custom)};
      document.body.innerHTML = ${JSON.stringify(html)};
    `);
  };
  const metrics = () =>
    browser.evaluate(`
    [...document.querySelectorAll('[data-reference]')].map(element => ({
      id: element.id,
      reference: Number(element.dataset.reference),
      size: parseFloat(getComputedStyle(element).fontSize),
    }))
  `);
  const check = async (min, max) => {
    const values = await metrics();
    assert(values.length > 0);
    for (const { id, reference, size } of values) near(size, expected(reference, min, max), id);
  };
  const bounds = (min, max) =>
    browser.evaluate(`
    for (const element of document.querySelectorAll('[data-reference]')) {
      for (const [name, value] of ${JSON.stringify([
        [minProperty, min ?? null],
        [maxProperty, max ?? null],
      ])}) {
        if (value === null) element.style.removeProperty(name);
        else element.style.setProperty(name, value + 'px');
      }
    }
  `);
  const checkChanges = async () => {
    await check();
    await bounds(30);
    await check(30);
    await bounds(31);
    await check(31);
    await bounds(undefined, 26);
    await check(undefined, 26);
    await bounds(undefined, 25);
    await check(undefined, 25);
    await bounds(26, 29);
    await check(26, 29);
    await bounds();
    await check();
  };

  await t.test(
    'unspecified bounds preserve every published size at multiple viewport widths',
    async () => {
      const names = ['2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];
      for (const width of [400, 800, 1600]) {
        await fixture(
          names
            .map(
              (name) =>
                `<div id="${name}" style="font-size:var(--unitone--font-size-${name}-fluid)">Text</div>`,
            )
            .join(''),
          width,
        );
        const sizes = await browser.evaluate(
          '[...document.body.children].map(element => parseFloat(getComputedStyle(element).fontSize))',
        );
        for (const [index, name] of names.entries()) {
          const level = index - 3;
          const min = (8 / (10 - level) + 0.2) * 16;
          const max = (8 / (8 - level)) * 16;
          const preferred = min + ((max - min) / 848) * (width - 432);
          near(sizes[index], Math.max(min, Math.min(max, preferred)), `${name} at ${width}px`);
        }
      }
    },
  );

  await t.test(
    'shared scale values follow root settings and keep their reference boundary',
    async () => {
      await fixture(
        `
      ${probes('scale-viewport', 800)}
      <section ${context('class')} style="width:600px">
        <div>${probes('scale-container', 600)}</div>
      </section>
      <section class="-container-type:inline-size" style="width:500px">
        <div data-unitone-layout="-fluid-reference:cqw">${probes('scale-legacy', 500)}</div>
      </section>
    `,
        800,
      );
      for (const [rootSize, base, minBase, maxBase] of [
        [20, 9, 12, 10],
        [18, 10, 11, 12],
      ]) {
        await browser.evaluate(
          `document.documentElement.style.cssText = ${JSON.stringify(`
        font-size: ${rootSize}px;
        --unitone--harmonic-sequence-base: ${base};
        --unitone--min-harmonic-sequence-base: ${minBase};
        --unitone--max-harmonic-sequence-base: ${maxBase};
      `)}`,
        );
        const min = (base / (minBase - 4) + 1 - base / minBase) * rootSize;
        const max = (base / (maxBase - 4)) * rootSize;
        for (const { id, reference, size } of await metrics()) {
          const preferred = min + ((max - min) * (reference - 27 * rootSize)) / (53 * rootSize);
          near(size, Math.max(min, Math.min(max, preferred)), id);
        }
      }
      await browser.evaluate(`document.documentElement.style.cssText = ''`);
      await check();
      // Descendant settings must not recalculate scales captured at an ancestor boundary.
      await browser.evaluate(`
      document.querySelectorAll('[data-reference]').forEach(element =>
        element.style.setProperty('--unitone--harmonic-sequence-base', '14'));
    `);
      await check();
    },
  );

  await t.test('the reported 400px example renders at 28px through every entry point', async () => {
    await fixture(probes('example', 400), 400);
    await bounds(28);
    for (const { id, size } of await metrics()) near(size, 28, id);
  });

  await t.test(
    'viewport bounds update and can be removed without changing interpolation',
    async () => {
      for (const width of [400, 800, 1600]) {
        await fixture(probes('viewport', width), width);
        await checkChanges();
        // Expanding the limits exposes the original, unclamped interpolation.
        await bounds(20, 40);
        await check(20, 40);
      }
    },
  );

  await t.test(
    'stylesheet bounds, inherited bounds, and local overrides work together',
    async () => {
      await fixture(
        `<section id="ancestor">${probes('child', 800)}</section>`,
        800,
        `#ancestor { ${minProperty}: 30px; } #child-direct { ${minProperty}: 28px; ${maxProperty}: 29px; }`,
      );
      for (const { id, size } of await metrics()) near(size, id === 'child-direct' ? 28 : 30, id);
      await browser.evaluate(
        `document.getElementById('ancestor').style.setProperty('${minProperty}', '31px')`,
      );
      for (const { id, size } of await metrics()) near(size, id === 'child-direct' ? 28 : 31, id);
      await browser.evaluate(
        `document.getElementById('ancestor').style.removeProperty('${minProperty}'); document.getElementById('custom').textContent = ''`,
      );
      await check();
      await browser.evaluate(
        `document.getElementById('custom').textContent = ${JSON.stringify(`section { ${maxProperty}: 26px; } #child-direct { ${maxProperty}: 25px; }`)}`,
      );
      for (const { id, size } of await metrics()) near(size, id === 'child-direct' ? 25 : 26, id);
    },
  );

  await t.test(
    'container-type alone and unpaired context markers retain the viewport',
    async () => {
      await fixture(`
      <section class="-container-type:inline-size" style="width:500px">
        ${probes('container-only', 1600)}
        <div class="-responsive-context:container">${probes('separate-markers', 1600)}</div>
      </section>
      <section class="-responsive-context:container">${probes('unpaired', 1600)}</section>
    `);
      await checkChanges();
    },
  );

  for (const mode of ['class', 'attribute', 'mixed']) {
    await t.test(
      `responsive context (${mode}) preserves direct, deep, and nested reference scopes`,
      async () => {
        await fixture(`
        ${probes('outside', 1600)}
        <section id="outer" ${context(mode)} style="width:800px; font-size:var(--unitone--font-size-3xl-fluid)" data-reference="1600">
          ${probes('direct', 800)}
          <div><div>${probes('deep', 800)}</div></div>
          <div class="-responsive-context:container">${probes('unpaired-inside', 800)}</div>
          <div class="-container-type:inline-size" style="width:600px">
            <div>${probes('unmarked-container', 800)}</div>
          </div>
          <section id="inner" ${context(mode)} style="width:500px; font-size:var(--unitone--font-size-3xl-fluid)" data-reference="800">
            ${probes('nested-direct', 500)}
            <div><div>${probes('nested-deep', 500)}</div></div>
            <section ${context(mode)} style="width:400px">
              <div><div>${probes('third-context', 400)}</div></div>
            </section>
          </section>
        </section>
      `);
        await checkChanges();
      },
    );
  }

  await t.test('container measurements update on resize and context removal', async () => {
    await fixture(
      `<section id="container" ${context('class')} style="width:800px"><div><div>${probes('deep', 800)}</div></div></section>`,
    );
    await check();
    await browser.evaluate(`
      document.getElementById('container').style.width = '1000px';
      document.querySelectorAll('[data-reference]').forEach(element => element.dataset.reference = '1000');
    `);
    await check();
    await viewport(400);
    await check();
    await bounds(30);
    await check(30);
    await browser.evaluate(`
      document.getElementById('container').classList.remove('-responsive-context:container');
      document.querySelectorAll('[data-reference]').forEach(element => element.dataset.reference = '400');
    `);
    await check(30);
    await bounds();
    await check();
  });

  await t.test(
    'legacy fluidReference keeps its own scope, descendants, and nested references',
    async () => {
      await fixture(`
      <section class="-container-type:inline-size" style="width:800px">
        ${probes('legacy-outside', 1600)}
        <section id="legacy" class="-container-type:inline-size" data-unitone-layout="-fluid-reference:cqw" style="width:500px; font-size:var(--unitone--font-size-3xl-fluid)" data-reference="800">
          ${probes('legacy-direct', 800)}
          <div><div>${probes('legacy-deep', 800)}</div></div>
          <div data-unitone-layout="-fluid-reference:cqw">
            ${probes('legacy-nested', 500)}
          </div>
          <section ${context('class')} style="width:600px">
            <div><div>${probes('legacy-context', 600)}</div></div>
          </section>
        </section>
        ${probes('legacy-sibling', 1600)}
      </section>
      <div data-unitone-layout="-fluid-reference:cqw">${probes('legacy-no-container', 1600)}</div>
    `);
      await checkChanges();
    },
  );

  await t.test(
    'public tokens remain overridable on their consuming element and static sizes stay inherited',
    async () => {
      await fixture(
        `<section style="--unitone--font-size-3xl:35px">${probes('override', 400)}<div id="static" class="-font-size:3xl">Text</div></section>`,
        400,
        '[data-reference] { --unitone--font-size-3xl-fluid: 37px; }',
      );
      for (const { id, size } of await metrics()) near(size, 37, id);
      near(
        await browser.evaluate(
          "parseFloat(getComputedStyle(document.getElementById('static')).fontSize)",
        ),
        35,
        'static',
      );
    },
  );
});
