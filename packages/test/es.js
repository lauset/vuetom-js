
import { createVuetom, isVuetom } from 'vuetom'
import help from 'vuetom/plugin/help'
import date from 'vuetom/plugin/date'


const vt = createVuetom()

console.log(isVuetom(vt)) // true
console.log(vt.options) // print constructor options
console.log(vt.version) // x.x.x
console.log(vt.lang) // en
console.log(vt.$locale())


// help plugin

vt.use(help)
console.log(vt.help()) // Console output help information


// date plugin

vt.use(date)
console.log(vt.date(new Date(), 'YYYY-MM-DD HH:mm:ss')) // 2022-xx-xx xx:xx:xx
console.log(vt.$date)
console.log(vt.getDate()) // get date object
