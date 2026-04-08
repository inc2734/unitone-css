---
name: unitone-css-doc-sync
description: Compare unitone-css source structure with repository documentation and update docs when primitives, behaviors, or public exports have drifted.
compatibility: unitone-css repository with bash plus node. Ignore dist.
---

# unitone-css Doc Sync

## When to use

Use this skill when documentation may be out of date with the current `unitone-css` source tree.

## Inputs required

- Repository root
- Target documentation scope, if known

## Procedure

1. Inspect current primitives, behaviors, variables, and exports.
2. Review relevant docs such as:
   - `README.md`
   - website documentation files
   - any examples that describe public usage
3. Compare the documented surface against the current source structure.
4. Update only the documentation that is actually affected by the code changes.
5. Keep descriptions concrete and based on the current source.

## Verification

- Added primitives or behaviors are documented if they are user-facing.
- Removed or renamed public features are not still documented under old names.
- Documentation examples match the current API shape.

## Failure modes

- Updating code without updating user-facing examples
- Leaving stale names in README or website pages
- Documenting behavior that is not actually exported

## Escalation

- If the intended public positioning is unclear, ask whether the feature is meant to be documented now or kept internal.
