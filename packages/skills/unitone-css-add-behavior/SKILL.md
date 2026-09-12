---
name: unitone-css-add-behavior
description: Add or modify shared or primitive-specific unitone-css behavior, keeping CSS layout tokens, JavaScript initialization, lifecycle cleanup, and public entrypoints aligned.
compatibility: Requires the unitone-css checkout and its Node.js toolchain. Ignore dist and .export as inspection sources.
---

# unitone-css Add Behavior

## Identify the scope

Use `list_behaviors` when MCP is available, then inspect the actual source. Primitive-specific JavaScript is under `src/layout-primitives/<name>/behavior.js` and is not included in the shared behavior listing.

Determine whether the change is CSS-only, JavaScript-backed, or both. Compare the closest behavior before introducing another one; extend an existing behavior when its public purpose is the same.

| Surface | Relevant entrypoints |
| --- | --- |
| Shared CSS behavior | `src/behaviors/_<name>.scss` and `src/behaviors/_index.scss` |
| Shared JavaScript | `src/behaviors/<name>.js` and `src/behaviors/index.js` |
| Primitive-specific JavaScript | `<name>/behavior.js`, `src/layout-primitives/index.js`, and `<name>/react.jsx` where needed |
| Shared measurement and observer logic | `src/library.js`, `src/observer-scope.js`, and `src/register-layout-initializer.js` |
| Public module paths | `package.json` and automatic discovery in `rollup.config.js` |

`src/app.js` loads both root JavaScript indexes. A per-primitive React import needs its own required behavior side effects. CSS and JavaScript filenames can differ, as with `divider` / `dividers`; follow the existing API instead of enforcing identical stems. Matching utility and behavior names can intentionally expose the same feature through classes and layout tokens.

## Implement

1. Keep attribute tokens, CSS selectors, custom properties, and affected React props consistent. If the same feature has a utility class, inspect that counterpart too.
2. For JavaScript initialization, follow the existing `registerLayoutInitializer` pattern with a stable unique key and the appropriate selector. Preserve its environment guards and shared initialization registry.
3. Reuse the existing observer-scope helpers for persistent observers, scheduled frames, and debounced work. An initializer that allocates resources should return an idempotent cleanup function.
4. Cleanup must disconnect observers and cancel pending work. Removed subtrees must be disposable and safely reinitializable after reinsertion; moving connected elements must not cause duplicate initialization.
5. Update only the entrypoints needed for full-app and individual imports. Existing Rollup discovery and wildcard exports usually cover conventional module paths.
6. Use `unitone-css-doc-sync` for affected examples, API descriptions, and public imports.

## Verify

For CSS-only changes, compile the relevant Sass and verify the documented tokens and selectors. For lifecycle changes, run the relevant cases in `tests/observer-lifecycle.test.mjs` and `tests/layout-observers.test.mjs`, adding coverage only for behavior those tests do not exercise.

For JavaScript changes, check that initialization remains safe without DOM globals, repeated initialization does not duplicate resources, and cleanup handles queued work and reinsertion. Verify both aggregate and individual entrypoints when their wiring changes. Report which paths were actually checked.
