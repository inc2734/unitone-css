# Vertical writing

Make the text vertically written.

## Usage

### HTML

```html
<div>
  <div data-unitone-layout="vertical-writing">
    <p>Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
    <p>Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
  </div>
</div>
```

### JSX

```jsx
import { VerticalWriting } from '@inc2734/unitone-css';

<div>
  <VerticalWriting>
    <p>Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
    <p>Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
  </VerticalWriting>
<div>
```

## Props

### Rows height

Height of each rows.

#### HTML

```html
<div>
  <div data-unitone-layout="vertical-writing" style="--unitone--max-height: 20rem">
    ...
  </div>
</div>
```

#### JSX

```jsx
import { VerticalWriting } from '@inc2734/unitone-css';

<div>
  <VerticalWriting maxHeight="20rem">
    ...
  </VerticalWriting>
<div>
```

### Gap

Gap.

#### HTML

```html
<div>
  <div data-unitone-layout="vertical-writing gap:1">
    ...
  </div>
</div>
```

#### JSX

```jsx
import { VerticalWriting } from '@inc2734/unitone-css';

<div>
  <VerticalWriting gap={1}>
    ...
  </VerticalWriting>
<div>
```

### Text orientation

#### HTML

```html
<div>
  <div data-unitone-layout="vertical-writing -text-orientation:mixed">
    ...
  </div>
</div>
```

#### JSX

```jsx
import { VerticalWriting } from '@inc2734/unitone-css';

<div>
  <VerticalWriting textOrientation="mixed">
    ...
  </VerticalWriting>
<div>
```

### Switch

Switch writing mode when portrait.

#### HTML

```html
<div>
  <div data-unitone-layout="vertical-writing -switch">
    ...
  </div>
</div>
```

#### JSX

```jsx
import { VerticalWriting } from '@inc2734/unitone-css';

<div>
  <VerticalWriting switch>
    ...
  </VerticalWriting>
<div>
```
