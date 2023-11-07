# Reel

Displays child elements in a simple horizontal scroll.

## Usage

### HTML

```html
<div data-unitone-layout="reel">
  <img src="https://placehold.jp/400x300.jpg" alt="" />
  <img src="https://placehold.jp/400x300.jpg" alt="" />
  <img src="https://placehold.jp/400x300.jpg" alt="" />
</div>
```

### JSX

```jsx
import { Reel } from '@inc2734/unitone-css';

<Reel>
  <img src="https://placehold.jp/400x300.jpg" alt="" />
  <img src="https://placehold.jp/400x300.jpg" alt="" />
  <img src="https://placehold.jp/400x300.jpg" alt="" />
</Reel>
```

## Props

### No bar

Hide bar.

#### HTML

```html
<div data-unitone-layout="reel -no-bar">
  ...
</div>
```

#### JSX

```jsx
import { Reel } from '@inc2734/unitone-css';

<Reel noBar>
  ...
</Reel>
```

### Gap

Gap.

#### HTML

```html
<div data-unitone-layout="reel -gap:1">
  ...
</div>
```

#### JSX

```jsx
import { Reel } from '@inc2734/unitone-css';

<Reel gap={1}>
  ...
</Reel>
```

### Height

Height.

#### HTML

```html
<div data-unitone-layout="reel" style="--unitone--height: 250px">
  ...
</div>
```

#### JSX

```jsx
import { Reel } from '@inc2734/unitone-css';

<Reel height="250px">
  ...
</Reel>
```

### Items width

#### HTML

```html
<div data-unitone-layout="reel" style="--unitone--item-width: 250px">
  ...
</div>
```

#### JSX

```jsx
import { Reel } from '@inc2734/unitone-css';

<Reel itemWidth="250px">
  ...
</Reel>
```
