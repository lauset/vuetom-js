import { createVuetom, isVuetom, arr } from 'vuetom'

const vt = createVuetom()

console.log('isVuetom:', isVuetom(vt)) // true
console.log(' options:', vt.options) // print constructor options
console.log(' version:', vt.version) // x.x.x

// arr
console.log('-----arr-----')
console.log(arr)
vt.use(arr)
const arr1 = []
vt.arr.addFirst(arr1, 'val1')
console.log(arr1)
