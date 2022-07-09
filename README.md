# Vuetom.js

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

Available Plugins: request, date

```js
const { createVuetom, isVuetom } = require('vuetom')
const vt = createVuetom()
```

use date plugin
```js
const date = require('vuetom/plugin/date')
vt.use(date)
console.log(vt.date(new Date(), 'YYYY-MM-DD HH:mm:ss')) // 2022-xx-xx xx:xx:xx
console.log(vt.getDate()) // get date object
```

use http request plugin

Function has:
  
  - http
  - httpGet
  - httpPost
  - httpJsonp
  - httpFetch

```js
const request = require('vuetom/plugin/request')
vt.use(request)
vt.http('https://api.github.com/users/yyx990803', {
  method: 'get'
}, (err, resp, body) => {
  console.log('err', err)
  console.log('body', body)
})
```

#### ES6 syntax

Available Plugins: date

```js
import { createVuetom } from 'vuetom'
import date from 'vuetom/plugin/date'
// The usage is the same as nodejs
// ...
```

#### Browser

Available Plugins: date

```html
<script src="../vuetom/dist/vuetom.js"></script>
<script src="../vuetom/dist/plugin/date.js"></script>
<script src="../vuetom/dist/plugin/storage.js"></script>
<script>
  var vt = vuetom.createVuetom()
  var vt_date = window.vt_plugin_date
  var vt_storage = window.vt_plugin_storage

  vt.use(vt_date)
  console.log(vt.date(new Date, 'YY MM DD'))

  vt.use(vt_storage)
  vt.storage.set('key1', 'val1')
  console.log(vt.storage.get('key1')) // val1
</script>
```

## Plugins

[Common]
- date: Simple date time conversion

[Node]
- request: HTTP request based on nodejs

[Browser]
- storage: LocalStorage Utils

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
pnpm b:esm

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
