export default (o, c) => {
  const proto = c.prototype
  proto.getDate = function () {
    return {
      years: this.$date.$y,
      months: this.$date.$M,
      date: this.$date.$D,
      hours: this.$date.$H,
      minutes: this.$date.$m,
      seconds: this.$date.$s,
      milliseconds: this.$date.$ms
    }
  }
}

