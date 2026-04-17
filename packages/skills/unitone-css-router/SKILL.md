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

## Verification

- The selected workflow matches the files that will actually change.
- The task does not rely on `dist`.

## Failure modes

- If the request spans both primitives and behaviors, handle the primitive structure first and then the behavior updates.
- If the intended API surface is unclear, inspect `package.json` exports before editing.

## Escalation

- Ask one short clarifying question only if the change target cannot be inferred from the repository or request.
