# Tokyo lorem

## Documentation

[Docs](https://naif-sameer.github.io/tokyo-lorem/)

[Demo](https://naif-sameer.github.io/tokyo-lorem/demo/index.html)

🚀 simple and powerful web component

## quickly start

```html
<script src="https://cdn.jsdelivr.net/gh/naif-sameer/tokyo-lorem@master/dist/lorem-lib.umd.js"></script>

<!-- English lorem -->
<tokyo-lorem word="150" language="en" paragraph="1"></tokyo-lorem>

<!-- Arabic lorem -->
<tokyo-lorem word="150" language="ar" paragraph="1"></tokyo-lorem>
```

## Install js file

1. Using CDN

```html
<!-- normal build -->
<script src="https://cdn.jsdelivr.net/gh/naif-sameer/tokyo-lorem@master/dist/lorem-lib.umd.js"></script>
```

```html
<!-- es module build -->
<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/naif-sameer/tokyo-lorem@master/dist/lorem-lib.es.js"
></script>
```

2.Using dist folder

```html
<!-- normal build -->
<script src="dist/lorem-lib.umd.js"></script>
```

```html
<!-- es module build -->
<script type="module" src="dist/lorem-lib.es.js"></script>
```

## Use web component

```html
<tokyo-lorem word="150" language="en" paragraph="2"></tokyo-lorem>
```

## Attributes

| attribute | type   | option               |
| --------- | ------ | -------------------- |
| word      | number | 0 < `number` < 10000 |
| language  | string | _en_ , _ar_          |
| paragraph | number | 0 < `number` < 100   |
