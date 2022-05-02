# Vuetom.js

* 💪 Immutable
* 🔥 Chainable

---

## Getting Started

### Installation

current version: v0.2.1

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
import date from 'vuetom/esm/plugin/date'
// The usage is the same as nodejs
// ...
```

#### Browser

Available Plugins: date

```html
<script src="./vuetom/vuetom.umd.js"></script>
<script src="./vuetom/plugin/date.js"></script>
<script>
  var vt = vuetom.createVuetom()
  var date_plugin = window.vt_plugin_date
  vt.use(date_plugin)
  console.log(vt.date(new Date, 'YY MM DD'))
</script>
```

### Plugin

- date: Simple date time conversion

- request: HTTP request based on nodejs

## License

Vuetom.js is licensed under a [MIT License](./LICENSE).
