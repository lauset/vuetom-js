# Vuetom.js

* 💪 Immutable
* 🔥 Chainable

---

## Getting Started

### Installation

```console
npm install vuetom --save
```

### API

At present, the library needs to rely on plug-ins, such as the date plug-in

```javascript
vuetom().version
```

### Plugin

A plugin is an independent module. 

```javascript
import date from 'vuetom/plugin/date'

vuetom.use(date)

// The usage is the same as that of dayjs
vuetom().date(new Date(), 'YYYY-MM-DD HH:mm:ss')
```

## License

Vuetom.js is licensed under a [MIT License](./LICENSE).
