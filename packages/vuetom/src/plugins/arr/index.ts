import { vuetom } from 'types'
import { Arr } from './arr'

const arr = (_options: any, _vuetom: vuetom.Vuetom): void => {
  const proto = _vuetom.prototype
  proto.arr = Arr
}

export { arr }
