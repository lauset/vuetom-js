import { vuetom } from 'types'
import { Storage } from './sc'

const storage = (_options: any, _vuetom: vuetom.Vuetom): void => {
  const proto = _vuetom.prototype
  proto.storage = Storage
}

export { storage }
