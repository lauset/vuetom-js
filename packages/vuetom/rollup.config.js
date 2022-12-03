import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { readFileSync } from 'fs'
const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8')
)

// 是否压缩
let terserEnabled = false
// 打包类型
let formatType = 'umd'
// 编译环境
let buildEnv = 'dev'

if (!process.env.FORMAT) {
  throw new Error('--environment ==> FORMAT ?')
} else {
  formatType = process.env.FORMAT
}

if (!process.env.VT_ENV) {
  throw new Error('cross-env ==> VT_ENV ?')
} else if (process.env.VT_ENV === 'dev') {
  buildEnv = 'dev'
  terserEnabled = false
} else if (process.env.VT_ENV === 'prod') {
  buildEnv = 'prod'
  terserEnabled = true
}

const configFactory = (config) => {
  const banner = `/*!
  * ${pkg.name} v${pkg.version} ${pkg.description}
  * Build Date ${new Date().toLocaleString()}
  * Build Env ${buildEnv}
  * @license MIT
  */`
  const { input, name, file, format } = config
  return {
    input,
    output: {
      name,
      file,
      format,
      banner,
      globals: {
        vuetom: 'vuetom'
      }
    },
    external: ['vuetom'],
    plugins: [
      json(),
      resolve(),
      commonjs(),
      replace({
        'process.env.NODE_DEBUG': false,
        preventAssignment: true
      }),
      typescript(),
      terserEnabled ? terser() : null
    ]
  }
}

const getFileName = () => {
  let name = ''
  if (formatType === 'es') {
    name = 'vuetom.esm.js'
  } else if (formatType === 'umd') {
    name = `vuetom${terserEnabled ? '.min.' : '.'}js`
  } else if (formatType === 'cjs') {
    name = 'vuetom.cjs'
  }
  return `dist/${name}`
}

export default configFactory({
  input: 'src/index.ts',
  name: 'vuetom',
  file: getFileName(),
  format: formatType
})
