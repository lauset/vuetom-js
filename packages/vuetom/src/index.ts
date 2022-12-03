// @ts-nocheck
import { version } from '../package.json'
import { vuetom } from '../types'

export * from './plugins'

class Vuetom {
  version: string
  options: any

  constructor (opts?: vuetom.VuetomOptions) {
    this.version = version
    this.options = opts
  }

  use<T = unknown>(plugin: vuetom.PluginFunc<T>, option?: any): vuetom.Vuetom {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!plugin.$i) {
      plugin(option, Vuetom)
      plugin.$i = true
    }
    return this
  }
}

const isVuetom = (d: Vuetom): boolean => d instanceof Vuetom

const vuetomInstance = function (options?: vuetom.VuetomOptions): vuetom.Vuetom {
  const opts = typeof options === 'object' ? options : null
  return new Vuetom(opts)
}

vuetomInstance.prototype = Vuetom.prototype

export { vuetomInstance as createVuetom, isVuetom }
