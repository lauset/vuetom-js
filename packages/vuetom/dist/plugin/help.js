/*!
  * vuetom v0.3.0
  * Build Date 2022/7/9 21:32:54 
  * Build Env dev
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vt_plugin_help = factory());
})(this, (function () { 'use strict';

  var index = ((o, c) => {
    var proto = c.prototype;

    proto.help = function () {
      console.log('>>> Vuetom');
      console.log(">>> " + this.version);
      return {
        name: 'Vuetom',
        version: this.version
      };
    };
  });

  return index;

}));
