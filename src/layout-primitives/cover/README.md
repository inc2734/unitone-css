```html
<div data-layout="box" style="--background-color: #000, --color: #fff, --padding: 0">
  <div data-layout="cover">
    <p>Lorem ipsum</p>
    <div data-layout="cover__center">
      <div data-layout="stack">
        <h1 style="--font-size': 6">Lorem ipsum dolor sit amet</h1>
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

## Bottom
```html
<div data-layout="box" style="--background-color: #000, --color: #fff, --padding: 0">
  <div data-layout="cover">
    <p>Lorem ipsum</p>
    <div data-layout="cover_bottom">
      <div data-layout="stack">
        <h1 style="--font-size': 6">Lorem ipsum dolor sit amet</h1>
        <p>
          consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </div>
    </div>
  </div>
</div>
```

## Customizing gap
```html
<div data-layout="cover -gap:1">
  ...
</div>
```

## No padding
```html
<div data-layout="cover -no-padding">
  ...
</div>
```
