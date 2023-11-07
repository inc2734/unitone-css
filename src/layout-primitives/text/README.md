# Text

Designed to display legible text.

## Usage

### HTML

```html
<div data-unitone-layout="text">
  <p>Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
  <p>Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
</div>
```

### JSX

```jsx
import { Text } from '@inc2734/unitone-css';

<Text>
  <p>Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
  <p>Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
</Text>
```

## Props

### Apply gap

Automatically apply appropriate gap.

#### HTML

```html
<div data-unitone-layout="text -gap -gap:1">
  ...
</div>
```

#### JSX

```jsx
import { Text } from '@inc2734/unitone-css';

<Text applyGap gap={1}>
  ...
</Text>
```

### Gutters

Gutters.

#### HTML

```html
<div data-unitone-layout="text -gutters:1">
  ...
</div>
```

#### JSX

```jsx
import { Text } from '@inc2734/unitone-css';

<Text gutters={1}>
  ...
</Text>
```

### Max width

Sets the maximum width of the child element.

#### HTML

```html
<div data-unitone-layout="text" style="--unitone--max-width: 500px">
  ...
</div>
```

#### JSX

```jsx
import { Text } from '@inc2734/unitone-css';

<Text maxWidth="500px">
  ...
</Text>
```

### Centering children

Intrinsic centering of child elements.

#### HTML

```html
<div data-unitone-layout="text -center">
  ...
</div>
```

#### JSX

```jsx
import { Text } from '@inc2734/unitone-css';

<Text center>
  ...
</Text>
```

#### Columns

Correctly columnarize the child elements.

`--unitone--max-width` specifies the ideal width of the column.

#### HTML

```html
<div data-unitone-layout="text -columns" --unitone--max-width="300px">
  ...
</div>
```

#### JSX

```jsx
import { Text } from '@inc2734/unitone-css';

<Text columns maxWidth="300px">
  ...
</Text>
```
