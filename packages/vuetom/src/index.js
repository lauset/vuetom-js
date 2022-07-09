import langs from './locale'
import {version } from '../package.json'

const Lang = 'en'
const Langs = langs

const parseLocale = (preset, object, isLocal) => {
  let l
  if (!preset) return Lang
  if (typeof preset === 'string') {
    const presetLower = preset.toLowerCase()
    if (Langs[presetLower]) {
      l = presetLower
    }
    if (object) {
      Langs[presetLower] = object
      l = presetLower
    }
    const presetSplit = preset.split('-')
    if (!l && presetSplit.length > 1) {
      return parseLocale(presetSplit[0])
    }
  } else {
    const { name } = preset
    Langs[name] = preset
    l = name
  }
  if (!isLocal && l) Lang = l
  return l || (!isLocal && Lang)
}

class Vuetom {
  constructor(cfg) {
    this.lang = parseLocale(cfg.locale, null, true)
    this.version = version
    this.options = cfg
  }
  $locale() {
    return Langs[this.lang]
  }
  use(plugin, option) {
    if (!plugin.$i) {
      plugin(option, Vuetom)
      plugin.$i = true
    }
    return this
  }
}
const isVuetom = d => d instanceof Vuetom

const vuetom = function (v) {
  const options = typeof v === 'object' ? v : {}
  options.args = arguments
  return new Vuetom(options)
}

vuetom.locale = parseLocale
vuetom.prototype = Vuetom.prototype

export {
  vuetom as createVuetom,
  isVuetom
}
