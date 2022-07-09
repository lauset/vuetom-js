/*!
  * vuetom v0.3.0
  * Build Date 2022/7/9 21:32:54 
  * Build Env dev
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vt_plugin_date = factory());
})(this, (function () { 'use strict';

  var SECONDS_A_MINUTE = 60;
  var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
  var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
  var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
  var MILLISECONDS_A_SECOND = 1e3;
  var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND;
  var MS = 'millisecond';
  var S = 'second';
  var MIN = 'minute';
  var H = 'hour';
  var D = 'day';
  var W = 'week';
  var M = 'month';
  var Q = 'quarter';
  var Y = 'year';
  var DATE = 'date';
  var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';
  var INVALID_DATE_STRING = 'Invalid Date';
  var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
  var REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

  var C = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SECONDS_A_MINUTE: SECONDS_A_MINUTE,
    SECONDS_A_HOUR: SECONDS_A_HOUR,
    SECONDS_A_DAY: SECONDS_A_DAY,
    SECONDS_A_WEEK: SECONDS_A_WEEK,
    MILLISECONDS_A_SECOND: MILLISECONDS_A_SECOND,
    MILLISECONDS_A_MINUTE: MILLISECONDS_A_MINUTE,
    MILLISECONDS_A_HOUR: MILLISECONDS_A_HOUR,
    MILLISECONDS_A_DAY: MILLISECONDS_A_DAY,
    MILLISECONDS_A_WEEK: MILLISECONDS_A_WEEK,
    MS: MS,
    S: S,
    MIN: MIN,
    H: H,
    D: D,
    W: W,
    M: M,
    Q: Q,
    Y: Y,
    DATE: DATE,
    FORMAT_DEFAULT: FORMAT_DEFAULT,
    INVALID_DATE_STRING: INVALID_DATE_STRING,
    REGEX_PARSE: REGEX_PARSE,
    REGEX_FORMAT: REGEX_FORMAT
  });

  var padStart = (string, length, pad) => {
    var s = String(string);
    if (!s || s.length >= length) return string;
    return "" + Array(length + 1 - s.length).join(pad) + string;
  };

  var padZoneStr = (instance, neg) => {
    var negMinutes = -neg;
    var minutes = Math.abs(negMinutes);
    var hourOffset = Math.floor(minutes / 60);
    var minuteOffset = minutes % 60;
    return "" + (negMinutes <= 0 ? '+' : '-') + padStart(hourOffset, 2, '0') + ":" + padStart(minuteOffset, 2, '0');
  };

  var monthDiff = (a, b) => {
    // function from moment.js in order to keep the same result
    if (a.date() < b.date()) return -monthDiff(b, a);
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
    var anchor = a.clone().add(wholeMonthDiff, M);
    var c = b - anchor < 0;
    var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), M);
    return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
  };

  var absFloor = n => n < 0 ? Math.ceil(n) || 0 : Math.floor(n);

  var prettyUnit = u => {
    var special = {
      M: M,
      y: Y,
      w: W,
      d: D,
      D: DATE,
      h: H,
      m: MIN,
      s: S,
      ms: MS,
      Q: Q
    };
    return special[u] || String(u || '').toLowerCase().replace(/s$/, '');
  };

  var isUndefined = s => s === undefined;

  var parseDate = cfg => {
    var {
      date,
      utc
    } = cfg;
    if (date === null) return new Date(NaN);
    if (isUndefined(date)) return new Date();
    if (date instanceof Date) return new Date(date);

    if (typeof date === 'string' && !/Z$/i.test(date)) {
      var d = date.match(REGEX_PARSE);

      if (d) {
        var m = d[2] - 1 || 0;
        var ms = (d[7] || '0').substring(0, 3);

        if (utc) {
          return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms));
        }

        return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
      }
    }

    return new Date(date);
  };

  var Utils = {
    s: padStart,
    z: padZoneStr,
    m: monthDiff,
    a: absFloor,
    p: prettyUnit,
    u: isUndefined,
    d: parseDate,
    C
  };

  var setupDateObject = ((o, c) => {
    var proto = c.prototype;

    proto.getDate = function () {
      return {
        years: this.$date.$y,
        months: this.$date.$M,
        date: this.$date.$D,
        hours: this.$date.$H,
        minutes: this.$date.$m,
        seconds: this.$date.$s,
        milliseconds: this.$date.$ms
      };
    };
  });

  var index = ((_option, _v) => {
    var {
      C
    } = Utils;
    var proto = _v.prototype;

    proto.date = function (_date, _fmt) {
      var $d = Utils.d(_date);
      var $y = $d.getFullYear();
      var $M = $d.getMonth();
      var $D = $d.getDate();
      var $W = $d.getDay();
      var $H = $d.getHours();
      var $m = $d.getMinutes();
      var $s = $d.getSeconds();
      var $ms = $d.getMilliseconds();
      this.$date = {
        $d,
        $y,
        $M,
        $D,
        $W,
        $H,
        $m,
        $s,
        $ms
      };
      var locale = this.$locale();

      var isValid = () => !($d.toString() === C.INVALID_DATE_STRING);

      var utcOffset = () => -Math.round($d.getTimezoneOffset() / 15) * 15;

      if (!isValid()) return locale.invalidDate || C.INVALID_DATE_STRING;
      var str = _fmt || C.FORMAT_DEFAULT;
      var zoneStr = Utils.z(this, utcOffset);
      var {
        weekdays,
        months,
        meridiem
      } = locale;

      var getShort = (arr, index, full, length) => arr && (arr[index] || arr(this, str)) || full[index].slice(0, length);

      var get$H = num => Utils.s($H % 12 || 12, num, '0');

      var meridiemFunc = meridiem || ((hour, minute, isLowercase) => {
        var m = hour < 12 ? 'AM' : 'PM';
        return isLowercase ? m.toLowerCase() : m;
      });

      var matches = {
        YY: String($y).slice(-2),
        YYYY: $y,
        M: $M + 1,
        MM: Utils.s($M + 1, 2, '0'),
        MMM: getShort(locale.monthsShort, $M, months, 3),
        MMMM: getShort(months, $M),
        D: $D,
        DD: Utils.s($D, 2, '0'),
        d: String($W),
        dd: getShort(locale.weekdaysMin, $W, weekdays, 2),
        ddd: getShort(locale.weekdaysShort, $W, weekdays, 3),
        dddd: weekdays[$W],
        H: String($H),
        HH: Utils.s($H, 2, '0'),
        h: get$H(1),
        hh: get$H(2),
        a: meridiemFunc($H, $m, true),
        A: meridiemFunc($H, $m, false),
        m: String($m),
        mm: Utils.s($m, 2, '0'),
        s: String($s),
        ss: Utils.s($s, 2, '0'),
        SSS: Utils.s($ms, 3, '0'),
        Z: zoneStr
      };
      return str.replace(C.REGEX_FORMAT, (match, $1) => $1 || matches[match] || zoneStr.replace(':', ''));
    };

    setupDateObject({}, _v);
  });

  return index;

}));
