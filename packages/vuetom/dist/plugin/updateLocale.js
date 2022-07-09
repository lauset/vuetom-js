/*!
  * vuetom v0.3.0
  * Build Date 2022/7/9 21:32:55 
  * Build Env dev
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vt_plugin_updateLocale = factory());
})(this, (function () { 'use strict';

  var index = ((_option, _class, _v) => {
    _v.updateLocale = function (_locale, _cfg) {
      var localeList = _v.Langs;
      var localeConfig = localeList[_locale];
      if (!localeConfig) return;
      var customConfigKeys = _cfg ? Object.keys(_cfg) : [];
      customConfigKeys.forEach(c => {
        localeConfig[c] = _cfg[c];
      });
      return localeConfig;
    };
  });

  return index;

}));
