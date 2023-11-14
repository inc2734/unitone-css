# Frame

Fits the image into a certain angle of view.

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
<div data-unitone-layout="frame" style="--unitone--ratio: 16/9">
  <img src="https://placehold.jp/400x300.jpg" alt="" />
</div>
```

#### JSX

```jsx
import { Frame } from '@inc2734/unitone-css';

<Frame ratio="16/9">
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

<Frame switchRatio>
  <img src="https://placehold.jp/400x300.jpg" alt="" />
</Frame>
```
