/*!
  * vuetom v0.3.0
  * Build Date 2022/7/9 21:32:54 
  * Build Env dev
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vuetom = {}));
})(this, (function (exports) { 'use strict';

  function _readOnlyError(name) {
    throw new TypeError("\"" + name + "\" is read-only");
  }

  // English (Australia) [en-au]
  var locale$2 = {
    name: 'en-au',
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    weekStart: 1,
    weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    ordinal: n => n,
    formats: {
      LT: 'h:mm A',
      LTS: 'h:mm:ss A',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY h:mm A',
      LLLL: 'dddd, D MMMM YYYY h:mm A'
    },
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    }
  };

  // English [en]
  // We don't need weekdaysShort, weekdaysMin, monthsShort in en.js locale
  var en = {
    name: 'en',
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_')
  };

  // Chinese [zh]
  var locale$1 = {
    name: 'zh',
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    ordinal: (number, period) => {
      switch (period) {
        case 'W':
          return number + "\u5468";

        default:
          return number + "\u65E5";
      }
    },
    weekStart: 1,
    yearStart: 4,
    formats: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY/MM/DD',
      LL: 'YYYY年M月D日',
      LLL: 'YYYY年M月D日Ah点mm分',
      LLLL: 'YYYY年M月D日ddddAh点mm分',
      l: 'YYYY/M/D',
      ll: 'YYYY年M月D日',
      lll: 'YYYY年M月D日 HH:mm',
      llll: 'YYYY年M月D日dddd HH:mm'
    },
    relativeTime: {
      future: '%s后',
      past: '%s前',
      s: '几秒',
      m: '1 分钟',
      mm: '%d 分钟',
      h: '1 小时',
      hh: '%d 小时',
      d: '1 天',
      dd: '%d 天',
      M: '1 个月',
      MM: '%d 个月',
      y: '1 年',
      yy: '%d 年'
    },
    meridiem: (hour, minute) => {
      var hm = hour * 100 + minute;

      if (hm < 600) {
        return '凌晨';
      } else if (hm < 900) {
        return '早上';
      } else if (hm < 1100) {
        return '上午';
      } else if (hm < 1300) {
        return '中午';
      } else if (hm < 1800) {
        return '下午';
      }

      return '晚上';
    }
  };

  // Chinese (China) [zh-cn]
  var locale = {
    name: 'zh-cn',
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    ordinal: (number, period) => {
      switch (period) {
        case 'W':
          return number + "\u5468";

        default:
          return number + "\u65E5";
      }
    },
    weekStart: 1,
    yearStart: 4,
    formats: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY/MM/DD',
      LL: 'YYYY年M月D日',
      LLL: 'YYYY年M月D日Ah点mm分',
      LLLL: 'YYYY年M月D日ddddAh点mm分',
      l: 'YYYY/M/D',
      ll: 'YYYY年M月D日',
      lll: 'YYYY年M月D日 HH:mm',
      llll: 'YYYY年M月D日dddd HH:mm'
    },
    relativeTime: {
      future: '%s内',
      past: '%s前',
      s: '几秒',
      m: '1 分钟',
      mm: '%d 分钟',
      h: '1 小时',
      hh: '%d 小时',
      d: '1 天',
      dd: '%d 天',
      M: '1 个月',
      MM: '%d 个月',
      y: '1 年',
      yy: '%d 年'
    },
    meridiem: (hour, minute) => {
      var hm = hour * 100 + minute;

      if (hm < 600) {
        return '凌晨';
      } else if (hm < 900) {
        return '早上';
      } else if (hm < 1100) {
        return '上午';
      } else if (hm < 1300) {
        return '中午';
      } else if (hm < 1800) {
        return '下午';
      }

      return '晚上';
    }
  };

  var Langs$1 = {
    'en-au': locale$2,
    'en': en,
    'zh': locale$1,
    'zh-cn': locale
  };

  var version = "0.3.0";

  var Lang = 'en';
  var Langs = Langs$1;

  var parseLocale = (preset, object, isLocal) => {
    var l;
    if (!preset) return Lang;

    if (typeof preset === 'string') {
      var presetLower = preset.toLowerCase();

      if (Langs[presetLower]) {
        l = presetLower;
      }

      if (object) {
        Langs[presetLower] = object;
        l = presetLower;
      }

      var presetSplit = preset.split('-');

      if (!l && presetSplit.length > 1) {
        return parseLocale(presetSplit[0]);
      }
    } else {
      var {
        name
      } = preset;
      Langs[name] = preset;
      l = name;
    }

    if (!isLocal && l) _readOnlyError("Lang");
    return l || !isLocal && Lang;
  };

  class Vuetom {
    constructor(cfg) {
      this.lang = parseLocale(cfg.locale, null, true);
      this.version = version;
      this.options = cfg;
    }

    $locale() {
      return Langs[this.lang];
    }

    use(plugin, option) {
      if (!plugin.$i) {
        plugin(option, Vuetom);
        plugin.$i = true;
      }

      return this;
    }

  }

  var isVuetom = d => d instanceof Vuetom;

  var vuetom = function vuetom(v) {
    var options = typeof v === 'object' ? v : {};
    options.args = arguments;
    return new Vuetom(options);
  };

  vuetom.locale = parseLocale;
  vuetom.prototype = Vuetom.prototype;

  exports.createVuetom = vuetom;
  exports.isVuetom = isVuetom;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
