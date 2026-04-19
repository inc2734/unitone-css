# Token Approximation

Choose the nearest documented step first.
Do not start from guessed px values unless the docs provide a direct mapping.

## Font-size approximation

Use these defaults first.

| Visual role | First candidates | Approx. size |
| --- | --- | --- |
| Helper text / captions | `xs`, `s` | `12.8px`, `14.2px` |
| Metadata / dates | `xs`, `s` | `12.8px`, `14.2px` |
| Default body copy | `m` | `16px` |
| Dense UI labels | `s`, `m` | `14.2px`, `16px` |
| Card title | `l`, `xl` | `18.3px`, `21.3px` |
| Section heading | `2xl`, `3xl` | `25.6px`, `32px` |
| Hero heading | `4xl`, `5xl` | `42.7px`, `64px` |

Rules:

- prefer the smaller of two close candidates first
- `6xl` and above are exceptional
- use `-fluid-typography` mainly on large headings

## Spacing approximation

Use the existing scale first:

- `-3` to `7`
- `1s` to `7s`
- `2m` to `7m`

Rules:

- choose the smaller plausible step first
- large whitespace often comes from line-height plus gap, not gap alone
- use `s` and `m` variants when mobile reduction is desirable
- use gap for relationships between siblings
- use padding for surface internals

## Color approximation

Match in this order:

1. hue family
2. intensity tier
3. semantic suitability

Common intensity tiers:

- `pale`
- `bright`
- `light`
- base token
- `dark`
- `heavy`

Rules:

- do not assume semantic tokens are visually closest
- first match the visible family, then decide whether `background`, `text`, or another semantic token is a better fit

## Surface approximation

For card-like or panel-like surfaces:

- start with `Decorator`
- choose padding from the documented scale
- prefer documented background and color tokens
- only add shadow or border-radius when they are structurally visible

## Width and measure reminders

- use `Text` when readable measure is intended
- do not let `Text` accidentally constrain heroes or wide panels
- use `Container`, `Center`, `Cover`, or `Layers` for width ownership first
