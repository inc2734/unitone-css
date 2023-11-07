# Container

Keep the content area within a certain width, plus appropriate margins on the left and right.

## Usage

### HTML

```html
<div data-unitone-layout="container">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill
</div>
```

### JSX

```jsx
import { Container } from '@inc2734/unitone-css';

<Container>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill
</Container>
```

## Props

### Gutters

Gutters.

#### HTML

```html
<div data-unitone-layout="container -gutters:1">
  ...
</div>
```

#### JSX

```jsx
import { Container } from '@inc2734/unitone-css';

<Container gutters={1}>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill
</Container>
```

### Align

Alignment of the container.

start / center / end

#### HTML

```html
<div data-unitone-layout="container -align:start">
  ...
</div>
```

#### JSX

```jsx
import { Container } from '@inc2734/unitone-css';

<Container align="start">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill
</Container>
```

### Max width

Max width.

#### HTML

```html
<div data-unitone-layout="container" style="--unitone--max-width: 1280px">
  ...
</div>
```

#### JSX

```jsx
import { Container } from '@inc2734/unitone-css';

<Container maxWidth="1280px">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill
</Container>
```
