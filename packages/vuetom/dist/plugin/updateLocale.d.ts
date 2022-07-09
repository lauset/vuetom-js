import { PluginFunc } from 'vuetom'

declare const plugin: PluginFunc
export = plugin

declare module 'vuetom' {
  export function updateLocale(localeName: string, customConfig: Record<string, unknown>): Record<string, unknown>
}
