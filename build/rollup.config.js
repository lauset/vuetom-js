const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const json = require('rollup-plugin-json')
const { terser } = require('rollup-plugin-terser')
const nodePolyfills = require('rollup-plugin-node-polyfills')
const replace = require('rollup-plugin-replace')
const pkg = require('../package.json')

module.exports = (config) => {
  const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * Build Date ${new Date().toLocaleString()} 
  * @license MIT
  */`
  const { input, fileName, name } = config
  return {
    input: {
      input,
      external: ['needle', 'vuetom'],
      plugins: [
        resolve(),
        nodePolyfills(),
        babel({
          exclude: 'node_modules/**',
          runtimeHelpers: true
        }),
        json(),
        commonjs(),
        replace({
          'process.env.NODE_DEBUG': false
        })
        // terser
      ]
    },
    output: {
      name: name || 'vuetom',
      file: fileName,
      format: 'umd',
      banner,
      globals: {
        needle: 'needle',
        vuetom: 'vuetom'
      }
    }
  }
}
