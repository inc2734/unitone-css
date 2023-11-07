# With sidebar

Assemble the component with sidebars. If the configured width can no longer be maintained, a single column display will be used.

## Usage

### HTML

```html
<div data-unitone-layout="with-sidebar">
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
import { WithSidebar } from '@inc2734/unitone-css';

<WithSidebar>
  <p>Lorem ipsum dolor sit amet</p>
  <ul>
    <li>Lorem</li>
    <li>ipsum</li>
    <li>dolor</li>
  </ul>
</WithSidebar>
```

## Props

### Sidebar

Sets sidebar position. Default is `right`.

left / right

#### HTML

```html
<div data-unitone-layout="with-sidebar -sidebar:left">
  ...
</div>
```

#### JSX

```jsx
import { WithSidebar } from '@inc2734/unitone-css';

<WithSidebar sidebar="left">
  ...
</WithSidebar>
```

### Revert

The way child elements are displayed is reversed.

#### HTML

```html
<div data-unitone-layout="with-sidebar -revert">
  ...
</div>
```

#### JSX

```jsx
import { WithSidebar } from '@inc2734/unitone-css';

<WithSidebar revert>
  ...
</WithSidebar>
```

### Content min width

Min width of the content.

#### HTML

```html
<div data-unitone-layout="with-sidebar" style="--unitone--content-min-width: 500px">
  ...
</div>
```

#### JSX

```jsx
import { WithSidebar } from '@inc2734/unitone-css';

<WithSidebar contentMinWidth="500px">
  ...
</WithSidebar>
```

### Sidebar width

Sidebar width.

#### HTML

```html
<div data-unitone-layout="with-sidebar" style="--unitone--sidebar-width: 300px">
  ...
</div>
```

#### JSX

```jsx
import { WithSidebar } from '@inc2734/unitone-css';

<WithSidebar sidebarWidth="300px">
  ...
</WithSidebar>
```

### Gap

Gap.

#### HTML

```html
<ul data-unitone-layout="with-slider -gap:1">
  ...
</ul>
```

#### JSX

```jsx
import { WithSidebar } from '@inc2734/unitone-css';

<WithSidebar gap={1}>
  ...
</WithSidebar>
```

### Align items

Alignment of the row direction.

#### HTML

```html
<ul data-unitone-layout="with-slider -align-items:center">
  ...
</ul>
```

#### JSX

```jsx
import { WithSidebar } from '@inc2734/unitone-css';

<WithSidebar alignItems="center">
  ...
</WithSidebar>
```
