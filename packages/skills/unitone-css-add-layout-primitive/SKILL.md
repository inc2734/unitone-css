---
name: unitone-css-add-layout-primitive
description: Add or update a layout primitive in unitone-css while preserving existing file structure, naming, exports, and documentation expectations.
compatibility: unitone-css repository with bash plus node. Ignore dist.
---

# unitone-css Add Layout Primitive

## When to use

Use this skill when adding a new primitive under `src/layout-primitives` or reshaping an existing one.

## Inputs required

- Primitive name
- Intended behavior
- Closest existing primitive, if known

## Procedure

1. Use `list_primitives` and `get_primitive` to find the closest existing pattern.
2. Inspect the chosen primitive and copy only the structure that is actually needed.
3. Create or update the expected files under `src/layout-primitives/<name>/`.
4. Keep naming aligned with the directory name:
   - `index.jsx`
   - `react.jsx` when a React wrapper is expected
   - `_index.scss`
5. Update shared entrypoints or indexes if the primitive must be publicly reachable.
6. Check whether related behavior modules or documentation also need changes.

## Verification

- The primitive directory structure matches existing conventions.
- Public exports are updated where needed.
- Any React wrapper remains aligned with the primitive API.
- The change does not depend on `dist`.

## Failure modes

- Missing shared index updates
- Missing React wrapper for a primitive that follows the standard wrapper pattern
- Naming drift between directory name and stylesheet names

## Escalation

- If the primitive introduces a new public API concept, document the naming and export decision before continuing.
