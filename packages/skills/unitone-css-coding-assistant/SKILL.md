---
name: unitone-css-coding-assistant
description: Strict implementation rules for generating unitone-css code from requirements, screenshots, or existing compositions.
compatibility: unitone-css repository. Ignore dist.
---

# unitone-css Coding Assistant

## When to use

Use this skill when you are writing or revising actual `unitone-css` markup or React code.

If the task starts from a screenshot or mockup, use `unitone-css-vision-to-code` first to map the structure, then apply this skill while implementing the code.

When the task comes from `unitone-css-vision-to-code`, preserve its wireframe-first constraint for the initial implementation.
Do not reintroduce custom classes or custom selectors just to chase decorative fidelity.
Do not introduce `style` attributes in that first pass either.

## Core mandates

1. **React and HTML are different entry points**:

   - In React, use primitive components and props.
   - Do not manually author `data-unitone-layout` in JSX.
   - The React primitives emit `data-unitone-layout` internally; that is fine.
   - In plain HTML examples, use `data-unitone-layout` for primitives and documented attribute helpers, and use `class` for utility families documented in `utilities.mdx`.

2. **Follow the implementation priority**:

   - Primitive props first.
   - Primitive composition second.
   - Utilities on non-primitive elements third.
   - Custom CSS or custom classes only when the documented system still cannot express the requirement clearly.
   - If a custom class starts defining the page skeleton, stop and refactor toward primitives.

3. **No fake APIs**:

   - Use only documented primitives, props, tokens, utilities, and behaviors.
   - Do not invent utility names, prop names, or undocumented scale values.

4. **No margins for layout spacing**:

   - Do not use margin utilities or ad hoc `margin` styles for layout spacing.
   - Use `gap`, `rowGap`, `columnGap`, `Gutters`, `Container`, `Center`, `Text`, or `Decorator` instead.

5. **Prefer tokens and utilities before custom styling**:

   - For font size, prefer utility classes such as `-font-size:*`.
   - For font weight, prefer utility classes such as `-font-weight:bold` before inline `fontWeight`.
   - For colors, prefer utility classes such as `-color:*`, `-background-color:*`, or token-backed primitive props such as `Decorator backgroundColor=...`.
   - For spacing, prefer primitive props and utility classes that use the documented scale.

6. **Use unitone alignment keywords**:

   - Use `start` and `end`, not `flex-start` or `flex-end`.

7. **A small visual mismatch is acceptable**:

   - Prefer the nearest documented primitive, token, or utility over a pixel-perfect custom override.

8. **Custom CSS has a narrow role**:

   - Allow custom CSS mainly for background images, blend/filter effects, masks, or placeholder-image treatment.
   - Avoid custom CSS as the first tool for column structure, overlap, section skeletons, repeated rows, or button group layout.
   - If the request came from `unitone-css-vision-to-code`, do not use custom classes or custom selectors in the first pass at all.
   - If the request came from `unitone-css-vision-to-code`, do not use `style` attributes in the first pass either.
   - Only relax this after the structural wireframe is already correct and only if the user explicitly wants decorative refinement.

## Primitive-first guide

- Use `Stack` for vertical flow, repeated rows, and most default section internals.
- Use `Text` for prose, article-like blocks, and heading/paragraph rhythm.
- Use `Cluster` for horizontal groups, buttons, badges, and wrapping inline collections.
- Use `BothSides` when content needs to split left/right.
- Use `Center` or `Container` to constrain width instead of ad hoc wrappers.
- Use `Gutters` for section-level outer spacing.
- Use `Decorator` for padding, borders, backgrounds, color, shadow, overflow, and positioning.
- Use `WithSidebar` for sidebar/content relationships that collapse naturally.
- Use `ResponsiveGrid`, `Switcher`, or `Masonry` for multi-column repeated content.
- Use `Reel` or `Marquee` for horizontal runs that should scroll or move.
- Use `Layers`, `Float`, and `Frame` for overlaps, floating elements, and framed media.
- Use `Dialog` and `Popover` for interactive floating surfaces, then compose their internals with `Decorator`, `Stack`, and other primitives.
- Before writing `display: grid` or `display: flex` in custom CSS, check whether `WithSidebar`, `Switcher`, `Cluster`, `BothSides`, `ResponsiveGrid`, or `Stack` already explain the structure.
- Before using `transform`, negative offsets, or ad hoc positioning to fake overlap, check `Layers` and `Float` first.

## Width and overlap pitfalls

- `Text` is not a neutral wrapper. By default it constrains readable line length using `--unitone--measure`.
- If a section's visual width should be decided by `Container`, `Layers`, or another outer wrapper, do not put `Text` directly in the width-defining position unless you explicitly want the readable measure to become the effective max width.
- For hero copy, callout blocks, promo panels, and other visually wide text areas, decide the width with the outer primitive first, then place `Text` inside that wrapper only for internal rhythm if needed.
- Treat `Text` as an inner typography primitive, not as the primary width controller for non-prose sections.
- If a screenshot has a real overlap, keep the overlapping elements inside the same `Layers` instance whenever possible.
- Do not move an overlapped card, notice panel, or badge outside `Layers` and try to recreate the effect with neighboring section spacing alone.
- In `Layers`, assign the background image/video and the foreground content explicit grid ranges when the overlap boundary matters to the composition.
- For hero sections with a card crossing the lower edge, prefer a structure like `Layers -> background media + foreground Stack`, where the foreground stack includes the card and the background media occupies only the intended rows.

## Typography and utilities

- If `app.css` is loaded, normal text already participates in the typography system; do not add `data-unitone-layout="-typography"` to every text node.
- Use `-fluid-typography` mainly for larger headings that must scale responsively.
- Do not apply `-fluid-typography` automatically to every heading or paragraph.
- In plain HTML, utility families listed in `utilities.mdx` are utility classes, so apply them with `class`, not `data-unitone-layout`.
- When writing a `class` value, omit the leading `.` used in CSS selector notation.
- Example: `class="-font-size:5xl -font-weight:bold -fluid-typography"`.
- Do not place utility families such as `-font-size:*`, `-color:*`, `-background-color:*`, `-padding:*`, `-gap:*`, or `-box-shadow` inside `data-unitone-layout` unless the documentation for that specific helper explicitly shows attribute usage.
- For body-like text, metadata, dates, captions, and helper text, prefer the smaller of two close font-size candidates first.
- For large type where viewport scaling matters and partial JavaScript loading is used, also load `@inc2734/unitone-css/compatibility/fluid-typography` or the broader compatibility entry.
- Available utility families include `font-size`, `font-weight`, `padding`, `gap`, `color`, `background-color`, `display`, `overflow`, `position`, `text-align`, `align-items`, `align-content`, `align-self`, `justify-content`, `justify-items`, `justify-self`, `flex-direction`, `flex-wrap`, `mix-blend-mode`, and global helpers such as `-border-radius`, `-box-shadow`, `-gutters`, and max-width helpers.

## Procedure

1. Inspect `patterns.mdx` first when the request matches a known page section or repeated composition.
2. Break the UI into primitives before touching utilities or custom styles.
3. Choose the smallest primitive composition that explains the structure clearly.
4. For each major section, state the chosen primitive skeleton in one short line before detailing utilities or CSS.
   - Example: `Hero = Center + Cover + Layers`
   - Example: `News list = Decorator + Stack + WithSidebar`
5. Use primitive props for spacing, width, alignment, overflow, divider, and decoration before adding utility classes.
6. When using `Text`, state in one short phrase whether it is there for prose rhythm or for actual width control. If width control is not intended, keep that responsibility on the outer primitive.
7. Apply utilities only to plain elements or tiny presentational wrappers when that is clearer than adding another primitive.
8. Use CSS custom properties in `style` only for values that are already part of the documented system or are primitive-specific values such as `maxWidth`, `minHeight`, `sidebarWidth`, `columnMinWidth`, `grid-column`, or `grid-row`.
9. Add custom CSS or custom classes only after the nearest primitive, token, utility, and documented composition were considered and rejected.
10. If custom CSS remains, explain in one short sentence what primitive or utility was considered and why it was insufficient.
11. If the task originated from a screenshot, finish a primitive-only or primitive-plus-utilities wireframe first, then decide whether any decorative pass is still necessary.

## Self-review Rubric

Score the output before finalizing. If any item is below `4/5`, revise before delivering.

1. **Structural match**:
   - Does the block hierarchy, overlap, and major alignment match the screenshot or request?
2. **Primitive-first discipline**:
   - Are the main layout decisions expressed through primitives rather than custom wrappers?
3. **Custom CSS restraint**:
   - Is custom CSS limited to last-mile visual treatment rather than layout skeletons, and was it skipped entirely for wireframe-first screenshot work unless explicitly needed?
4. **Responsiveness**:
   - Does the layout adapt through intrinsic primitive behavior before falling back to custom media queries?
5. **Readability**:
   - Can another contributor understand the primitive skeleton quickly without reverse-engineering many custom classes?

## Verification

- In React, are there any manually written `data-unitone-layout` attributes? If yes, replace them with primitive components, props, utilities, or documented styles.
- Are there any `margin` styles or margin-based spacing hacks? If yes, replace them with primitive spacing.
- Are existing primitives being skipped in favor of generic wrappers or custom classes? If yes, refactor.
- Is any custom class defining the page skeleton, section skeleton, row layout, or overlap logic? If yes, refactor toward primitives.
- Is any `display: grid`, `display: flex`, `transform`, or absolute positioning being used where a documented primitive would be clearer? If yes, refactor first.
- If the task originated from `unitone-css-vision-to-code`, were any custom classes or custom selectors reintroduced before the structural wireframe was correct? If yes, remove them.
- If the task originated from `unitone-css-vision-to-code`, were any `style` attributes introduced before the structural wireframe was correct? If yes, remove them.
- Are utilities being stacked onto a primitive where a prop or a `Decorator` wrapper would be clearer? If yes, refactor.
- In HTML, are utility families from `utilities.mdx` written in `class` rather than `data-unitone-layout`? If not, fix them.
- Is `Text` accidentally controlling the width of a hero, card, panel, or other non-prose section through its default `--unitone--measure`? If yes, move width control to the outer primitive or set the intended max width explicitly.
- If overlap is part of the screenshot, are all overlapping elements inside the same `Layers` instance? If not, refactor first.
- If overlap alignment matters, are `grid-column` / `grid-row` ranges explicitly assigned to the relevant `Layers` children? If not, add them before tuning typography.
- Are font size, color, padding, and gap using documented tokens, props, or utilities? If not, fix that first.
- Are alignment keywords `start` / `center` / `end`? If not, fix them.
- If custom CSS remains, is there a clear reason the documented system could not express it? If not, remove it.
