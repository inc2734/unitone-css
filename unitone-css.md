# unitone-css AI Coding Guide (Strict Version)

This guide contains the absolute rules for `unitone-css`. Deviating from these is an error.

## 1. Implementation Priority
1.  **Primitive Props**: Use component props (React) or specific attributes (HTML).
2.  **Primitive Composition**: Nest primitives (e.g., `Decorator` inside `Stack`) to add padding or gaps.
3.  **CSS Variables**: Use `--unitone--*` variables for fine-tuning styles that props cannot cover.

If the requested UI matches an established composition pattern, prefer the documented pattern structure from `website/src/content/docs/patterns.mdx` before inventing a new composition.

## 2. React vs HTML Rules
- **React layout primitive components**: Prefer component props. When using the React components provided by unitone-css layout primitives, do not replace their API with manual `data-unitone-layout` attributes.
- **HTML**: Use `data-unitone-layout="primitive -prop:value"`.

## 3. Layout and Spacing (The No-Margin Rule)
- **Margins**: Prefer primitive composition and `gap` for spacing between sibling elements. Do not introduce ad-hoc margin utilities or custom margins when a primitive prop or composition can solve the layout more clearly.
- **Padding**: Use the `padding` prop of a `Decorator` or other supporting primitives.
- **Decorator**: Use `Decorator` for borders, background-colors, and internal padding.
- **Utilities**: Small utility classes such as `-font-size:*`, `-padding:*`, `-gap:*`, `-color:*`, `-background-color:*`, `-align-items:*`, `-justify-content:*`, `-overflow:*`, and `-position:*` are available. Use them mainly on non-primitive elements after checking whether primitive props or primitive composition would describe the intent more clearly.

## 4. Typography and Scale
- **Use Existing Utilities Only**: Do not invent utility classes such as `-fz:2` or `-fw:bold`. If you use utilities, stick to the ones provided by `src/utilities`, such as `-font-size:*`, `-align-items:*`, and `-overflow:*`.
- **Scaling (CSS Variables)**:
  - Use `--unitone--font-size` for font-size.
  - **Avoid Redundancy**: Do not specify `--unitone--font-size: 0` if the default size (1rem) is sufficient.
  ```jsx
  <h2 style={{ '--unitone--font-size': 2, fontWeight: 'bold' }}>Title</h2>
  ```
- **Token Naming (Strict)**:
  - **Padding**: `--unitone--p{variation}` (e.g., `--unitone--p1`, `--unitone--p-1` for negative).
  - **Gap/Margin**: `--unitone--s{variation}` (e.g., `--unitone--s1`, `--unitone--s-1`).
  - **Note**: Variations 1-7 do not have a hyphen after the prefix (e.g., `p1`), but negative variations do (e.g., `p-1`). There is no `p0` with a hyphen.

## 5. Visual Mapping Table

| Visual Pattern | Unitone Primitive | Key Props |
| :--- | :--- | :--- |
| Vertical spacing | `Stack` | `gap` |
| Horizontal (wrap) | `Cluster` | `gap`, `justifyContent="end"` (not flex-end) |
| Border/Padding/Gap | `Decorator` | `padding`, `gap`, `borderWidth`, `overflow` |
| Centering | `Center` | `maxWidth`, `gutters` |

Common multi-primitive compositions such as page heroes, announcement lists, card grids, and sidebar layouts should follow `patterns.mdx` when an example exists.

## 6. Prohibited Actions
- Replacing the API of unitone-css React layout primitive components with manual `data-unitone-layout` attributes.
- Using `flex-start` or `flex-end` (use `start` or `end`).
- Inventing tokens like `--unitone--p-0` (use `--unitone--p0`).
