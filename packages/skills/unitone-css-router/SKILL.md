---
name: unitone-css-router
description: Route unitone-css tasks to the correct workflow by inspecting primitives, utilities, tokens, behaviors, and documentation first.
compatibility: unitone-css repository with bash plus node. Ignore dist.
---

# unitone-css Router

## When to use

Use this skill at the start of most `unitone-css` tasks.

Its role is not to solve the task directly. Its role is to decide:

1. what kind of task this is
2. which documented surface is relevant
3. which skill should do the implementation work

## Required inputs

- repository root
- user request

## First inspection

Inspect the current source and docs before deciding anything.

Use MCP tools when available:

- `list_primitives`
- `list_behaviors`
- `list_utilities`
- `get_variables`
- `list_docs`

For screenshot or mockup work, also inspect these docs first:

- `patterns.mdx`
- `tokens.mdx`
- `utilities.mdx`
- the relevant primitive page when one is likely involved

## Task classification

Classify the request into one or more of these buckets:

- screenshot or mockup reproduction
- add or update a layout primitive
- add or update a behavior
- update tokens, variables, or utilities
- sync documentation
- inspect public API surface

## Routing rules

- Screenshot or mockup reproduction:
  use `unitone-css-vision-to-code` first, then `unitone-css-coding-assistant`
- Writing or revising actual React / JSX / HTML with `unitone-css`:
  use `unitone-css-coding-assistant`
- Primitive source work:
  use `unitone-css-add-layout-primitive`
- Behavior source work:
  use `unitone-css-add-behavior`
- Doc drift or skill drift:
  use `unitone-css-doc-sync`

If the request spans multiple areas, process them in this order:

1. primitive or layout structure
2. behavior
3. docs and skills

## Screenshot-specific routing memo

When the user wants a screenshot reproduced, write a short routing memo before implementing:

- `Target entry point`: React or plain HTML
- `Likely primitives`: 2 to 5 candidates
- `Likely docs`: exact doc files to consult
- `Main risk`: width control, overlap, repeated cards, sidebar collapse, decorative-only effects, or typography scale

If this memo is vague, inspect more docs before proceeding.

## Screenshot-to-primitive hints

Use these as routing defaults before free-form invention.

- centered hero: `Cover` + `Container` + `Stack` + `Center`
- hero with background image: compare `Layers` and `Cover`
- card crossing image or section edge: compare `Layers` and `Float`
- left label + right content: compare `BothSides` and `WithSidebar`
- responsive card list: compare `ResponsiveGrid`, `Switcher`, and `Masonry`
- row metadata + body: compare `WithSidebar`, `BothSides`, and `Stack`
- button row or tag row: `Cluster`
- framed media: `Frame`
- article copy: `Text`
- broad section spacing: `Gutters` and `Container`
- surface decoration: `Decorator`

## Decision standards

Choose the route that:

- uses existing primitives before custom CSS
- matches the actual files that need to change
- leans on current docs instead of memory
- does not depend on `dist`

## Failure modes

- jumping into code before reading `patterns.mdx` for common compositions
- treating screenshot work as pure decoration instead of structure mapping
- skipping `tokens.mdx` and then guessing scale values
- using `unitone-css-coding-assistant` alone for screenshot work without `unitone-css-vision-to-code`
- routing a docs drift problem as if it were only source work

## Verification

- the selected workflow matches the intended file changes
- the docs consulted are named explicitly
- screenshot tasks are routed through both structure mapping and implementation guidance
- `dist` is ignored

## Escalation

Ask one short clarifying question only if the intended entry point or change target cannot be inferred from the request and repository.
