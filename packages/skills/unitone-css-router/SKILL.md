---
name: unitone-css-router
description: Route unitone-css tasks to the correct workflow by inspecting layout primitives, behaviors, variables, and documentation touchpoints first.
compatibility: unitone-css repository with bash plus node. Ignore dist.
---

# unitone-css Router

## When to use

Use this skill at the start of most `unitone-css` tasks when you need to classify the request before making changes.

## Inputs required

- Repository root
- The user's requested outcome

## Procedure

1. Inspect the repository shape first.
2. Use MCP tools when available:
   - `list_primitives`
   - `list_behaviors`
   - `list_utilities`
   - `get_variables`
3. Classify the request into one or more workflow types:
   - add or update a layout primitive
   - add or update a behavior
   - update tokens or utilities
   - sync or expand documentation
   - inspect public API surface
4. Route to the most relevant skill:
   - `unitone-css-add-layout-primitive`
   - `unitone-css-add-behavior`
   - `unitone-css-doc-sync`
5. Follow repository conventions already present in `src`.

## Screenshot reproduction guidance

Use this guidance when the user wants a screenshot or mockup reproduced with `unitone-css`.

- Start from documented token and utility tables instead of guessing from class names.
- For font size selection, choose the nearest documented size first.
- For compact UI such as dates, metadata, notice rows, and side notes, prefer the smaller of two close font-size candidates.
- Reserve larger font sizes mainly for obvious headings. Body-like content and list rows usually fit better in smaller steps.
- Use `-fluid-typography` mainly for large headings that must remain responsive. Do not apply it automatically to every heading.
- For spacing and padding, estimate the target size from the screenshot and then pick the nearest documented token step.
- When a spacing or padding target looks between two steps, prefer the smaller step first because line-height and neighboring gaps can make spacing appear larger.
- For color matching, compare palette tokens within the same hue family first, such as `light-*`, base, `dark-*`, and `heavy-*`.
- Do not assume a semantic color token is always the closest visual match. Choose the visually closest existing token before introducing custom CSS.
- Prefer primitive composition and documented utilities first. Use custom CSS only after the nearest `unitone-css` option is still visibly off.

## Verification

- The selected workflow matches the files that will actually change.
- The task does not rely on `dist`.

## Failure modes

- If the request spans both primitives and behaviors, handle the primitive structure first and then the behavior updates.
- If the intended API surface is unclear, inspect `package.json` exports before editing.

## Escalation

- Ask one short clarifying question only if the change target cannot be inferred from the repository or request.
