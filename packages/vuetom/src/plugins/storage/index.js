import { Storage } from './sc'

export default (_options, _v) => {
  const proto = _v.prototype
  proto.storage = Storage
}

