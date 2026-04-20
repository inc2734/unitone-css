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

## Required inputs

- target entry point: React or plain HTML
- one of:
  - screenshot
  - mockup
  - visual description
- repository docs access

If the entry point is not stated but can be inferred from the surrounding task, infer it once and continue.
If the visual input is too incomplete to identify the block structure, do not jump to code.

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

Then inspect these docs in this order:

- `patterns.mdx`
- `tokens.mdx`
- `utilities.mdx`

From `patterns.mdx`, read:

1. `How To Read This Page`
2. `Quick Pattern Map`
3. the exact pattern sections that best match the target

Then inspect the primitive docs that match the chosen structure.
At minimum, inspect the docs for any primitive you expect to use for:

- the outer section skeleton
- the main repeated pattern
- any real overlap

Do not rely on memory when `patterns.mdx` already has a matching example.

## Hard rules

- Do not invent primitives, utilities, tokens, or prop names.
- Prefer documented primitives over ad hoc flex or grid wrappers.
- In the first pass, do not write custom CSS when primitives, utilities, and documented primitive props can express the structure.
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
- writing a CSS block just to compensate for a missed primitive or missed utility class

## Two-pass workflow

### Pass 1: structure recovery

Write the memo using [references/structure-memo.md](./references/structure-memo.md).

If this memo is vague, do not implement yet.

After the memo, write a `Pattern lookup` block before any code or final mapping.
This block must name:

- `Dominant pattern from patterns.mdx`
- `Compared patterns`
- `Why the winner fits better`

Minimum example:

```md
Pattern lookup
- Dominant pattern from patterns.mdx: `Layered Hero`
- Compared patterns: `Page Hero`, `Section With Decorative Background`
- Why the winner fits better: the foreground content and the cards cross the image boundary, so overlap is part of the composition rather than decoration
```

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

After the primitive skeleton, write a `Token plan` block.
This block must include at least:

- heading scale candidates
- body scale candidates
- gap or padding candidates
- color family candidates when color is visually important
- utility classes to use for typography or simple color/background treatment

Use documented token families and utility classes only.

## Primitive selection defaults

Use [references/primitive-selection.md](./references/primitive-selection.md) as the default mapping table unless the screenshot clearly contradicts it.

## Critical interpretation rules

### Implementation gate

Do not emit code or final markup until all items below exist:

1. structure memo
2. pattern lookup with exact `patterns.mdx` section names
3. primitive skeleton for each major block
4. token plan

If one of these is missing, stop and complete it first.

### Width ownership

Decide what owns width before adding text wrappers.

- `Text` is not a neutral wrapper
- use `Text` for readable prose rhythm
- do not let `Text` accidentally define the width of a hero, promo panel, or wide card
- when broad width is needed, let `Container`, `Center`, `Cover`, `Layers`, or another outer primitive own that width first

### Section spacing ownership

For ordinary page sections, let `Gutters` provide the basic section padding first.

- `Container` owns width
- `Gutters` owns the section's basic inset and block padding
- `Stack` owns explicit relationships between siblings

Do not wrap the whole page in an outer `Stack` just to recreate the default spacing between sections when each section already uses `Gutters`.
Use an outer `Stack` only when the relationship between whole sections is itself the intended structure.

### Utility-first visual approximation

Before considering custom CSS, exhaust these levers first:

1. primitive composition
2. primitive modifiers and documented props
3. utility classes from `utilities.mdx`

For screenshot work, typography should usually be expressed with:

- `-fluid-typography`
- `-font-size:*`
- `-font-weight:bold`

Simple color and surface treatment should usually be expressed with:

- `-color:*`
- `-background-color:*`
- `-padding:*`

If the output is missing these obvious utilities and instead reaches for custom CSS, stop and refactor.

### Sidebar semantics

For `WithSidebar`, treat the narrower side as the sidebar by default.

- narrower left side -> `sidebar="left"`
- narrower right side -> `sidebar="right"`

Do not choose the sidebar side based on DOM order convenience alone.
Choose it based on the structural width relationship visible in the screenshot.

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

If text and image visually overlap, start from `Layers`.
Do not fake that relationship with a background image plus unrelated spacing wrappers.

## Token approximation bias

Do not guess raw px first.
Choose the nearest documented step first by using [references/token-approximation.md](./references/token-approximation.md).

If two candidates are close, prefer the smaller documented step first and record both candidates in the `Token plan`.

## HTML and React output rules

- In React, use primitive components and props.
- Do not manually write primitive `data-unitone-layout` attributes in JSX when a React primitive exists.
- In plain HTML, use `data-unitone-layout` for primitives and `class` for utility families from `utilities.mdx`.
- Do not include the leading `.` when writing utility classes in `class`.

## Ambiguity control

Do not silently invent structure when the visual evidence is weak.

If any of these remain ambiguous after reading the references and docs:

- dominant relationship
- width owner
- whether overlap is real
- repeated unit
- image role

then do one of these instead of forcing code:

1. return the structure memo and primitive candidates only
2. ask one short clarifying question if the missing detail is critical

When you proceed anyway, explicitly list the assumption in `Assumptions used`.

Keep `Assumptions used` short.
If it would exceed 2 bullets, stop before code and return structure only.

## Final response contract

For screenshot or mockup work, present the result in this order:

1. `Structure memo`
2. `Pattern lookup`
3. `Primitive skeleton`
4. `Token plan`
5. `Assumptions used`
6. `Decorative omissions`
7. final code or final implementation mapping

`Assumptions used` may be `none`.
`Decorative omissions` may be `none`.

## What to omit

If a decorative effect requires invented CSS, omit it in the first pass.

Examples:

- custom gradient meshes
- image filters not covered by documented props or utilities
- one-off transforms for nudging decoration
- decorative borders or masks that are not part of the documented system

Keep the structural version correct instead.

This skill is not trying to reproduce a polished component library.
It is trying to recover layout structure with primitives.
If structure is right and decorative finish is rough, that is acceptable.

## Verification checklist

- a structure memo was written first
- a `Pattern lookup` block named the exact `patterns.mdx` sections consulted
- `patterns.mdx`, `tokens.mdx`, and `utilities.mdx` were inspected
- at least 2 candidates were considered for non-trivial split or overlap decisions
- each major section has an explicit primitive skeleton
- a `Token plan` was written before final code
- width ownership is explicit
- section spacing ownership is explicit
- `Text` is not accidentally acting as the main width controller of a non-prose section
- real overlap stays inside one `Layers` composition when appropriate
- typography uses documented scale steps first
- spacing uses documented scale steps first
- colors are chosen from existing token families
- obvious typography and color choices use utility classes before custom CSS
- `WithSidebar` uses the narrower side as `sidebar="left"` or `sidebar="right"`
- no custom classes or custom selectors were introduced in the first pass
- `style` is limited to documented primitive-specific values (Props) only
- assumptions are explicit and limited
- if ambiguity stayed high, the response stopped at structure-only output instead of inventing details

## Failure modes

- trying to chase polish before the block hierarchy is right
- skipping `patterns.mdx` examples that already match the target
- using generic wrappers instead of a documented primitive
- guessing px values instead of choosing the nearest token step
- writing custom CSS before using the obvious utility classes
- using a page-level `Stack` to recreate section spacing that `Gutters` should already own
- choosing `WithSidebar` side from source order instead of visible narrow-side semantics
- using `Text` as a neutral wrapper and unintentionally narrowing the layout
- recreating overlap with spacing instead of `Layers`
- using arbitrary `style` values for visual tuning in the first pass
- hiding uncertainty instead of reporting assumptions or stopping at structure only
