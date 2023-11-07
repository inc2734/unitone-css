# Layers

Elements on top of each other. Layers have a 12 x 7 (7 x 12 in portrait mode) grid, along which child layers can be shifted.

## Usage

### HTML

```html
<div data-unitone-layout="layers">
  <img src="https://placehold.jp/400x300.jpg" alt="" />

  <div data-unitone-layout="decorator" style="--unitone--align-self:end">
    Lorem ipsum dolor sit amet
  </div>
</div>
```

### JSX

```jsx
import { Layers, Decorator } from '@inc2734/unitone-css';

<Layers>
  <img src="https://placehold.jp/400x300.jpg" alt="" />

  <Decorator style={{ '--unitone--align-self': 'end' }}>
    Lorem ipsum dolor sit amet
  </Decorator>
</Layers>
```

## Props

### Gap

Gap.

#### HTML

```html
<div data-unitone-layout="layers -gap:1">
  ...
</div>
```

#### JSX

```jsx
import { Layers } from '@inc2734/unitone-css';

<Layers gap={1}>
  ...
</Layers>
```

### Min height

Min height.

#### HTML

```html
<div data-unitone-layout="layers" style="--unitone--min-height: 500px">
  ...
</div>
```

#### JSX

```jsx
import { Layers } from '@inc2734/unitone-css';

<Layers minHeight="500px">
  ...
</Layers>
```

### Columns

Number of columns.

#### HTML

```html
<div data-unitone-layout="layers" style="--unitone--columns: 20">
  ...
</div>
```

#### JSX

```jsx
import { Layers } from '@inc2734/unitone-css';

<Layers columns="20">
  ...
</Layers>
```

### Rows

Number of rows.

#### HTML

```html
<div data-unitone-layout="layers" style="--unitone--rows: 20">
  ...
</div>
```

#### JSX

```jsx
import { Layers } from '@inc2734/unitone-css';

<Layers rows="20">
  ...
</Layers>
```

### Covered image

Background image/video is sized to maintain its aspect ratio while filling the element's entire content box. If the object's aspect ratio does not match the aspect ratio of its box, then the object will be clipped to fit.

#### HTML

```html
<div data-unitone-layout="layers -cover">
  <img ...>

  <div>
    ...
  </div>
</div>
```

#### JSX

```jsx
import { Layers } from '@inc2734/unitone-css';

<Layers cover>
  <img ... />

  <div>
    ...
  </div>
</Layers>
```

### Filled image

The background image/video is enlarged according to the amount of content.

#### HTML

```html
<div data-unitone-layout="layers -fill">
  <img ...>

  <div>
    ...
  </div>
</div>
```

#### JSX

```jsx
import { Layers } from '@inc2734/unitone-css';

<Layers fill>
  <img ... />

  <div>
    ...
  </div>
</Layers>
```

### Blur image

Blur the background image/video.

#### HTML

```html
<div data-unitone-layout="layers -blur" style="--unitone--blur: 100px">
  <img ...>

  <div>
    ...
  </div>
</div>
```

#### JSX

```jsx
import { Layers } from '@inc2734/unitone-css';

<Layers blur style={{ '--unitone--blur': '100px' }}>
  <img ... />

  <div>
    ...
  </div>
</Layers>
```

### Portrait grid

In portrait mode, swaps the height and width of the grid.

#### HTML

```html
<div data-unitone-layout="layers -portrait">
  ...
</div>
```

#### JSX

```jsx
import { Layers } from '@inc2734/unitone-css';

<Layers portrait>
  ...
</Layers>
```

### Mix blend mode

You can specify how the elements should look when stacked.

#### HTML

```html
<div data-unitone-layout="layers -portrait">
  <img ... />

  <div style="--unitone--mix-blend-mode: overlay">
    ...
  </div>
</div>
```

#### JSX

```jsx
import { Layers } from '@inc2734/unitone-css';

<Layers portrait>
  <img ... />

  <div style={{ '--unitone--mix-blend-mode': 'overlay' }}>
    ...
  </div>
</Layers>
```

### Items position

You can set the position of child elements with the associated properties of the CSS grid.

#### HTML

```html
<div data-unitone-layout="layers">
  <img ...>

  <div style="--unitone--alilgn-self: end; --unitone--justify-self: center">
    ...
  </div>
</div>

<div data-unitone-layout="layers">
  <img ...>

  <div style="--unitone--grid-column: 1/-1; --unitone--grid-row: 1/-1">
    ...
  </div>
</div>
```

```jsx
import { Layers } from '@inc2734/unitone-css';

<Layers>
  <img ... />

  <div style={{ '--unitone--alilgn-self': 'end', '--unitone--justify-self': 'center' }}>
    ...
  </div>
</Layers>

<Layers>
  <img ... />

  <div style={{ '--unitone--grid-column': '1/-1', '--unitone--grid-row': '1/-1' }}>
    ...
  </div>
</Layers>
```
