import { PluginFunc } from 'vuetom'

declare const plugin: PluginFunc
export = plugin

interface VtDateObject {
  years: number
  months: number
  date: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

declare module 'vuetom' {
  interface Vuetom {
    date(): String
    getDate(): VtDateObject
  }
}
