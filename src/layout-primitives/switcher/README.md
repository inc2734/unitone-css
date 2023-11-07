# Switcher

The direction of content flow switches depending on the content. If the width of the switcher block is smaller than the "threshold", it becomes one column.

## Usage

### HTML

```html
<div data-unitone-layout="switcher">
  <div data-unitone-layout="decorator" style="--unitone--background-color: #decc00">Lorem ipsum</div>
  <div data-unitone-layout="decorator" style="--unitone--background-color: #bfb6a8">dolor sit</div>
  <div data-unitone-layout="decorator" style="--unitone--background-color: #edede6">amet consectetur</div>
</div>
```

### JSX

```jsx
import { Switcher, Decorator } from '@inc2734/unitone-css';

<Switcher>
  <Decorator backgroundColor="#decc00">Lorem ipsum</Decorator>
  <Decorator backgroundColor="#bfb6a8">dolor sit</Decorator>
  <Decorator backgroundColor="#edede6">amet consectetur</Decorator>
</Switcher>
```

## Props

### Gap

Gap.

#### HTML

```html
<div data-unitone-layout="switcher -gap:1">
  ...
</div>
```

#### JSX

```jsx
import { Switcher } from '@inc2734/unitone-css';

<Switcher gap={1}>
  ...
</Switcher>
```

### Threshold

If the box size is smaller than this value, it switches to one column.

#### HTML

```html
<div data-unitone-layout="switcher" style="--unitone--thureshold: 500px">
  ...
</div>
```

#### JSX

```jsx
import { Switcher } from '@inc2734/unitone-css';

<Switcher threshold="500px">
  ...
</Switcher>
```
