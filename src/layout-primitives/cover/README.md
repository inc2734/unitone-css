# Cover

This component is designed to cover a large area of the screen.

## Usage

### HTML

```html
<div data-unitone-layout="decorator" style="--unitone--background-color: #000; --unitone--color: #fff; --unitone--padding: 0">
  <div data-unitone-layout="cover">
    <p>Lorem ipsum</p>

    <div data-unitone-layout="cover__content -valign:center">
      <div data-unitone-layout="stack">
        <h1 style="--unitone--font-size: 6">Lorem ipsum dolor sit amet</h1>
        <p>
          consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </div>
    </div>

    <p>sed do</p>
  </div>
</div>
```

### JSX

```jsx
import { Decorator, Cover, CoverContent, Stack } from '@inc2734/unitone-css';

<Decorator backgroundColor="#000" color="#fff" padding={0}>
  <Cover>
    <p>Lorem ipsum</p>

    <CoverContent valign="center">
      <Stack>
        <h1 style={{ '--unitone--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
        <p>
          consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </Stack>
    </CoverContent>

    <p>sed do</p>
  </Cover>
</Decorator>
```

## Props

### Gap

Gap.

Since this is also reflected in the padding, specify 0 for padding if padding is not required.

#### HTML

```html
<div data-unitone-layout="cover -gap:1">
  ...
</div>
```

#### JSX

```jsx
import { Cover } from '@inc2734/unitone-css';

<Cover gap={1}>
  ...
</Cover>
```

### Padding

Padding.

#### HTML

```html
<div data-unitone-layout="cover -padding:1">
  ...
</div>
```

#### JSX

```jsx
import { Cover } from '@inc2734/unitone-css';

<Cover padding={1}>
  ...
</Cover>
```

### Min height

Min height.

#### HTML

```html
<div data-unitone-layout="cover" style="--unitone--min-height: 80vh">
  ...
</div>
```

#### JSX

```jsx
import { Cover } from '@inc2734/unitone-css';

<Cover minHeight="80vh">
  ...
</Cover>
```

### Item position

You can specify the position of a child element.

#### HTML

```html
<div data-unitone-layout="cover">
  <div data-unitone-layout="cover__content -position:fixed" style="--unitone--top: 0; --unitone--right: 0; --unitone--bottom: 0; --unitone--left: 0; --uitone--z-index: 1">
    ...
  </div>

  <div data-unitone-layout="cover__content">
    ...
  </div>
</div>
```

#### JSX

```jsx
import { Cover, CoverContent } from '@inc2734/unitone-css';

<Cover gap={1}>
  <CoverContent position="fixed" top="0" right="0" bottom="0" left="0" zIndex="1">
    ...
  </CoverContent>

  <CoverContent>
    ...
  </CoverContent>
</Cover>
```

### Item valign

You can specify the vertical position of a child element.

#### HTML

```html
<div data-unitone-layout="decorator" style="--unitone--background-color: #000; --unitone--color: #fff; --unitone--padding: 0">
  <div data-unitone-layout="cover">
    <div data-unitone-layout="cover__content valign:top">
      Lorem ipsum
    </div>

    <div data-unitone-layout="cover__content valign:bottom">
      Lorem ipsum
    </div>
  </div>
</div>
```

#### JSX

```jsx
import { Decorator, Cover, CoverContent } from '@inc2734/unitone-css';

<Decorator backgroundColor="#000" color="#fff" padding={0}>
  <Cover>
    <CoverContent valign="top">
      Lorem ipsum
    </CoverContent>

    <CoverContent valign="bottom">
      Lorem ipsum
    </CoverContent>

    <p>sed do</p>
  </Cover>
</Decorator>
```
