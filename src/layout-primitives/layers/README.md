## Usage

```html
<div data-unitone-layout="layers">
  <img src="https://placehold.jp/400x300.jpg" alt="" />
  <div data-unitone-layout="decorator" style="--unitone--align-self:end">
    Lorem ipsum dolor sit amet
  </div>
</div>
```

### Covered image

Background image/video is sized to maintain its aspect ratio while filling the element's entire content box. If the object's aspect ratio does not match the aspect ratio of its box, then the object will be clipped to fit.

```html
<div data-unitone-layout="layers -cover">
  <img ...>
  <div>
    ...
  </div>
</div>
```

### Filled image

The background image/video is enlarged according to the amount of content.

```html
<div data-unitone-layout="layers -fill">
  <img ...>
  <div>
    ...
  </div>
</div>
```

### Blur image

Blur the background image/video.

```html
<div data-unitone-layout="layers -blur">
  <img ...>
  <div>
    ...
  </div>
</div>
```

### Portrait grid

```html
<div data-unitone-layout="layers -portrait">
  <img ...>
  <div>
    ...
  </div>
</div>
```

### Customizing position

```html
<div data-unitone-layout="layers">
  <img ...>
  <div style="--unitone--alilgn-self: end; --unitone--justify-self: center">
    ...
  </div>
</div>
```
