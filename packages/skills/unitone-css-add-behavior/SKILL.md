---
name: unitone-css-add-behavior
description: Add or update a behavior in unitone-css while keeping stylesheet, JavaScript helper, naming, and public API conventions aligned.
compatibility: unitone-css repository with bash plus node. Ignore dist.
---

# unitone-css Add Behavior

## When to use

Use this skill when adding a new behavior or modifying an existing behavior under `src/behaviors`.

## Inputs required

- Behavior name
- Intended effect
- Closest existing behavior, if known

## Procedure

1. Use `list_behaviors` to find the closest existing pattern.
2. Inspect whether the behavior is stylesheet-only, JavaScript-backed, or both.
3. Update the relevant files under `src/behaviors` while preserving naming conventions.
4. Keep stylesheet and JavaScript sides aligned if both exist.
5. Update any shared behavior entrypoints when the behavior is public.
6. Check whether layout primitives or documentation rely on the changed behavior.

## Verification

- The behavior is reachable through the intended public entrypoint.
- Naming matches existing behavior patterns.
- Any JavaScript helper and stylesheet remain consistent with each other.
- The change ignores `dist`.

## Failure modes

- Adding a stylesheet without exposing the behavior
- Updating JavaScript behavior logic without matching stylesheet support
- Introducing a name that conflicts with an existing utility or behavior

## Escalation

- If the behavior overlaps with an existing one, explain whether the change should extend the old behavior or create a new one.
