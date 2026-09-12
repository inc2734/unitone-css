---
name: unitone-css-add-layout-primitive
description: Add or modify unitone-css framework primitives, including their Sass mixins, React components, public entrypoints, and optional behavior. Use for framework source changes rather than consuming markup.
compatibility: Requires the unitone-css checkout and its Node.js toolchain. Ignore dist and .export as inspection sources.
---

# unitone-css Add Layout Primitive

## Inspect the closest implementation

Use `list_primitives` / `get_primitive` when MCP is available, or inspect `src/layout-primitives` directly. Read the closest primitive and its documentation before choosing files and naming. Directory metadata alone does not describe the API.

## Source and public entrypoints

| Surface | Convention |
| --- | --- |
| `src/layout-primitives/<name>/_index.scss` | Define the primitive's mixin and selectors following the closest implementation |
| `src/layout-primitives/_index.scss` | Add both `@use` and the corresponding mixin `@include` when exposing the primitive in the full stylesheet |
| `<name>/index.jsx` | Implement the React component and its prop-to-attribute / custom-property mapping |
| `<name>/react.jsx` | Export the component and import any required behavior side effects |
| `<name>/behavior.js` | Add only when JavaScript initialization is needed |
| `src/layout-primitives/index.js` | Import primitive-specific behavior needed by the full application entrypoint; this is not a barrel of React components |
| `rollup.config.js` and `package.json` | Confirm build discovery and public import patterns |

Rollup discovers per-primitive `react.jsx` and `behavior.js` files automatically. Existing wildcard exports cover their standard public paths; change build configuration or exports only for an entrypoint those patterns do not cover.

## Implement

1. Define the intended layout behavior and public props using the closest primitive as the naming reference. Explain a new API concept before implementing it.
2. Keep Sass selectors, layout tokens, CSS custom properties, and React props aligned. React prop handling must preserve valid values such as numeric `0` and omit absent modifiers.
3. Follow the existing stylesheet inclusion and React wrapper conventions; do not add JavaScript solely to mirror a CSS-only primitive.
4. For initialization or observer changes, follow `unitone-css-add-behavior`, including cleanup and reinsertion behavior.
5. Update the primitive page and any affected compositions through `unitone-css-doc-sync`.

## Verify the changed surface

- Confirm both full-application and per-primitive entrypoints include what they need.
- Check rendered React attributes and styles against the plain HTML API when props change.
- Compile Sass when selectors or mixins change; check JavaScript bundling when entrypoints change, using the repository scripts and inspecting source/configuration rather than treating generated output as the source of truth.
- Run relevant behavior tests when lifecycle code changes. For responsive layout changes, inspect appropriate viewport or container widths when a rendering environment is available.
- Limit verification to the affected surface and report anything not exercised.
