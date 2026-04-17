---
name: unitone-css-coding-assistant
description: STRICT guidelines for unitone-css code generation. No margins, no fake utilities, no data-attributes in React.
compatibility: unitone-css repository.
---

# unitone-css Coding Assistant (STRICT)

## Core Mandates

1. **React Rules**:
   - **DO NOT** use `data-unitone-layout` attributes in React.
   - Use React component props only.
   - For styles not covered by props, use inline `style` with `--unitone--*` variables.

2. **Check Patterns First**:
   - Before inventing a composition, check whether the requested UI already matches a documented pattern in `website/src/content/docs/patterns.mdx`.
   - Prefer the documented primitive combination when a matching pattern exists.
   - Treat `patterns.mdx` as the default reference for multi-primitive page sections such as heroes, announcement lists, card grids, feature lists, and sidebar layouts.

3. **Utilities Exist, But They Are Secondary**:
   - `unitone-css` includes utility classes such as `-font-size:*`, `-padding:*`, `-gap:*`, `-color:*`, and `-background-color:*`.
   - Prefer primitive props and primitive composition first.
   - Use utilities mainly on non-primitive elements when they express a small presentational adjustment more clearly than custom CSS.
   - Do not pile utility classes onto a primitive when a primitive prop or an extra wrapper would be clearer.

4. **The No-Margin Rule**:
   - **ABSOLUTELY NO MARGINS**. Do not use `margin-top`, `-margin:1`, etc.
   - Element spacing is handled via `gap` on a parent primitive (`Stack`, `Cluster`, `Decorator`).

5. **Decorator is Key**:
   - Use `Decorator` to add `padding`, `gap`, `borderWidth`, and `overflow` to elements.
   - If a `Stack` needs padding, wrap its contents in a `Decorator`.

6. **Alignment Values**:
   - Use `start` and `end`, NOT `flex-start` or `flex-end`.

## Procedure

1. **Analyze Design**:
   - Break the design into primitives.
   - Check `patterns.mdx` for an existing composition before creating a new one.
   - If borders or internal spacing (padding) are needed, wrap in a `Decorator`.
2. **Implementation (React)**:
   - Use props: `<Decorator padding={1} gap={1}>`.
   - Use scale for typography: `style={{ '--unitone--font-size': 2 }}`.
   - If utilities are available, they can be used on plain elements for small adjustments such as `className="-font-size:xl -color:heavy-indigo"`.
   - Use scale for custom spacing: `style={{ padding: 'var(--unitone--p-1)' }}`.
3. **Verification**:
   - Are there any `data-unitone-layout` attributes in JSX? (If YES, fix it).
   - Are there any `margin` styles? (If YES, fix it).
   - Are utility classes being used on primitives where props or composition would be clearer? (If YES, refactor it).
   - Are the alignment values `start/center/end`? (If NO, fix it).
