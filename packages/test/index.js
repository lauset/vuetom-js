
// since v0.2.0 we need use require().default
const { createVuetom, isVuetom } = require('vuetom')

// without plugin
console.log(createVuetom)

const vt = createVuetom({ log: true })

console.log(isVuetom(vt)) // true
console.log(vt.options) // print constructor options
console.log(vt.version) // x.x.x
console.log(vt.lang) // en
console.log(vt.$locale())


// help plugin
const help = require('vuetom/plugin/help')

vt.use(help)
console.log(vt.help()) // Console output help information


// date plugin
const date = require('vuetom/plugin/date')

vt.use(date)
console.log(vt.date(new Date(), 'YYYY-MM-DD HH:mm:ss')) // 2022-xx-xx xx:xx:xx
console.log(vt.$date)
console.log(vt.getDate()) // get date object


// http plugin
const request = require('vuetom/plugin/request')

vt.use(request)
console.log(vt.http)

vt.http('https://api.github.com/users/yyx990803', {
  method: 'get'
}, (err, resp, body) => {
  console.log('err', err)
  console.log('body', body)
})

