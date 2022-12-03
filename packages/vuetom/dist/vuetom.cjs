/*!
  * vuetom v0.5.0 A JS library with little function
  * Build Date 2022/12/3 12:55:53
  * Build Env dev
  * @license MIT
  */
'use strict';

var version = "0.5.0";

// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;
let ls;
try {
    ls = window.localStorage;
}
catch (err) {
    // console.warn("localStorage Can't use")
    ls = null;
}
/**
 * 创建本地缓存对象
 * @param {string=} prefixKey -
 * @param {Object} [storage=localStorage] - sessionStorage | localStorage
 */
const createStorage = ({ prefixKey = '', storage = ls } = {}) => {
    /**
     * 本地缓存类
     * @class Storage
     */
    const Storage = class {
        storage;
        prefixKey;
        constructor() {
            this.storage = storage;
            this.prefixKey = prefixKey;
        }
        getKey(key) {
            return `${this.prefixKey}${key}`.toUpperCase();
        }
        /**
         * @description 设置缓存
         * @param {string} key 缓存键
         * @param {*} value 缓存值
         * @param expire
         */
        set(key, value, expire = DEFAULT_CACHE_TIME) {
            const stringData = JSON.stringify({
                value,
                expire: expire !== null ? new Date().getTime() + expire * 1000 : null
            });
            this.storage.setItem(this.getKey(key), stringData);
        }
        /**
         * 读取缓存
         * @param {string} key 缓存键
         * @param {*=} def 默认值
         */
        get(key, def = null) {
            const item = this.storage.getItem(this.getKey(key));
            if (item != null) {
                try {
                    const data = JSON.parse(item);
                    const { value, expire } = data;
                    // 在有效期内直接返回
                    if (expire === null || expire >= Date.now()) {
                        return value;
                    }
                    this.remove(this.getKey(key));
                }
                catch (e) {
                    return def;
                }
            }
            return def;
        }
        /**
         * 从缓存删除某项
         * @param {string} key
         */
        remove(key) {
            this.storage.removeItem(this.getKey(key));
        }
        /**
         * 清空所有缓存
         * @memberOf Cache
         */
        clear() {
            this.storage.clear();
        }
        /**
         * 设置cookie
         * @param {string} name cookie 名称
         * @param {*} value cookie 值
         * @param {number=} expire 过期时间
         * 如果过期时间为设置，默认关闭浏览器自动删除
         * @example
         */
        setCookie(name, value, expire = DEFAULT_CACHE_TIME) {
            document.cookie = `${this.getKey(name)}=${value}; Max-Age=${expire}`;
        }
        /**
         * 根据名字获取cookie值
         * @param name
         */
        getCookie(name) {
            const cookieArr = document.cookie.split('; ');
            for (let i = 0, length = cookieArr.length; i < length; i++) {
                const kv = cookieArr[i].split('=');
                if (kv[0] === this.getKey(name)) {
                    return kv[1];
                }
            }
            return '';
        }
        /**
         * 根据名字删除指定的cookie
         * @param {string} key
         */
        removeCookie(key) {
            this.setCookie(key, 1, -1);
        }
        /**
         * 清空cookie，使所有cookie失效
         */
        clearCookie() {
            const keys = document.cookie.match(/[^ =;]+(?==)/g);
            if (keys != null) {
                for (let i = keys.length; i-- !== 0;) {
                    document.cookie = `${keys[i]}=0;expire=${new Date(0).toUTCString()}`;
                }
            }
        }
    };
    return new Storage();
};
const Storage = createStorage();

const storage = (_options, _vuetom) => {
    const proto = _vuetom.prototype;
    proto.storage = Storage;
};

/**
 * 向数组第一个位置添加元素
 * @param arr 数组
 * @param val 新增元素
 * @returns 数组
 */
const addFirst = (arr, val) => {
    arr.unshift(val);
    return arr;
};
/**
 * 删除数组第一个位置的元素
 * @param arr 数组
 * @returns 新数组
 */
const removeFirst = (arr) => {
    if (arr?.length > 0) {
        arr.shift();
    }
    return arr;
};
const Arr = {
    addFirst,
    removeFirst
};

const arr = (_options, _vuetom) => {
    const proto = _vuetom.prototype;
    proto.arr = Arr;
};

// @ts-nocheck
class Vuetom {
    version;
    options;
    constructor(opts) {
        this.version = version;
        this.options = opts;
    }
    use(plugin, option) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!plugin.$i) {
            plugin(option, Vuetom);
            plugin.$i = true;
        }
        return this;
    }
}
const isVuetom = (d) => d instanceof Vuetom;
const vuetomInstance = function (options) {
    const opts = typeof options === 'object' ? options : null;
    return new Vuetom(opts);
};
vuetomInstance.prototype = Vuetom.prototype;

exports.arr = arr;
exports.createVuetom = vuetomInstance;
exports.isVuetom = isVuetom;
exports.storage = storage;
