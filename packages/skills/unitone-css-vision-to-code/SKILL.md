---
name: unitone-css-vision-to-code
description: Convert visual design screenshots or descriptions into high-quality unitone-css code using layout primitives and behaviors.
compatibility: unitone-css repository. Requires access to MCP tools like get_doc and list_primitives.
---

# unitone-css Vision to Code

## When to use

Use this skill when a user provides a screenshot, design mockup, or a visual description and asks to implement it using `unitone-css`.

## Procedure

1. **Analyze Visual Structure**:
   - Identify the main layout flows: Vertical, Horizontal, Grid, or Overlapping.
   - Detect repeated patterns (lists, cards, buttons).
   - Note spacing (gaps), alignment (center, start, end), and padding.

2. **Map to Primitives**:
   - Use `list_docs` and `get_doc` to find the best match for each identified structure.
   - **Vertical Stack**: Use `Stack`.
   - **Horizontal Flow (wrapping)**: Use `Cluster`.
   - **Horizontal Flow (both sides)**: Use `BothSides`.
   - **Centered Content**: Use `Center`.
   - **Responsive Grid**: Use `ResponsiveGrid`.
   - **Full Height/Vertical Centering**: Use `Cover`.
   - **Overlapping/Layers**: Use `Layers`.

3. **Refine with Behaviors**:
   - Apply spacing using `gap` or `gutters`.
   - Adjust typography and colors using standard unitone behaviors.
   - Use `data-unitone-layout` attributes for HTML or props for React.

4. **Iterative Refinement**:
   - Start with the outer layout and work inward.
   - Check if the generated code matches the visual hierarchy.

## Visual Mapping Table

| Visual Pattern | Unitone Primitive | Key Props/Attributes |
| :--- | :--- | :--- |
| Vertical list with even gaps | `Stack` | `gap` |
| Horizontal list that wraps | `Cluster` | `gap`, `align-items` |
| Title on left, link on right | `BothSides` | `gap` |
| Hero section with centered text | `Cover` | `min-height`, `gap` |
| Side-by-side (sidebar + main) | `WithSidebar` | `sidebar-width`, `gap` |
| Grid of cards (responsive) | `ResponsiveGrid` | `column-min-width`, `gap` |
| Content fixed in the center | `Center` | `max-width`, `gutters` |

## Verification

- The layout is responsive without media queries (using unitone's intrinsic sizing).
- `gap` values are from the unitone scale (-3 to 7).
- No custom CSS is used unless absolutely necessary; prefer unitone behaviors.
