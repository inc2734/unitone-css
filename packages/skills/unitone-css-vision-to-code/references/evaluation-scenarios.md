# Evaluation Scenarios

Use these fixed scenarios when tuning `unitone-css-vision-to-code`.

The goal is reproducibility, not coverage of every UI.

## Shared checklist

1. `[critical]` structure memo exists before code
2. `[critical]` pattern lookup names exact `patterns.mdx` sections
3. `[critical]` primitive skeleton is explicit for each major block
4. width owner is explicit
5. token plan exists before code
6. at least one non-trivial comparison is recorded
7. no invented primitive, utility, token, or prop name appears

Ask the evaluator to report:

- output summary
- checklist result for each item
- ambiguities
- assumptions
- retries

## Scenario A: median hero

Top area with a full-width background photo.
Foreground has a large heading, short body copy, and two CTA buttons.
Immediately below, three equal feature cards sit near the lower edge of the hero.
The cards visually touch or slightly cross the hero boundary.

Main risk:

- `Cover` vs `Layers`
- false overlap by spacing

## Scenario B: edge article layout

Main article body on the left.
Narrow sidebar on the right with author info and share actions.
A wide image appears near the top.
A small category badge overlaps one corner of the image.
Later in the page, related cards appear in two columns.
Readable text width matters.

Main risk:

- `WithSidebar` vs `BothSides`
- `Text` as width owner
- small real overlap vs decorative badge

## Scenario C: hold-out pricing section

Section heading and short lead at the top.
Below that, three pricing columns repeat evenly.
The middle plan is visually emphasized with a stronger background.
Each column has plan name, price, bullet list, and CTA.
On mobile, the layout should stack.
No overlap is present.

Main risk:

- `ResponsiveGrid` vs `Switcher`
- repeated-unit discipline
