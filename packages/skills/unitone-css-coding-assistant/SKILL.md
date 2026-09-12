---
name: unitone-css-coding-assistant
description: Write or revise HTML and React code that uses unitone-css, with primitive-first structure, documented props, and token-backed styling. Framework primitive internals use the primitive or behavior workflow instead.
compatibility: Requires access to unitone-css docs or source for the version in use. Ignore dist and .export.
---

# unitone-css Coding Assistant

## Establish the API and structure

Inspect the consuming project's imports and existing markup first. Use matching sections of `patterns.mdx` and the relevant primitive docs from `website/src/content/docs` in the framework checkout, or retrieve them with MCP `get_doc` / `search_docs`. Consult `tokens.mdx` and `utilities.mdx` only for the styling families needed.

For screenshot-derived work, reuse the supplied structure memo and token choices. If no analysis exists, identify width ownership, splits, repetition, and overlap before writing markup. Do not repeat an already completed analysis or require a fixed report format.

Use these references only when making the corresponding decision:

- [Primitive selection](references/primitive-selection.md): choosing between primitives or replacing ad hoc layout wrappers.
- [Token approximation](references/token-approximation.md): estimating typography, spacing, or colors from a visual target.

Current source and documentation take precedence over reference defaults. If the required API cannot be verified, identify the missing documentation rather than inventing a primitive, token, utility, prop, or import path.

## Implementation order

1. Select primitives and their composition for the structure.
2. Configure width, spacing, alignment, and responsive behavior through documented props or HTML layout tokens.
3. Use utilities for typography or small adjustments on plain elements and tiny wrappers.
4. Use documented primitive-specific CSS custom properties or token-backed styles where the public API requires them.
5. Add custom CSS only for effects the documented system cannot express. Keep the page skeleton in primitives.

## HTML and React APIs

| Concern | React / JSX | Plain HTML |
| --- | --- | --- |
| Primitive | Use the exported component when one exists | Use `data-unitone-layout` |
| Modifiers and sizes | Use documented component props | Use documented layout tokens and CSS custom properties |
| Utilities | Use `className` | Use `class` |
| Size example | `<WithSidebar sidebar="right" sidebarWidth="18rem">…</WithSidebar>` | `<div data-unitone-layout="with-sidebar -sidebar:right" style="--unitone--sidebar-width: 18rem">…</div>` |

- In consuming JSX, do not manually author primitive `data-unitone-layout` attributes when a React component exists. This restriction does not apply to implementing the framework's own components.
- `sidebarWidth` and `columnMinWidth` are component props, not keys inside `style`. `minHeight` is also a component prop where documented; passing it as ordinary CSS does not necessarily configure the primitive's custom property.
- For `Layer`, prefer `gridColumn` and `gridRow` props. In HTML, use its documented `--unitone--grid-column` and `--unitone--grid-row` custom properties. Do not assume a custom property passed through React `style` survives a component's own prop-to-style mapping.
- Check public import paths and initialization requirements. React entrypoints follow `@inc2734/unitone-css/layout-primitives/<name>/react`; their `react.jsx` wrappers may load behavior as a side effect.
- Utility names in markup omit the leading dot and CSS selector escapes: write `-color:text`, not `.-color\:text`. MCP utility listings use CSS-escaped names; `get_utilities` accepts either spelling.
- Use `start` / `end` for unitone alignment values, matching the documented API.

## Layout and styling invariants

- Use primitive gaps for relationships between siblings; use `Gutters`, `Decorator`, or padding utilities for insets. Do not use margin to recreate layout spacing.
- `Text` constrains readable measure. Use it for prose; keep a hero or wide panel's width on the appropriate outer primitive.
- Keep real overlap within a `Layers` composition when appropriate, with explicit placement where alignment matters. Consult the selection reference for small floating elements.
- Prefer documented font-size utilities and `-font-weight:bold` for simple emphasis. Pair `-fluid-typography` with a font-size utility; it has no standalone effect.
- Prefer token-backed colors and spacing. When two documented steps are visually close, start with the smaller one; approximation values assume the documented defaults.
- `style` is limited to documented primitive-specific custom properties or token-backed values. Use props first when the component exposes them.
- If container-based responsiveness is needed, verify support on the chosen primitive and read the responsive-context guidance in `utilities.mdx`; do not guess prop support from another primitive.

## Screenshot first pass

Preserve the analyzed primitive skeleton. Do not introduce custom classes, custom selectors, or decorative inline styles in the first pass; inline values must be documented primitive-specific values. Establish structure with primitives, props, tokens, and utilities first.

A small decorative mismatch is acceptable at this stage. Report material omissions. If further refinement is requested, keep any necessary custom CSS limited to unsupported effects and preserve the primitive structure.

## Verify the result

Check that imports and props exist, utilities use markup spelling, widths and overlap match the intended structure, and any remaining custom CSS has a concrete purpose. Use the consuming project's relevant checks; for visual changes, inspect wide and narrow layouts when a rendering environment is available. State any unverified rendering behavior.

Report the implemented result, meaningful assumptions or omissions, and verification. Do not reproduce the full selection memo unless the user asks for it.
