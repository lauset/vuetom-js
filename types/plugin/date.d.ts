import { PluginFunc } from 'vuetom'

declare const plugin: PluginFunc
export = plugin

declare module 'vuetom' {
  interface Vuetom {
    date(): String
  }
}
