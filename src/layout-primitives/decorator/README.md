# Decorator

Decorative blocks. Color, padding, position, etc. can be set.

## Usage

### HTML

```html
<div data-unitone-layout="decorator">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill
</div>
```

### JSX

```jsx
import { Decorator } from '@inc2734/unitone-css';

<Decorator>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill
</Decorator>
```

## Props

### Background color

Background color.

#### HTML

```html
<div data-unitone-layout="decorator" style="--unitone--background-color: red">
  ...
</div>
```

#### JSX

```jsx
import { Decorator } from '@inc2734/unitone-css';

<Decorator backgroundColor="red">
  ...
</Decorator>
```

### Color

Color.

#### HTML

```html
<div data-unitone-layout="decorator" style="--unitone--color: red">
  ...
</div>
```

#### JSX

```jsx
import { Decorator } from '@inc2734/unitone-css';

<Decorator color="red">
  ...
</Decorator>
```

### Border

Border.

#### HTML

```html
<div data-unitone-layout="decorator" style="--unitone--border-width: 1px; --unitone--border-color: #000; --unitone--border-radius: 4px">
  ...
</div>
```

#### JSX

```jsx
import { Decorator } from '@inc2734/unitone-css';

<Decorator borderWidth="1px" borderColor="#000" borderRadius="4px">
  ...
</Decorator>
```

### Padding

Padding.

#### HTML

```html
<div data-unitone-layout="decorator -padding:1">
  ...
</div>
```

#### JSX

```jsx
import { Decorator } from '@inc2734/unitone-css';

<Decorator padding={1}>
  ...
</Decorator>
```

### Position

Position.

#### HTML

```html
<div data-unitone-layout="decorator -position:relative" style="--unitone--top: 0; --unitone--right: 0; --unitone--bottom: 0; --unitone--left: 0; --unitone--z-index: 1">
  ...
</div>
```

#### JSX

```jsx
import { Decorator } from '@inc2734/unitone-css';

<Decorator position="relative" top="0" right="0" bottom="0" left="0" zIndex="1">
  ...
</Decorator>
```

### Overflow

Overflow.

#### HTML

```html
<div data-unitone-layout="decorator -overflow:hidden">
  ...
</div>
```

#### JSX

```jsx
import { Decorator } from '@inc2734/unitone-css';

<Decorator overflow="hidden">
  ...
</Decorator>
```

### With shadow

Add a box shadow.

#### HTML

```html
<div data-unitone-layout="decorator -shadow">
  ...
</div>
```

#### JSX

```jsx
import { Decorator } from '@inc2734/unitone-css';

<Decorator shadow>
  ...
</Decorator>
```
