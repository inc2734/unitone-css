# Float

## Usage

### HTML

```html
<div data-unitone-layout="float">
  <img src="https://placehold.jp/400x300.jpg" alt="" />
</div>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
```

### JSX

```jsx
import { Float } from '@inc2734/unitone-css';

<Float>
  <img src="https://placehold.jp/400x300.jpg" alt="" />
</Float>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
```

## Props

### Position

Change floating position.

`right` / `left`

#### HTML

```html
<div data-unitone-layout="float -position:right">
  ...
</div>
```

#### JSX

```jsx
import { Float } from '@inc2734/unitone-css';

<Float position="right">
  ...
</Float>
```

### Gap

Gap.

#### HTML

```html
<div data-unitone-layout="float -gap:1">
  ...
</div>
```

#### JSX

```jsx
import { Float } from '@inc2734/unitone-css';

<Float gap={1}>
  ...
</Float>
```

### Min width

Min width of the floating item.

#### HTML

```html
<div data-unitone-layout="float" style="--unitone--min-width: 500px">
  ...
</div>
```

#### JSX

```jsx
import { Float } from '@inc2734/unitone-css';

<Float minWidth="500px">
  ...
</Float>
```

### Min measure.

Min width of the item following the floating item.

#### HTML

```html
<div data-unitone-layout="float" style="--unitone--min-measure: 500px">
  ...
</div>
```

#### JSX

```jsx
import { Float } from '@inc2734/unitone-css';

<Float minMeasure="500px">
  ...
</Float>
```
