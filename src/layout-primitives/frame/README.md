# Frame

## Usage

### HTML

```html
<div data-unitone-layout="frame">
  <img src="https://placehold.jp/400x300.jpg" alt="" />
</div>
```

### JSX

```jsx
import { Frame } from '@inc2734/unitone-css';

<Frame>
  <img src="https://placehold.jp/400x300.jpg" alt="" />
</Frame>
```

## Props

### Ratio

Aspect ratio.

#### HTML

```html
<div data-unitone-layout="frame" style="--unitone--aspect-ratio: 16/9">
  <img src="https://placehold.jp/400x300.jpg" alt="" />
</div>
```

#### JSX

```jsx
import { Frame } from '@inc2734/unitone-css';

<Frame aspectRatio="16/9">
  <img src="https://placehold.jp/400x300.jpg" alt="" />
</Frame>
```

### Switch

Switch aspect ratio when portrait.

#### HTML

```html
<div data-unitone-layout="frame -switch">
  <img src="https://placehold.jp/400x300.jpg" alt="" />
</div>
```

#### JSX

```jsx
import { Frame } from '@inc2734/unitone-css';

<Frame switch>
  <img src="https://placehold.jp/400x300.jpg" alt="" />
</Frame>
```
