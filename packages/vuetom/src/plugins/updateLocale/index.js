export default (_option, _class, _v) => {
  _v.updateLocale = function (_locale, _cfg) {
    const localeList = _v.Langs
    const localeConfig = localeList[_locale]
    if (!localeConfig) return
    const customConfigKeys = _cfg ? Object.keys(_cfg) : []
    customConfigKeys.forEach((c) => {
      localeConfig[c] = _cfg[c]
    })
    return localeConfig
  }
}

