## Usage

```html
<div data-unitone-layout="decorator" style="--unitone--background-color: #000; --unitone--color: #fff; --unitone--padding: 0">
  <div data-unitone-layout="cover">
    <p>Lorem ipsum</p>
    <div data-unitone-layout="cover__center">
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

### Bottom

```html
<div data-unitone-layout="decorator" style="--unitone--background-color: #000; --unitone--color: #fff; --unitone--padding: 0">
  <div data-unitone-layout="cover">
    <p>Lorem ipsum</p>
    <div data-unitone-layout="cover_bottom">
      <div data-unitone-layout="stack">
        <h1 style="--unitone--font-size: 6">Lorem ipsum dolor sit amet</h1>
        <p>
          consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </div>
    </div>
  </div>
</div>
```

### No padding

```html
<div data-unitone-layout="cover -no-padding">
  ...
</div>
```

### Customizing gap

```html
<div data-unitone-layout="cover -gap:1">
  ...
</div>
```

### Customizing position

After the `position`, specify the position with `-position:{position}`.

```html
<div data-unitone-layout="cover">
  <div data-unitone-layout="cover__content -position:sticky">
    ...
  </div>
  <div data-unitone-layout="cover__content">
    ...
  </div>
</div>
```
