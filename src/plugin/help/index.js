export default (o, c) => {
  const proto = c.prototype
  proto.help = function () {
    console.log('>>> Vuetom')
    console.log(`>>> ${this.version}`)
    return {
      name: 'Vuetom',
      version: this.version
    }
  }
}

