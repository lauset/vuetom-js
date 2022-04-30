import MockDate from 'mockdate'
import vt from '../src'
import help from '../plugin/help'

const testPlugin = (o, c, d) => {
  c.prototype.newApi = () => ('hello world')
  d.newFunc = () => ('hi world')
}
const testPluginWithConfig = (o, c) => {
  c.prototype.newApiWithConfig = () => (`hello world ${o || ''}`)
}

vt.use(testPlugin)
vt.use(testPluginWithConfig, 'good')

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Plugin use method and option', () => {
  expect(vt().newApi()).toBe('hello world')
  expect(vt().newApiWithConfig()).toBe('hello world good')
})

it('Plugin use vt', () => {
  expect(vt.newFunc()).toBe('hi world')
})

it('Plugin use core utils', () => {
  expect(vt().$locale).toBeInstanceOf(Function)
})

test('Test before invalid', () => {
  const v = vt()
  vt.use(help)
  expect(vt.lang).toEqual('en')
  expect(v.help()).toBeInstanceOf(Object)
  // expect(m.isBefore(invalid)).toBe(false, 'valid moment is not before invalid moment')
})
