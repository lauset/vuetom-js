# Vuetom.js

Current Version: >= 0.5.x

* 💪 Immutable
* 🔥 Chainable

---

## Getting Started

### Installation

```console
npm install vuetom --save
```

### Using Vuetom.js & Plugins

#### Node.js

Available Plugins: arr

```js
const { createVuetom, isVuetom } = require('vuetom')
const vt = createVuetom()
```

use arr plugin

```js
const { createVuetom, isVuetom, arr } = require('vuetom')
const vt = createVuetom()
vt.use(arr)

const arr1 = []
vt.arr.addFirst(arr1, 'val1')
console.log(arr1)
```

#### ES6 syntax

Available Plugins: arr & storage

```js
import { createVuetom, arr } from 'vuetom'
```

#### Browser

Available Plugins: arr & storage

```html
<script src="../vuetom/dist/vuetom.js"></script>
<script>
  var vt = vuetom.createVuetom()
  var vt_storage = vuetom.storage

  vt.use(vt_storage)
  vt.storage.set('key1', 'val1')
  console.log(vt.storage.get('key1')) // val1
</script>
```

## Plugins

[Common]

* arr

[Node]

* arr: Array Utils

[Browser]

* arr: Array Utils
* storage: LocalStorage Utils

<br>

## Development

```
pnpm install
```

**packages/vuetom**

```sh
cd packages/vuetom

# build dist
pnpm b

# build modules
pnpm b:es

# build browser node
pnpm b:umd
```

**packages/test**

```sh
cd packages/test

# node test
pnpm test-n 

# es test
pnpm test-es

# web test
# preview.html
```

## License

Vuetom.js is licensed under a [MIT License](./LICENSE).
