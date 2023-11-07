# Stack

Arranges child elements vertically at regular intervals.

## Usage

### HTML

```html
<div data-unitone-layout="stack">
  <p>Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
  <p>Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
</div>
```

### JSX

```jsx
import { Stack } from '@inc2734/unitone-css';

<Stack>
  <p>Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
  <p>Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
</Stack>
```

## Props

### Gap

Gap.

#### HTML

```html
<div data-unitone-layout="stack -gap:1">
  ...
</div>
```

#### JSX

```jsx
import { Stack } from '@inc2734/unitone-css';

<Stack gap={1}>
  ...
</Stack>
```

### Negative gap

Add a netative value gap.

#### HTML

```html
<div data-unitone-layout="stack -gap:1 -negative">
  ...
</div>
```

#### JSX

```jsx
import { Stack } from '@inc2734/unitone-css';

<Stack gap={1} negative>
  ...
</Stack>
```

### Using divider

stripe / underline / bordered

#### HTML

```html
<div data-unitone-layout="stack -divider:stripe">
  <div>
    ...
  </div>
  <div>
    ...
  </div>
</div>
```

#### JSX

```jsx
import { Stack } from '@inc2734/unitone-css';

<Stack gap={1} divider="stripe">
  ...
</Stack>
```
