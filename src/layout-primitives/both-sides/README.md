# Both Sides

Child elements are aligned at both ends. If the width of a child element becomes too large to maintain justification, it will be placed in a single column.

## Usage

### HTML

```html
<div data-unitone-layout="both-sides">
  <p>Lorem ipsum dolor sit amet</p>
  <ul>
    <li>Lorem</li>
    <li>ipsum</li>
    <li>dolor</li>
  </ul>
</div>
```

### JSX

```jsx
import { BothSides } from '@inc2734/unitone-css';

<BothSides>
  <p>Lorem ipsum dolor sit amet</p>
  <ul>
    <li>Lorem</li>
    <li>ipsum</li>
    <li>dolor</li>
  </ul>
</BothSides>
```

## Props

### Gap

Gap.

#### HTML

```html
<div data-unitone-layout="both-sides -gap:1">
  ...
</div>
```

#### JSX

```jsx
import { BothSides } from '@inc2734/unitone-css';

<BothSides gap={1}>
  ...
</BothSides>
```

### Align items

Alignment of the row direction.

#### HTML

```html
<ul data-unitone-layout="both-sides -align-items:center">
  ...
</ul>
```

#### JSX

```jsx
import { BothSides } from '@inc2734/unitone-css';

<BothSides alignItems="center">
  ...
</BothSides>
```

### Items max width

Set max-width of the item.

#### HTML

```html
<div data-unitone-layout="both-sides">
  <p style="--unitone--content-max-width: 400px">Lorem ipsum dolor sit amet</p>
  <ul>
    <li>Lorem</li>
    <li>ipsum</li>
    <li>dolor</li>
  </ul>
</div>
```

#### JSX

```jsx
import { BothSides } from '@inc2734/unitone-css';

<BothSides>
  <p style={{ '--unitone--content-max-width': '400px' }}>Lorem ipsum dolor sit amet</p>
  <ul>
    <li>Lorem</li>
    <li>ipsum</li>
    <li>dolor</li>
  </ul>
</BothSides>
```

### Items width

Set width of the item.

### HTML

```html
<div data-unitone-layout="both-sides">
  <p style="--unitone--content-width: 400px">Lorem ipsum dolor sit amet</p>
  <ul>
    <li>Lorem</li>
    <li>ipsum</li>
    <li>dolor</li>
  </ul>
</div>
```

#### JSX

```jsx
import { BothSides } from '@inc2734/unitone-css';

<BothSides>
  <p style={{ '--unitone--content-width': '400px' }}>Lorem ipsum dolor sit amet</p>
  <ul>
    <li>Lorem</li>
    <li>ipsum</li>
    <li>dolor</li>
  </ul>
</BothSides>
```
