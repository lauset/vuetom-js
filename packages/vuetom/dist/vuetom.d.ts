/**
 * Plugin Func Arr
 */
export declare const arr: vuetom.PluginFunc<VuetomArr>;

export declare function createVuetom (optin?: any): vuetom.Vuetom

export declare function isVuetom (vuetom: any): vuetom is vuetom.Vuetom

/**
 * Plugin Func Storage
 */
export declare const storage: vuetom.PluginFunc<VuetomStorage>;

export declare namespace vuetom {
    export interface ConfigTypeMap {
        default: string | number | Date | Vuetom | null | undefined
    }

    export type ConfigType = ConfigTypeMap[keyof ConfigTypeMap]

    export interface VuetomOptions {
        local: string
    }

    export interface FormatObject {
        locale?: string
        format?: string
        utc?: boolean
    }

    export type OptionType = FormatObject | string | string[]

    export type UnitTypeShort = 'd' | 'D' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms'

    export class Vuetom {
        constructor (opts?: ConfigType)

        prototype?: any

        options: any

        version: string

        arr: VuetomArr

        storage: VuetomStorage

        // date? (date: vuetom.ConfigType, format?: vuetom.OptionType): string

        // locale(preset: string | ILocale, object?: Partial<ILocale>): Vuetom

        use<T = unknown>(plugin: PluginFunc<T>, option?: any): Vuetom
    }

    export type PluginFunc<T = unknown> = (
    option: T,
    vuetom: typeof Vuetom
    ) => {
        $i: boolean
    }

    // export function locale(preset?: string | ILocale, object?: Partial<ILocale>, isLocal?: boolean): string

    // const Langs : { [key: string] :  ILocale }
}

export declare interface VuetomArr {
    addFirst: (arr: any[], val: any) => any[]

    removeFirst: (arr: any[]) => any[]
}

export declare interface VuetomStorage {
    getKey: (key: string) => string

    set: (key: string, value: any, expire?: number) => void

    get: (key: string, def = null) => any

    remove: (key: string) => void

    clear: () => void

    setCookie: (name: string, value: string | number, expire: number) => any

    getCookie: (name: string) => string

    removeCookie: (key: string) => void

    clearCookie: () => void
}

export { }
