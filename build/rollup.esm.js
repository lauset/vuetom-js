import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import path from 'path'

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
} 

const packagesDir = path.resolve(__dirname, '../packages')
const vuetomDir = path.resolve(packagesDir, 'vuetom')
const pkg = require(path.resolve(vuetomDir, `package.json`))

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * Build Date ${new Date().toLocaleString()} 
  * Build Env ${process.env.TARGET}
  */`

export default {
  input: `${vuetomDir}/src/index.js`,
  output: {
    name: 'vuetom',
    file: `${vuetomDir}/dist/vuetom.esm.js`,
    format: 'es',
    banner,
    globals: {
      needle: 'needle',
      vuetom: 'vuetom'
    }
  },
  external: ['needle', 'vuetom'],
  plugins: [
    json(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    }),
    resolve(),
    commonjs(),
    replace({
      'process.env.NODE_DEBUG': false,
      preventAssignment: true
    })
  ]
}
