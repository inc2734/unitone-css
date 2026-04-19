---
name: unitone-css-vision-to-code
description: Convert screenshots or visual descriptions into structurally accurate unitone-css code by choosing primitives, tokens, and utilities deterministically.
compatibility: unitone-css repository. Requires access to unitone-css docs or MCP tools. Ignore dist.
---

# unitone-css Vision to Code

## When to use

Use this skill when the user provides:

- a screenshot
- a mockup
- a visual composition
- a design description that should be implemented with `unitone-css`

If the task proceeds to actual HTML or React code, also apply `unitone-css-coding-assistant`.

## Goal

Your goal is not pixel-perfect imitation by any means necessary.
Your goal is:

1. recover the real visual structure
2. map that structure to documented `unitone-css` primitives
3. choose the nearest documented token or utility values
4. keep decorative compromise acceptable, but do not lose structural fidelity

For screenshot work, structure is more important than decoration.

## Mandatory references

Before implementing, inspect these local references first:

- [references/structure-memo.md](./references/structure-memo.md)
- [references/primitive-selection.md](./references/primitive-selection.md)
- [references/token-approximation.md](./references/token-approximation.md)

Then inspect these docs:

- `patterns.mdx`
- `tokens.mdx`
- `utilities.mdx`

Then inspect the primitive docs that match the main structure.
At minimum, inspect the docs for any primitive you expect to use for:

- the outer section skeleton
- the main repeated pattern
- any real overlap

## Hard rules

- Do not invent primitives, utilities, tokens, or prop names.
- Prefer documented primitives over ad hoc flex or grid wrappers.
- Do not create custom classes in the first pass.
- Do not create custom CSS selectors in the first pass.
- Decorative effects may be dropped if the documented system cannot express them cleanly.
- Documented primitive-specific style values are allowed when the docs support them.
- Arbitrary `style` usage for decoration is not allowed in the first pass.

Allowed `style` in the first pass means only:

- documented primitive-specific custom properties
- documented size values such as `minHeight`, `sidebarWidth`, `columnMinWidth`
- documented grid placement values such as `--unitone--grid-column` and `--unitone--grid-row`

Not allowed in the first pass:

- one-off gradient tuning
- ad hoc transform positioning
- decorative shadows, masks, filters, or overlays that require invented CSS

## Two-pass workflow

### Pass 1: structure recovery

Write the memo using [references/structure-memo.md](./references/structure-memo.md).

If this memo is vague, do not implement yet.

### Pass 2: primitive mapping

For each major block, write one short line in this format before finalizing code:

- `Hero = Cover + Container + Stack + Center`
- `Feature grid = ResponsiveGrid + Stack`
- `News row = WithSidebar`

For any non-trivial split or overlap, compare at least 2 candidates before choosing.

Example:

- `Candidate A: WithSidebar because one side is structurally secondary`
- `Candidate B: BothSides because both columns are peers`
- `Choice: WithSidebar`

## Primitive selection defaults

Use [references/primitive-selection.md](./references/primitive-selection.md) as the default mapping table unless the screenshot clearly contradicts it.

## Critical interpretation rules

### Width ownership

Decide what owns width before adding text wrappers.

- `Text` is not a neutral wrapper
- use `Text` for readable prose rhythm
- do not let `Text` accidentally define the width of a hero, promo panel, or wide card
- when broad width is needed, let `Container`, `Center`, `Cover`, `Layers`, or another outer primitive own that width first

### Overlap

If a card, badge, panel, or CTA crosses another block's edge, treat that as real overlap.

- keep the overlapping pieces inside the same `Layers` composition when possible
- use explicit `grid-column` and `grid-row` placement when the overlap boundary matters
- do not fake the overlap with unrelated section spacing if the screenshot clearly overlaps

### Image role

- background image behind foreground content: compare `Layers` and `Cover`
- framed thumbnail or card media: `Frame`
- side visual beside copy: compare `WithSidebar` and `BothSides`
- purely decorative texture or pattern: consider `Texture`

## Token approximation bias

Do not guess raw px first.
Choose the nearest documented step first by using [references/token-approximation.md](./references/token-approximation.md).

## HTML and React output rules

- In React, use primitive components and props.
- Do not manually write primitive `data-unitone-layout` attributes in JSX when a React primitive exists.
- In plain HTML, use `data-unitone-layout` for primitives and `class` for utility families from `utilities.mdx`.
- Do not include the leading `.` when writing utility classes in `class`.

## What to omit

If a decorative effect requires invented CSS, omit it in the first pass.

Examples:

- custom gradient meshes
- image filters not covered by documented props or utilities
- one-off transforms for nudging decoration
- decorative borders or masks that are not part of the documented system

Keep the structural version correct instead.

## Verification checklist

- a structure memo was written first
- `patterns.mdx`, `tokens.mdx`, and `utilities.mdx` were inspected
- at least 2 candidates were considered for non-trivial split or overlap decisions
- each major section has an explicit primitive skeleton
- width ownership is explicit
- `Text` is not accidentally acting as the main width controller of a non-prose section
- real overlap stays inside one `Layers` composition when appropriate
- typography uses documented scale steps first
- spacing uses documented scale steps first
- colors are chosen from existing token families
- no custom classes or custom selectors were introduced in the first pass
- `style` is limited to documented primitive-specific values (Props) only

## Failure modes

- trying to chase polish before the block hierarchy is right
- using generic wrappers instead of a documented primitive
- guessing px values instead of choosing the nearest token step
- using `Text` as a neutral wrapper and unintentionally narrowing the layout
- recreating overlap with spacing instead of `Layers`
- using arbitrary `style` values for visual tuning in the first pass
