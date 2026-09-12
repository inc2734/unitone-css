---
name: unitone-css-router
description: Select the unitone-css workflow when a request spans framework source, consuming markup, visual reproduction, or documentation, or when the appropriate workflow is unclear.
compatibility: Requires unitone-css source or documentation access. Ignore dist and .export.
---

# unitone-css Router

## Select the workflow

First distinguish changes to the framework itself from code that uses it. If the target and workflow are already clear, go directly to that workflow without repeating discovery.

| Request | Workflow | First relevant source |
| --- | --- | --- |
| Screenshot, mockup, or visual description | `unitone-css-vision-to-code`, then `unitone-css-coding-assistant` if implementing | Matching sections of `patterns.mdx` and primitive docs |
| HTML or React code using unitone-css | `unitone-css-coding-assistant` | Existing consuming code and relevant primitive docs |
| Add or change a framework primitive | `unitone-css-add-layout-primitive` | Closest directory under `src/layout-primitives` |
| Add or change shared or primitive-specific behavior | `unitone-css-add-behavior` | `src/behaviors` or the primitive's `behavior.js` |
| Change tokens, settings, or utilities | Inspect the affected source directly, then `unitone-css-doc-sync` | `src/variables`, `src/settings`, or `src/utilities` |
| Review public imports or exports | Inspect `package.json`, `rollup.config.js`, and source entrypoints; use `unitone-css-doc-sync` for documentation changes | Requested import path and its source entrypoint |
| Documentation or skill drift | `unitone-css-doc-sync` | Changed source and the documentation's maintained original |

A review request remains a review. Select the relevant workflow for inspection; implementation steps apply only when changes are requested and authorized.

## Inspect only what selects the route

- Use the corresponding MCP tools when available: `list_primitives` / `get_primitive`, `list_behaviors`, `list_utilities` / `get_utilities`, or `get_variables`.
- Use `list_docs`, `search_docs`, or `get_doc` to locate relevant documentation. Do not enumerate every API family for an already-scoped task.
- Without MCP, read the corresponding source directories and `website/src/content/docs` in the framework checkout. A consuming project may need a separate framework checkout or documentation access.
- Do not treat MCP file metadata as a prop or import specification; inspect the relevant source or documentation before using an API.

For mixed tasks, establish the primitive structure and public API first, then behavior, then documentation. Carry forward inspected docs and decisions; do not ask the next workflow to repeat them.

## Handoff

State the selected workflow and any material uncertainty briefly. Leave visual analysis and code-generation rules to the selected skill; no separate routing memo is required.

Ask for missing information only when it changes the target, public behavior, or intended output and cannot be inferred from the repository or request.
