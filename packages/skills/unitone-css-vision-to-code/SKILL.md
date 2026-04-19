---
name: unitone-css-vision-to-code
description: Convert visual design screenshots or descriptions into high-quality unitone-css code using layout primitives and behaviors.
compatibility: unitone-css repository. Requires access to MCP tools like get_doc and list_primitives.
---

# unitone-css Vision to Code

## When to use

Use this skill when a user provides a screenshot, design mockup, or a visual description and asks to implement it using `unitone-css`.

If the task proceeds to React or JSX implementation, also apply `unitone-css-coding-assistant` so the generated code follows the repository's stricter implementation rules.

This skill is layout-first, not decoration-first.
Treat the target output as a wireframe expressed with `unitone-css` primitives.
If a screenshot contains decorative treatments that would require custom classes or custom selectors, it is acceptable to omit them as long as the block hierarchy, alignment, grouping, overlap, and spacing logic are preserved.

## Hard constraints

- Do not create custom classes.
- Do not create custom CSS selectors in `<style>` blocks or stylesheet files.
- Do not use the `style` attribute.
- Do not use ad hoc `display: grid`, `display: flex`, `position`, or `transform` rules to define layout structure.
- Use only documented primitives, documented utilities, and primitive-specific CSS custom properties.
- In screenshot reproduction, if a result would require `style`, drop that effect and keep the nearest structurally correct primitive composition.
- If an effect cannot be expressed without custom classes or custom selectors, drop that effect and keep the layout skeleton.
- The minimum acceptable output is a structurally correct wireframe.

## Procedure

1. **Write a Structure Memo Before Implementing**:

   - Do not start coding immediately.
   - First write a short memo with these headings:
     - `Main blocks`: the major visual blocks from top to bottom
     - `Dominant relationship`: which block is visually dominant and which blocks are secondary
     - `Overlap`: whether any card, badge, or panel truly overlaps another block or only appears separated by spacing
     - `Alignment`: whether each major block is left-aligned, centered, split left/right, or layered
     - `Repeated patterns`: rows, cards, chips, buttons, metadata pairs, or lists
     - `Image role`: whether the image is a background, framed media, side visual, or layered backdrop
   - If this memo is still vague, do not implement yet.

2. **Analyze Visual Structure**:

   - Identify the main layout flows: Vertical, Horizontal, Grid, or Overlapping.
   - Detect repeated patterns (lists, cards, buttons).
   - Note spacing (gaps), alignment (center, start, end), padding, and the relative width of major columns.

3. **Map to Primitives**:

   - Use `list_docs` and `get_doc` to find the best match for each identified structure.
   - Prefer an existing primitive even when the screenshot is not a pixel-perfect match.
   - **Vertical Stack**: Use `Stack`.
   - **Horizontal Flow (wrapping)**: Use `Cluster`.
   - **Horizontal Flow (both sides)**: Use `BothSides`.
   - **Centered Content / constrained width**: Use `Center` or `Container`.
   - **Responsive Grid**: Use `ResponsiveGrid`, `Switcher`, or `Masonry`.
   - **Full Height / Vertical Centering**: Use `Cover`.
   - **Sidebar + main content**: Use `WithSidebar`.
   - **Horizontal scroller / logo rail**: Use `Reel` or `Marquee`.
   - **Overlapping / floating UI**: Use `Layers` or `Float`.
   - **Framed media / aspect-ratio box**: Use `Frame`.
   - **Inner padding / border / card shell**: Use `Decorator`.
   - **Page gutters / safe inline padding**: Use `Gutters`.
   - **Prose / text rhythm**: Use `Text`.
   - When multiple primitives could work, compare at least 2 candidates before choosing.
   - Explicitly prefer the primitive that explains the visual structure with less custom CSS.
   - Use these comparisons as defaults:
     - Left/right split with a dominant side: prefer `WithSidebar` over ad hoc grid.
     - A title area on one side and supporting content on the other: compare `BothSides` and `WithSidebar`.
     - A card or panel crossing section boundaries: compare `Layers` and `Float` before using translation hacks.
     - Background media with foreground content: compare `Layers`, `Cover`, and `Frame` before writing custom wrappers.
     - Repeated rows with metadata + main content: compare `Stack`, `BothSides`, `WithSidebar`, and `Switcher` before writing grid rules.
   - Width ownership rule:
     - Decide which primitive owns the major visual width of each section before adding inner text wrappers.
     - If `Text` is used, assume its readable measure will constrain content unless you intentionally override it.
     - For hero copy, promotional copy, and other wide non-prose compositions, prefer an outer width wrapper first and use `Text` only inside that wrapper when you need internal heading/paragraph rhythm.
   - Overlap rule:
     - If a screenshot shows a card, notice area, or CTA block crossing the lower edge of a hero, keep that block inside the same `Layers` composition as the hero copy.
     - Prefer assigning explicit `grid-row` / `grid-column` ranges to the background media and foreground wrapper rather than recreating the overlap with neighboring section spacing.

4. **Refine with Behaviors**:

   - Apply spacing using primitive props, primitive modifiers, or documented utility classes.
   - Adjust typography and colors using existing tokens and utilities before dropping non-essential decoration.
   - For colors, prefer palette tokens and utilities such as `-color:*` and `-background-color:*`.
   - For font sizing and emphasis, prefer documented scale and utilities such as `-font-size:*`, `-font-weight:*`, and `-fluid-typography`.
   - For padding and small spacing adjustments, prefer primitive props, `Decorator`, `Gutters`, and utilities such as `-padding:*` and `-gap:*`.
   - If the screenshot and existing tokens do not match exactly, choose the nearest documented token or utility rather than inventing a custom class or using `style`.
   - Use `data-unitone-layout` for layout primitives in HTML and props for React.
   - In plain HTML, utility families from `utilities.mdx` are utility classes, so apply them with `class`, not `data-unitone-layout`.
   - When writing a `class` value, do not include the leading `.` from CSS selector notation.
   - Example: write `class="-font-size:5xl -font-weight:bold -fluid-typography"`, not `class=".-font-size:5xl .-font-weight:bold .-fluid-typography"`.
   - Reserve `data-unitone-layout` for primitive names, primitive modifiers, and documented attribute-based helpers such as `-fluid-typography` where the docs show attribute usage.
   - Do not add custom classes for image treatment, button styling, overlays, card skins, or typography tuning.
   - Do not use `style` for custom properties, one-off sizing, image positioning, or visual tuning in the first pass.
   - When a decorative treatment cannot be expressed with the documented system and no documented prop/modifier/class exists, omit it and keep the structural version.

5. **Iterative Refinement**:
   - Start with the outer layout and work inward.
   - Match structure before decoration. A plain version with the right hierarchy is better than a polished version with the wrong structure.
   - Prefer under-styled but structurally correct output over visually rich output with custom layout code.
   - Check if the generated code matches the visual hierarchy.
   - When turning the mapping into React or JSX, follow `unitone-css-coding-assistant` for implementation constraints such as no `data-unitone-layout`, no margins, and preferring primitive props over ad hoc styling.
   - Before finalizing, compare the output against the screenshot using this checklist:
     - Are the major blocks in the same order and alignment?
     - Is the main overlap real, not faked with unrelated spacing or transforms?
     - Are the dominant widths and proportions roughly aligned?
     - Are repeated patterns expressed by primitive composition rather than one-off classes?
     - Is any `Text` wrapper unintentionally narrowing a hero or panel to `--unitone--measure`?
     - If the screenshot uses `Layers`, did you assign explicit row or column ranges where the overlap boundary is visually important?

## Visual Mapping Table

| Visual Pattern                             | Unitone Primitive | Key Props/Attributes             |
| :----------------------------------------- | :---------------- | :------------------------------- |
| Vertical list with even gaps               | `Stack`           | `gap`                            |
| Horizontal list that wraps                 | `Cluster`         | `gap`, `align-items`             |
| Title on left, link on right               | `BothSides`       | `gap`                            |
| Hero section with centered text            | `Cover`           | `min-height`, `gap`              |
| Centered content with readable line length | `Center`          | `max-width`, `gutters`           |
| Main column inside a page-width wrapper    | `Container`       | `max-width`, `gutters`           |
| Side-by-side (sidebar + main)              | `WithSidebar`     | `sidebar-width`, `gap`           |
| Grid of cards (responsive)                 | `ResponsiveGrid`  | `column-min-width`, `gap`        |
| Auto-switching 2-column to 1-column layout | `Switcher`        | `threshold`, `gap`               |
| Dense card wall with uneven heights        | `Masonry`         | `column-min-width`, `gap`        |
| Horizontal media rail / chip list          | `Reel`            | `gap`, `item-width`              |
| Decorative layered visuals                 | `Layers`          | `z-index`, `position`            |
| Floating badge / CTA / note                | `Float`           | `offset`, `placement`            |
| Card shell with padding or border          | `Decorator`       | `padding`, `border-width`, `gap` |
| Framed image or video                      | `Frame`           | `aspect-ratio`                   |
| Inline page gutters                        | `Gutters`         | `gutters`                        |
| Long-form text block                       | `Text`            | `size`, `align`                  |

## Token and Utility Bias

- Prefer primitives and documented tokens/utilities over custom classes.
- Do not use custom CSS or custom classes in this skill.
- Do not use the `style` attribute in this skill.
- Colors should come from the existing palette tokens or utility classes.
- Font size and weight should come from the existing type scale or utility classes.
- Padding, gutters, and small spacing adjustments should come from primitive props, `Decorator`, `Gutters`, or spacing utility classes.
- A visual mismatch is acceptable if it avoids custom classes and keeps the output aligned with the `unitone-css` layout system.

## Verification

- A short structure memo was written before implementation.
- At least 2 primitive candidates were considered for any non-trivial split or overlap.
- The layout is responsive without media queries (using unitone's intrinsic sizing).
- `gap` values are from the unitone scale (-3 to 7).
- No custom classes or custom selectors were introduced.
- No `style` attributes were introduced.
- Existing primitives were considered before introducing any non-primitive wrapper.
- Primitive names and primitive modifiers are in `data-unitone-layout`; utility families from `utilities.mdx` are in `class`.
- Utility names in `class` do not include the leading `.` from selector notation.
- `Text` is used intentionally for prose rhythm, not accidentally as the main width controller of a hero or card.
- If overlap is visually important, the overlapping elements remain within one `Layers` composition and the key children use explicit grid ranges where needed.
- Colors, font sizes, and spacing use documented tokens, props, or utility classes wherever possible.
- Decorative effects that required custom CSS were intentionally omitted instead of recreated ad hoc.
