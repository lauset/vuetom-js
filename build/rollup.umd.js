import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import fs from 'fs'
import path from 'path'
import util from 'util'
import { ncp } from 'ncp'
import { rollup } from 'rollup'

let terserEnabled = false

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
} else {
  if (process.env.TARGET === 'prod') {
    terserEnabled = true
  } else if (process.env.TARGET === 'dev') {
    terserEnabled = false
  }
}

const { promisify } = util
const packagesDir = path.resolve(__dirname, '../packages')
const vuetomDir = path.resolve(packagesDir, 'vuetom')
const localePath = path.join(vuetomDir, 'src/locale')
const pluginsPath = path.join(vuetomDir, 'src/plugins')
const pkg = require(path.resolve(vuetomDir, `package.json`))
const promisifyReadDir = promisify(fs.readdir)
const promisifyReadFile = promisify(fs.readFile)
const promisifyWriteFile = promisify(fs.writeFile)
const localeNameRegex = /\/\/ (.*) \[/
const formatName = n => n.replace(/\.js/, '').replace('-', '_')


async function build(option) {
  const bundle = await rollup(option)
  await bundle.write(option.output)
}

async function listLocaleJson(localeArr) {
  const localeListArr = []
  await Promise.all(
    localeArr.map(async l => {
      const localeData = await promisifyReadFile(
        path.join(localePath, l),
        'utf-8'
      )
      localeListArr.push({
        key: l.slice(0, -3),
        name: localeData.match(localeNameRegex)[1]
      })
    })
  )
  promisifyWriteFile(
    path.join(__dirname, '../locale.json'),
    JSON.stringify(localeListArr),
    'utf8'
  )
}

;(async () => {
  try {
    const locales = await promisifyReadDir(localePath)
    for (const l of locales) {
      console.log(require('chalk').cyan(`build locale: "${l}"`))
      await build(
        configFactory({
          input: `./src/locale/${l}`,
          name: `vt_locale_${formatName(l)}`,
          file: `dist/locale/${l}`
        })
      )
    }
    const plugins = await promisifyReadDir(pluginsPath)
    for (const p of plugins) {
      console.log(require('chalk').blue(`build plugin: "${p}"`))
      await build(
        configFactory({
          input: `./src/plugins/${p}/index.js`,
          name: `vt_plugin_${formatName(p)}`,
          file: `dist/plugin/${p}${terserEnabled ? '.min.' : '.'}js`
        })
      )
    }
    await promisify(ncp)('./types/', './dist/types/')
    await promisify(ncp)('./types/plugin/', './dist/plugin/')
    // await listLocaleJson(locales)
  } catch (e) {
    console.error(e)
  }
})()

const configFactory = config => {
  const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * Build Date ${new Date().toLocaleString()} 
  * Build Env ${process.env.TARGET}
  * @license MIT
  */`
  const { input, name, file } = config
  return {
    input,
    output: {
      name,
      file,
      format: 'umd',
      banner,
      globals: {
        '@babel/runtime/helpers/extends': '_extends',
        '@babel/runtime/helpers/objectWithoutPropertiesLoose': '_objectWithoutPropertiesLoose',
        '@babel/runtime/helpers/asyncToGenerator': '_asyncToGenerator',
        needle: 'needle',
        vuetom: 'vuetom'
      }
    },
    external: ['needle', 'vuetom'],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'runtime'
      }),
      json(),
      resolve(),
      commonjs(),
      replace({
        'process.env.NODE_DEBUG': false,
        preventAssignment: true
      }),
      terserEnabled ? terser() : null
    ]
  }
}

export default configFactory({
  input: './src/index.js',
  name: 'vuetom',
  file: `dist/vuetom${terserEnabled ? '.min.' : '.'}js`
})
