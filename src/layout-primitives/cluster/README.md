# Cluster

Arranges child elements horizontally.

## Usage

### HTML

```html
<ul data-unitone-layout="cluster">
  <li>Lorem ipsum</li>
  <li>dolor sit</li>
  <li>amet consectetur</li>
  <li>adipisicing elit</li>
  <li>sed do</li>
</ul>
```

### JSX

```jsx
import { Cluster } from '@inc2734/unitone-css';

<Cluster tagName="ul">
  <li>Lorem ipsum</li>
  <li>dolor sit</li>
  <li>amet consectetur</li>
  <li>adipisicing elit</li>
  <li>sed do</li>
</Cluster>
```

## Props

### Align items

Alignment of the row direction.

#### HTML

```html
<ul data-unitone-layout="cluster -align-items:center">
  ...
</ul>
```

#### JSX

```jsx
import { Cluster } from '@inc2734/unitone-css';

<Cluster tagName="ul" alignItems="center">
  ...
</Cluster>
```

### Justify content

#### HTML

Alignment of the column direction.

```html
<ul data-unitone-layout="cluster -justify-content:space-between">
  ...
</ul>
```

#### JSX

```jsx
import { Cluster } from '@inc2734/unitone-css';

<Cluster tagName="ul" justifyContent="space-between">
  ...
</Cluster>
```

### Gap

Gap.

#### HTML

```html
<ul data-unitone-layout="cluster -gap:1">
  ...
</ul>
```

#### JSX

```jsx
import { Cluster } from '@inc2734/unitone-css';

<Cluster tagName="ul" gap={1}>
  ...
</Cluster>
```

### Divider

Using divider.

stripe / slash / bordered

#### HTML

```html
<div data-unitone-layout="cluster -divider:stripe">
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
import { Cluster } from '@inc2734/unitone-css';

<Cluster divider="stripe">
  <div>
    ...
  </div>
  <div>
    ...
  </div>
</Cluster>
```
