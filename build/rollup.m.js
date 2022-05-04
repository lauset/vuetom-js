import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'
import pkg from '../package.json'

const env = process.env.NODE_ENV

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * Build Date ${new Date().toLocaleString()} 
  * Build Env ${env}
  * @license MIT
  */`

export default {
  input: 'src/index.js',
  output: {
    name: 'vuetom',
    file: 'vuetom.esm.js',
    format: 'es',
    banner,
    globals: {
      needle: 'needle',
      vuetom: 'vuetom'
    }
  },
  external: ['needle', 'vuetom'],
  plugins: [
    nodePolyfills(),
    json(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    resolve(),
    commonjs(),
    replace({
      'process.env.NODE_DEBUG': false
    })
    // terser()
  ]
}
