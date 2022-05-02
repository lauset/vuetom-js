import { http } from './n'

export default (_options, _v) => {
  const proto = _v.prototype
  proto.http = http
}

