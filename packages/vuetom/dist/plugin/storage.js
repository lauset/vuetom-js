/*!
  * vuetom v0.3.0
  * Build Date 2022/7/9 21:32:55 
  * Build Env dev
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vt_plugin_storage = factory());
})(this, (function () { 'use strict';

  // 默认缓存期限为7天
  var DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;
  /**
   * 创建本地缓存对象
   * @param {string=} prefixKey -
   * @param {Object} [storage=localStorage] - sessionStorage | localStorage
   */

  var createStorage = function createStorage(_temp) {
    var {
      prefixKey = '',
      storage = localStorage
    } = _temp === void 0 ? {} : _temp;

    /**
     * 本地缓存类
     * @class Storage
     */
    var Storage = class {
      constructor() {
        this.storage = storage;
        this.prefixKey = prefixKey;
      }

      getKey(key) {
        return ("" + this.prefixKey + key).toUpperCase();
      }
      /**
       * @description 设置缓存
       * @param {string} key 缓存键
       * @param {*} value 缓存值
       * @param expire
       */


      set(key, value, expire) {
        if (expire === void 0) {
          expire = DEFAULT_CACHE_TIME;
        }

        var stringData = JSON.stringify({
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


      get(key, def) {
        if (def === void 0) {
          def = null;
        }

        var item = this.storage.getItem(this.getKey(key));

        if (item) {
          try {
            var data = JSON.parse(item);
            var {
              value,
              expire
            } = data; // 在有效期内直接返回

            if (expire === null || expire >= Date.now()) {
              return value;
            }

            this.remove(this.getKey(key));
          } catch (e) {
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


      setCookie(name, value, expire) {
        if (expire === void 0) {
          expire = DEFAULT_CACHE_TIME;
        }

        document.cookie = this.getKey(name) + "=" + value + "; Max-Age=" + expire;
      }
      /**
       * 根据名字获取cookie值
       * @param name
       */


      getCookie(name) {
        var cookieArr = document.cookie.split('; ');

        for (var i = 0, length = cookieArr.length; i < length; i++) {
          var kv = cookieArr[i].split('=');

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
        var keys = document.cookie.match(/[^ =;]+(?==)/g);

        if (keys) {
          for (var i = keys.length; i--;) {
            document.cookie = keys[i] + "=0;expire=" + new Date(0).toUTCString();
          }
        }
      }

    };
    return new Storage();
  };
  var Storage = createStorage();

  var index = ((_options, _v) => {
    var proto = _v.prototype;
    proto.storage = Storage;
  });

  return index;

}));
