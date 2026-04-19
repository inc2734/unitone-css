---
name: unitone-css-coding-assistant
description: Strict implementation rules for writing or revising unitone-css HTML and React code with a primitive-first, token-first approach.
compatibility: unitone-css repository. Ignore dist.
---

# unitone-css Coding Assistant

## When to use

Use this skill when you are writing or revising actual `unitone-css` markup or React code.

If the task starts from a screenshot or mockup:

1. apply `unitone-css-vision-to-code` first
2. preserve its structure memo and primitive decisions
3. then implement with this skill

## Main objective

Write code that is:

- structurally clear
- aligned with documented primitives
- based on documented tokens and utilities
- maintainable by another contributor without reverse-engineering custom wrappers

Before implementing screenshot-derived code, inspect these local references:

- [../unitone-css-vision-to-code/references/primitive-selection.md](../unitone-css-vision-to-code/references/primitive-selection.md)
- [../unitone-css-vision-to-code/references/token-approximation.md](../unitone-css-vision-to-code/references/token-approximation.md)

## Implementation priority

Always apply this priority order:

1. primitive props
2. primitive composition
3. utilities on plain elements or tiny wrappers
4. documented primitive-specific style values
5. custom CSS only when the documented system still cannot express the requirement

If custom CSS starts defining the page skeleton, stop and refactor.

## Entry-point rules

### React / JSX

- use primitive React components when they exist
- do not manually author layout primitive `data-unitone-layout` in JSX
- the primitive components emit the right attributes internally

### Plain HTML

- use `data-unitone-layout` for primitives and documented attribute helpers
- use `class` for utility families from `utilities.mdx`
- omit the leading `.` from utility selectors when writing `class`

## Primitive-first defaults

Use [../unitone-css-vision-to-code/references/primitive-selection.md](../unitone-css-vision-to-code/references/primitive-selection.md) as the default mapping table.
Before writing ad hoc flex or grid code, check whether one of those primitives already explains the structure.

## Width and overlap rules

### Width ownership

- `Text` is width-aware by default because of `--unitone--measure`
- use `Text` intentionally for prose rhythm
- for heroes, promo blocks, wide cards, and similar sections, keep width ownership on the outer primitive

### Overlap integrity

- if the screenshot or design has real overlap, keep the related pieces inside one `Layers` composition whenever possible
- assign explicit `grid-column` and `grid-row` values when the overlap boundary matters
- do not fake overlap with surrounding spacing alone

## Token and utility rules

### Font size

Prefer documented utility classes first, following [../unitone-css-vision-to-code/references/token-approximation.md](../unitone-css-vision-to-code/references/token-approximation.md).

### Font weight

Prefer `-font-weight:bold` before ad hoc `fontWeight` styles when simple emphasis is enough.

### Spacing

- do not use margin for layout spacing
- prefer primitive gaps, `Gutters`, `Decorator`, and documented gap or padding utilities
- when two close spacing steps are plausible, choose the smaller one first

### Colors

- prefer documented color utilities and token-backed primitive props
- choose the visually nearest token family before inventing a custom color

## Allowed style usage

`style` is allowed only when it carries documented primitive-specific values (Props) or documented token-backed values.

Good uses:

- `minHeight`
- `sidebarWidth`
- `columnMinWidth`
- `--unitone--grid-column`
- `--unitone--grid-row`
- token-backed colors when the primitive API expects a value expression

Bad uses:

- ad hoc transforms for layout
- arbitrary margin hacks
- one-off decorative tuning that should be custom CSS
- invented layout behavior that bypasses primitives

## Screenshot-origin restrictions

When the task comes from `unitone-css-vision-to-code`:

- preserve the chosen primitive skeleton
- do not reintroduce custom classes in the first implementation pass
- do not introduce custom selectors in the first implementation pass
- keep `style` limited to documented primitive-specific values (Props)
- accept a small decorative mismatch if it avoids breaking primitive discipline

## Common mistakes to prevent

- using utilities as a substitute for missing structure
- putting utility families inside `data-unitone-layout` when they belong in `class`
- writing `flex-start` or `flex-end` instead of `start` and `end`
- letting `Text` accidentally narrow a non-prose layout
- using `display: grid` or `display: flex` in custom CSS where a primitive already exists
- defining the page skeleton with a custom class

## Procedure

1. Inspect `patterns.mdx` first if the request resembles a known composition.
2. State the primitive skeleton for each major block in one short line.
3. Implement the outer structure first.
4. Add width, spacing, and alignment through primitive props.
5. Add utilities only where they clearly improve a plain element or tiny wrapper.
6. Use documented primitive-specific style values only when props and utilities are insufficient.
7. Add custom CSS only as a last step and only for genuinely unsupported effects.

## Self-review rubric

Revise if any item feels weak.

1. `Structural match`
   - Does the hierarchy, split, repeated pattern, and overlap logic match the target?
2. `Primitive discipline`
   - Are the main layout decisions expressed through primitives rather than generic wrappers?
3. `Token discipline`
   - Are typography, spacing, and colors using documented steps first?
4. `Restraint`
   - Is custom CSS absent or clearly limited to unsupported last-mile effects?
5. `Readability`
   - Can another contributor understand the layout skeleton quickly?

## Verification checklist

- in React, no manually authored primitive `data-unitone-layout` attributes remain
- no margin-based layout spacing hacks remain
- utilities from `utilities.mdx` are written in `class`, not `data-unitone-layout`
- the `class` values do not include a leading `.`
- major layout structure is expressed through primitives
- `Text` is used intentionally
- overlap stays inside `Layers` when visually important
- grid placement values are explicit when overlap alignment matters
- typography, spacing, and color use documented tokens or utilities first
- remaining custom CSS, if any, has a short reason and does not define the page skeleton
