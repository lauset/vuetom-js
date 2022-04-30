import Utils from './utils'

export default (_option, _v) => {
  const { C } = Utils
  const proto = _v.prototype
  proto.date = function (_date, _fmt) {
    const $d = Utils.d(_date)
    const $y = $d.getFullYear()
    const $M = $d.getMonth()
    const $D = $d.getDate()
    const $W = $d.getDay()
    const $H = $d.getHours()
    const $m = $d.getMinutes()
    const $s = $d.getSeconds()
    const $ms = $d.getMilliseconds()
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
    }
    const locale = this.$locale()
    const isValid = () => !($d.toString() === C.INVALID_DATE_STRING)
    const utcOffset = () => -Math.round($d.getTimezoneOffset() / 15) * 15
    if (!isValid()) return locale.invalidDate || C.INVALID_DATE_STRING
    const str = _fmt || C.FORMAT_DEFAULT
    const zoneStr = Utils.z(this, utcOffset)
    const {
      weekdays, months, meridiem
    } = locale
    const getShort = (arr, index, full, length) => (
      (arr && (arr[index] || arr(this, str))) || full[index].slice(0, length)
    )
    const get$H = num => (
      Utils.s($H % 12 || 12, num, '0')
    )
    const meridiemFunc = meridiem || ((hour, minute, isLowercase) => {
      const m = (hour < 12 ? 'AM' : 'PM')
      return isLowercase ? m.toLowerCase() : m
    })
    const matches = {
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
    }
    return str.replace(C.REGEX_FORMAT, (match, $1) => $1 || matches[match] || zoneStr.replace(':', ''))
  }
}

