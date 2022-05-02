import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'

const env = process.env.NODE_ENV


export default {
  input: 'src/index.js',
  output: {
    name: 'vuetom',
    file: 'vuetom.esm.js',
    format: 'es',
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
