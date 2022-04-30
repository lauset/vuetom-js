import en from './locale/en'

let Lang = 'en'
const Langs = {}
Langs[Lang] = en

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
  constructor(o) {
    this.$L = parseLocale(o.locale, null, true)
    this.version = '1.0.6'
    this.options = o
  }
  $locale() {
    return Langs[this.$L]
  }
}
const isVuetom = d => d instanceof Vuetom

const vuetom = function (v) {
  const options = typeof v === 'object' ? v : {}
  options.args = arguments// eslint-disable-line prefer-rest-params
  return new Vuetom(options)
}

vuetom.use = (plugin, option) => {
  if (!plugin.$i) {
    plugin(option, Vuetom, vuetom)
    plugin.$i = true
  }
  return vuetom
}

vuetom.isVuetom = isVuetom
vuetom.locale = parseLocale
vuetom.lang = Lang
vuetom.langs = Langs
vuetom.prototype = Vuetom.prototype

export default vuetom
