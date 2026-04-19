# Primitive Selection

Use this table before inventing wrappers or layout CSS.

## Core mapping

| Visual pattern | Default primitive | Compare with | Notes |
| --- | --- | --- | --- |
| Vertical section flow | `Stack` | `Text` | `Text` only when prose rhythm matters |
| Centered width-constrained block | `Center` | `Container` | `Center` for centered content, `Container` for page-width ownership |
| Full-height hero | `Cover` | `Layers` | Compare `Layers` if background and foreground truly overlap |
| Left/right pair with equal visual weight | `BothSides` | `WithSidebar` | Use `BothSides` when both sides are peers |
| Left/right pair with secondary side | `WithSidebar` | `BothSides` | Use when one side acts like meta, media, or sidebar |
| Repeated equal cards | `ResponsiveGrid` | `Switcher`, `Masonry` | Start with `ResponsiveGrid` |
| Repeated uneven cards | `Masonry` | `ResponsiveGrid` | Use when height variance matters |
| Auto switch from row to column | `Switcher` | `ResponsiveGrid` | Use when child count is small and split is primary |
| Wrapping buttons or chips | `Cluster` | `Reel` | `Reel` only when horizontal scroll is intended |
| Horizontal scroller | `Reel` | `Marquee` | `Marquee` only when motion is intended |
| Card shell / background / border / padding | `Decorator` | utility classes | Prefer `Decorator` for surfaces |
| Media with aspect ratio | `Frame` | `Layers` | Use `Layers` only if overlap matters |
| Real overlap across boundaries | `Layers` | `Float` | `Float` is for smaller floating pieces |
| Small floating note or badge | `Float` | `Layers` | Use `Float` when the whole layout is not layered |
| Readable long-form text | `Text` | `Stack` | `Text` is width-aware |
| Section outer spacing | `Gutters` | `Decorator` | `Decorator` when the section also needs visual styling |

## Important decisions

### `BothSides` vs `WithSidebar`

Prefer `BothSides` when:

- both sides feel equally important
- title and action are peers
- label and value have similar visual weight

Prefer `WithSidebar` when:

- one side is clearly secondary
- metadata sits beside main content
- media sits beside primary copy
- one side should collapse away more naturally

### `Cover` vs `Layers`

Prefer `Cover` when:

- the structure is vertically distributed
- the image is only a backdrop or separate sibling
- overlap is not the main story

Prefer `Layers` when:

- foreground content truly sits on top of media
- a card crosses an image or section edge
- explicit overlap alignment matters

### `ResponsiveGrid` vs `Switcher`

Prefer `ResponsiveGrid` when:

- there are many repeated cards
- column repetition is the main pattern

Prefer `Switcher` when:

- there are only a few large items
- the main idea is split-to-stack behavior

## Width ownership reminders

- `Text` is not a neutral wrapper
- `Container`, `Center`, `Cover`, and `Layers` often own width before inner text wrappers do
- use `Text` for prose rhythm, not by default for heroes or wide cards
