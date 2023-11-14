# Center

Center the box. Settings also allow for centering of child elements and centering of text.

## Usage

### HTML

```html
<div data-unitone-layout="center">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit
</div>
```

### JSX

```jsx
import { Center } from '@inc2734/unitone-css';

<Center>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit
</Center>
```

## Props

#### JSX

```jsx
import { Center } from '@inc2734/unitone-css';

<Center>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit
</Center>
```

### Centering with text

Text is also centered.

#### HTML

```html
<div data-unitone-layout="center -with-text">
  ...
</div>
```

#### JSX

```jsx
import { Center } from '@inc2734/unitone-css';

<Center withText>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit
</Center>
```

### Gutters

Gutters.

#### HTML

```html
<div data-unitone-layout="center -gutters:1">
  ...
</div>
```

#### JSX

```jsx
import { Center } from '@inc2734/unitone-css';

<Center gutters={1}>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit
</Center>
```

### Max width

Max width.

#### HTML

```html
<div data-unitone-layout="center" style="--unitone--max-width: 1280px">
  ...
</div>
```

#### JSX

```jsx
import { Center } from '@inc2734/unitone-css';

<Center maxWidth="1280px">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit
</Center>
```
