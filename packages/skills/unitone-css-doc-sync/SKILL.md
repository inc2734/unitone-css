---
name: unitone-css-doc-sync
description: Review or synchronize unitone-css documentation and distributed skills after source, token, utility, behavior, export, or assistant-workflow changes, including generated documentation copies.
compatibility: Requires the unitone-css checkout and Node.js for generation scripts. Ignore dist and .export as inspection sources.
---

# unitone-css Doc Sync

## Establish the affected surface

Start from the changed source or the requested review scope. Compare public behavior, names, props, and imports against the relevant documentation. Review-only requests produce findings; editing and generation steps apply when changes are requested and authorized.

Use relevant MCP discovery tools and `get_doc` / `search_docs` when available, or read the source and docs directly. Do not enumerate every primitive, utility, and token for a change confined to one feature. Verify API details in source; file-level MCP metadata is not a complete API description.

## Choose the maintained original

| Change | Maintained source / documentation | Related updates when affected |
| --- | --- | --- |
| Primitive structure or props | `src/layout-primitives` and `website/src/content/docs/layout-primitives/*.mdx` | `patterns.mdx`, `overview.mdx`, primitive-selection guidance |
| Tokens or variables | `src/variables`, `src/settings`, and `website/src/content/docs/tokens.mdx` | `utilities.mdx`, examples, token-approximation guidance |
| Utility classes | `src/utilities` and `website/src/content/docs/utilities.mdx` | Equivalent behavior, patterns, coding guidance |
| Behavior or public imports | `src/behaviors`, primitive `behavior.js`, `package.json`, and `rollup.config.js` | Relevant primitive docs, root `README.md`, `unitone-css.md` |
| MCP usage | `packages/mcp/README.md` | Generated `website/src/content/docs/mcp.mdx` |
| Skill distribution or installation | `packages/skills/README.md` and `packages/skills/dependencies.json` | Generated `website/src/content/docs/skills.mdx`, installer checks |
| Assistant decisions or workflow | `packages/skills/*/SKILL.md` and their `references/` | Dependency manifest and evaluation scenarios when references or responsibilities change |

Treat distributed skills as documentation when they guide user-facing code generation. Update the relevant reference as well as the skill entrypoint when a recommendation or token approximation changes.

Do not edit generated `mcp.mdx` or `skills.mdx` as their maintained originals: the package README files overwrite them during synchronization. Installed agent skill directories are copies of `packages/skills`; refresh an intended installation with the installer rather than maintaining separate wording there.

## Update and synchronize

1. Update only affected maintained files. Remove stale names and examples, and keep descriptions tied to the actual public API.
2. When package README files change, run `npm run sync:packages -w website` from the repository root.
3. When documentation consumed by the AI summary changes, run `node bin/generate-llms-txt.mjs` after package-document synchronization. Review any generated diff; regeneration can legitimately produce no change.
4. When skill references or dependencies change, check links in a temporary installation and update `dependencies.json` if needed. A standalone skill edit does not by itself require rebuilding website docs.

## Verification

- Confirm examples use exported imports, supported props/tokens, and the documented spelling of utility classes.
- Check that renamed or removed APIs are absent from the affected examples and skill references.
- Ensure generated copies match their maintained originals and no unrelated files changed during generation.
- Run `node --test tests/skillpack-install.test.mjs` when distribution or dependency changes affect installation.
- For skill behavior changes, use the relevant evaluation scenarios and assess the resulting API and layout choices, not just memo headings.
- Build the website with `npm run build -w website` when MDX structure, imports, or rendering changed; prefer synchronization and diff checks for prose-only updates. Inspect build scripts before running commands that also format or regenerate unrelated files.

Report the affected maintained files, generated updates, verification, and any remaining mismatch. Ask about public positioning only when it cannot be inferred and materially changes what should be documented.
