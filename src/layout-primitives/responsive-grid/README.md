# Responsive grid

Generates a simple grid.

## Usage

### HTML

```html
<div data-unitone-layout="responsive-grid">
  <img src="https://placehold.jp/400x300.jpg" alt="" />
  <img src="https://placehold.jp/400x300.jpg" alt="" />
  <img src="https://placehold.jp/400x300.jpg" alt="" />
</div>
```

### JSX

```jsx
import { ResponsiveGrid } from '@inc2734/unitone-css';

<ResponsiveGrid>
  <img src="https://placehold.jp/400x300.jpg" alt="" />
  <img src="https://placehold.jp/400x300.jpg" alt="" />
  <img src="https://placehold.jp/400x300.jpg" alt="" />
</ResponsiveGrid>
```

## Props

### Gap

Gap.

#### HTML

```html
<div data-unitone-layout="responsive-grid -gap:1">
  ...
</div>
```

#### JSX

```jsx
import { ResponsiveGrid } from '@inc2734/unitone-css';

<ResponsiveGrid gap={1}>
  ...
</ResponsiveGrid>
```

### Auto repeat

auto-fill / auto-fit for grid items.

#### HTML

```html
<div data-unitone-layout="responsive-grid -auto-repeat:auto-fit">
  ...
</div>
```

#### JSX

```jsx
import { ResponsiveGrid } from '@inc2734/unitone-css';

<ResponsiveGrid autoRepeat="auto-fit">
  ...
</ResponsiveGrid>
```

### Columns min width.

Min width of each columns.

#### HTML

```html
<div data-unitone-layout="responsive-grid" style="--unitone--column-min-width: 240px">
  ...
</div>
```

#### JSX

```jsx
import { ResponsiveGrid } from '@inc2734/unitone-css';

<ResponsiveGrid minWidth="240px">
  ...
</ResponsiveGrid>
```

### Divider

Using divider.

stripe / underline / bordered

#### HTML

```html
<div data-unitone-layout="responsive-grid -divider:stripe">
  <div>
    ...
  </div>
  <div>
    ...
  </div>
</div>
```

#### JSX

```jsx
import { ResponsiveGrid } from '@inc2734/unitone-css';

<ResponsiveGrid divider="stripe">
  <div>
    ...
  </div>
  <div>
    ...
  </div>
</ResponsiveGrid>
```

