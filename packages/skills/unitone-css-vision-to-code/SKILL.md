---
name: unitone-css-vision-to-code
description: Analyze screenshots, mockups, and visual descriptions for unitone-css, mapping structure to primitives and documented tokens before HTML or React implementation.
compatibility: Requires visual input and access to unitone-css docs or source. Ignore dist and .export.
---

# unitone-css Vision to Code

## Scope

Recover the visual structure, choose documented primitives and tokens, and hand the decisions to `unitone-css-coding-assistant` when implementation is requested. For analysis-only requests, return the mapping without code.

Infer React versus plain HTML from the consuming project when possible. Distinguish observed facts from assumptions; ask only about uncertainty that would materially change the structure or behavior.

## Read references as needed

Use matching documentation under `website/src/content/docs` in the framework checkout, or MCP `get_doc` / `search_docs`. Do not assume these files are present in a consuming project's root.

- For a new composition, scan `Quick Pattern Map` in `patterns.mdx`, then read the relevant pattern and primitive sections. Read `How To Read This Page` when its conventions are unfamiliar.
- Use [structure memo](references/structure-memo.md) to organize a complex page or an unclear hierarchy; a simple component needs only a short note.
- Use [primitive selection](../unitone-css-coding-assistant/references/primitive-selection.md) when deciding between plausible structures.
- Use [token approximation](../unitone-css-coding-assistant/references/token-approximation.md) and the relevant sections of `tokens.mdx` / `utilities.mdx` when estimating visual values.
- Use [evaluation scenarios](references/evaluation-scenarios.md) when revising this skill or comparing its output, not during ordinary implementation.

Reuse references and decisions already inspected in the current task. Current source and docs override reference defaults.

## Analyze and map

1. Identify the main blocks, split or repeated relationships, width ownership, image roles, and any real overlap. Record typography tiers when they matter.
2. Select a matching documented pattern where one exists. Compare alternatives when a split, overlap, or responsive transition is genuinely ambiguous; do not force a second candidate for an obvious structure.
3. Map each major block to a primitive composition. Record the important choice and its reason, for example `Feature cards = ResponsiveGrid + Stack`.
4. Select documented typography, spacing, and color candidates. Record a plausible alternative when useful; do not start from arbitrary pixel values.
5. Pass the composition, selected props/tokens, relevant doc locations, and unresolved material assumptions to `unitone-css-coding-assistant` for implementation.

These decisions must exist before markup, but they can be one compact memo. Exact headings, a fixed number of bullets, and a separate seven-part report are not required.

## Visual interpretation

- Distinguish section width, prose measure, and internal padding. `Container` commonly controls page width, `Gutters` supplies section insets, and `Stack` controls sibling gaps. Do not introduce a page-level `Stack` solely to duplicate section padding.
- `Text` is width-aware; do not accidentally use it as the width controller for a broad hero or promotional panel.
- In `WithSidebar`, the narrower side is normally the sidebar. Choose `sidebar="left"` or `sidebar="right"` from the structural width relationship, not DOM convenience.
- Treat an element crossing another block's edge as real overlap. Prefer a shared `Layers` composition when appropriate and decide placement explicitly; smaller floating elements may suit `Float`.
- Distinguish a backdrop, framed media, side visual, and decorative texture before selecting the image's primitive. Revisit the composition if text and media need to overlap.
- When only one viewport is shown, infer a conservative responsive arrangement from the documented primitive behavior. State material assumptions instead of claiming an unseen mobile design was reproduced.

## Implementation constraints

Follow `unitone-css-coding-assistant` for markup, props, imports, styling, and verification. Retain its first-pass restriction on custom classes, selectors, and decorative inline styles. Structural fidelity comes first; explain material decorative omissions instead of silently treating them as complete.

Do not invent APIs or force a layout choice when critical visual information is absent. Continue portions that are clear; ask about the missing structural decision, or provide a provisional mapping if that is the requested output. The number of assumptions alone is not a reason to stop.

## Deliver and verify

For a mapping request, show the proposed composition and important choices. For an implementation request, report the result with only the decisions, assumptions, omissions, and checks needed to assess it. Provide a detailed memo only when useful or requested.

Review the output against the visual input: hierarchy, width, actual overlap, repeated units, and responsive transitions. Verify the documented API with the coding skill, and inspect rendered output at relevant widths when possible. Distinguish source/API checks from visual verification.
