/// <reference path="./locale/index.d.ts" />

export = vuetom;

declare function vuetom (lang?: vuetom.ConfigType): vuetom.Vuetom

declare namespace vuetom {
  interface ConfigTypeMap {
    default: string | number | Date | Vuetom | null | undefined
  }

  export type ConfigType = ConfigTypeMap[keyof ConfigTypeMap]

  export interface FormatObject { locale?: string, format?: string, utc?: boolean }

  export type OptionType = FormatObject | string | string[]

  export type UnitTypeShort = 'd' | 'D' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms'

  class Vuetom {
    constructor (config?: ConfigType)

    date(date: vuetom.ConfigType, format?: vuetom.OptionType): string
    
    locale(): string

    locale(preset: string | ILocale, object?: Partial<ILocale>): Vuetom
  }

  export type PluginFunc<T = unknown> = (option: T, c: typeof Vuetom, d: typeof vuetom) => void

  export function use <T = unknown>(plugin: PluginFunc<T>, option?: T): Vuetom

  export function locale(preset?: string | ILocale, object?: Partial<ILocale>, isLocal?: boolean): string

  export function isVuetom(d: any): d is Vuetom

  const Langs : { [key: string] :  ILocale }
}
