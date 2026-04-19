# Structure Memo

Write this memo before implementing screenshot-based code.

Keep it short, but not vague.

## Required headings

- `Main blocks`
- `Dominant relationship`
- `Width owner`
- `Overlap`
- `Repeated patterns`
- `Image role`
- `Typography tiers`

## What each heading must contain

### `Main blocks`

List the main sections from top to bottom.

Good:

- hero
- feature grid
- testimonial strip
- footer CTA

Bad:

- some cards
- content area

### `Dominant relationship`

Name the actual layout logic:

- stack
- split
- grid
- layer
- float

If more than one applies, say which one dominates.

### `Width owner`

For each major block, name the primitive that should own width.

Examples:

- hero copy width: `Container`
- article body width: `Text`
- card grid width: `Container`

Do not leave width ownership implicit.

### `Overlap`

Say whether overlap is:

- real overlap
- only spacing / separation

If it is real overlap, identify which elements cross the boundary.

### `Repeated patterns`

Name the repeated unit.

Examples:

- news row
- feature card
- pricing column
- chip row

### `Image role`

Pick one of:

- background image
- framed media
- side visual
- decorative layer

### `Typography tiers`

Identify likely roles:

- hero heading
- section heading
- card title
- body copy
- metadata
- helper text

## Minimum acceptable memo

```md
Main blocks
- hero
- feature grid
- footer CTA

Dominant relationship
- hero = layer
- feature grid = grid
- footer CTA = stack

Width owner
- hero = Container
- feature grid = Container
- footer CTA = Center

Overlap
- hero card overlaps background image

Repeated patterns
- feature card

Image role
- hero image = background image

Typography tiers
- hero heading
- body copy
- card title
- metadata
```
