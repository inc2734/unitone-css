---
name: unitone-css-doc-sync
description: Compare unitone-css source structure with repository documentation and update docs when layout primitives, tokens, utilities, behaviors, or public exports have drifted.
compatibility: unitone-css repository with bash plus node. Ignore dist.
---

# unitone-css Doc Sync

## When to use

Use this skill when documentation may be out of date with the current `unitone-css` source tree.

Typical triggers:

- `src/layout-primitives` changed
- `src/settings` changed
- `src/utilities` changed
- `src/behaviors` changed
- public exports or package entry points changed

## Inputs required

- Repository root
- Target documentation scope, if known

## Procedure

1. Inspect the changed source area first.
   - `src/layout-primitives` for primitive additions, removals, renames, or API changes
   - `src/settings` and `src/variables` for token or Global CSS Variable changes
   - `src/utilities` for utility class additions, removals, or naming changes
   - `src/behaviors` for behavior additions or API changes
   - `package.json` exports when public import paths may have changed
2. Use MCP tools when available:
   - `list_primitives`
   - `get_primitive`
   - `list_behaviors`
   - `list_utilities`
   - `get_utilities`
   - `get_variables`
   - `list_docs`
   - `get_doc`
3. Map source changes to likely documentation targets.
   - Primitive changes usually affect:
     - `website/src/content/docs/layout-primitives/*.mdx`
     - `website/src/content/docs/patterns.mdx`
     - `website/src/content/docs/overview.mdx`
     - skills or MCP docs when the public assistant workflow changed
     - `packages/skills/unitone-css-vision-to-code/SKILL.md` when primitive recommendation coverage or visual-to-primitive mapping changed
     - `packages/skills/unitone-css-coding-assistant/SKILL.md` when the recommended composition rules changed
   - Token changes usually affect:
     - `website/src/content/docs/tokens.mdx`
     - `website/src/content/docs/overview.mdx`
     - any docs that mention naming or available scales
     - `packages/skills/unitone-css-vision-to-code/SKILL.md` when token-first guidance for visual matching should change
     - `packages/skills/unitone-css-coding-assistant/SKILL.md` when preferred typography, color, or spacing guidance changed
   - Utility changes usually affect:
     - `website/src/content/docs/utilities.mdx`
     - `website/src/content/docs/patterns.mdx`
     - MCP docs if utility inspection tools are documented
     - `packages/skills/unitone-css-vision-to-code/SKILL.md` when visual refinement guidance should prefer the new or renamed utilities
     - `packages/skills/unitone-css-coding-assistant/SKILL.md` when code-generation guidance should prefer the new or renamed utilities
   - Behavior and export changes may also affect:
     - `README.md`
     - `unitone-css.md`
     - `website/src/content/docs/mcp.mdx`
     - `website/src/content/docs/skills.mdx`
4. Treat `packages/skills/` as documentation too when those skills shape user-facing assistant behavior.
   - Do not limit the sync target to `/website`.
   - Update skill files when source changes would otherwise leave stale primitive recommendations, token guidance, utility guidance, or verification rules.
5. Compare the documented surface against the current source structure.
6. Update only the documentation that is actually affected by the code changes.
7. Keep descriptions concrete and based on the current source.
8. If docs that feed AI artifacts changed, regenerate derived files.
   - regenerate `llms.txt`
   - keep examples and guidance aligned with current source naming

## Verification

- Added user-facing primitives, tokens, utilities, or behaviors are documented.
- Removed or renamed public features are not still documented under old names.
- Documentation examples match the current API shape and naming.
- `utilities.mdx` matches `src/utilities`.
- `tokens.mdx` matches current token names and scales from `src/settings` / `src/variables`.
- `patterns.mdx` still reflects the recommended primitive / utility composition style.
- Relevant skill docs under `packages/skills/` still reflect the current recommended assistant workflow.
- `llms.txt` is regenerated when relevant docs changed.
- Run the smallest useful verification command after edits.
  - `node bin/generate-llms-txt.mjs`
  - `npm run build -w website` when website docs or MDX structure changed
  - narrower checks are preferred when they are sufficient

## Failure modes

- Updating code without updating user-facing examples
- Leaving stale names in README or website pages
- Documenting behavior that is not actually exported
- Forgetting to update `utilities.mdx` after changing utility class names
- Forgetting to update `tokens.mdx` after changing token names or scales
- Regenerating nothing after changing docs that feed `llms.txt`
- Updating docs in ways that contradict the current recommended composition patterns

## Escalation

- If the intended public positioning is unclear, ask whether the feature is meant to be documented now or kept internal.
