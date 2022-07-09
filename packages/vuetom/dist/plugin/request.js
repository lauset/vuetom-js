/*!
  * vuetom v0.3.0
  * Build Date 2022/7/9 21:32:54 
  * Build Env dev
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('needle')) :
  typeof define === 'function' && define.amd ? define(['needle'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vt_plugin_request = factory(global.needle));
})(this, (function (needle) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var needle__default = /*#__PURE__*/_interopDefaultLegacy(needle);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };
    return _extends.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var _excluded = ["headers", "format", "timeout"];
  var httpOptions = {
    debug: false,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
    }
  };

  var log = (_tag, _d) => {
  }; // var proxyUrl = "http://" + user + ":" + password + "@" + host + ":" + port;
  /**
   * http 请求
   * @param {*} url 地址
   * @param {*} options 选项
   * @param {*} callback 回调
   */

  var http = (url, options, callback) => {
    try {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (options.method == null) options.method = 'get';
      log('http', url);
      log('options', options);
      return fetchData(url, options.method, options, (err, resp, body) => {
        log('http response', body);
        if (err) log('http Error', JOSN.stringify(err));
        callback(err, resp, body);
      });
    } catch (error) {
      console.log(23, error);
    }
  };
  //   deflateRaw(data, (err, buf) => {
  //     if (err) return reject(err)
  //     resolve(buf)
  //   })
  // })
  // const regx = /(?:\d\w)+/g

  var fetchData = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (url, method, _ref, callback) {
      var {
        headers = {},
        format = 'json',
        timeout = 15000
      } = _ref,
          options = _objectWithoutPropertiesLoose(_ref, _excluded);

      headers = Object.assign({}, headers); // if (headers[bHh]) {
      return request(url, _extends({}, options, {
        method,
        headers: Object.assign({}, httpOptions.headers, headers),
        timeout,
        agent: undefined,
        json: format === 'json'
      }), (err, resp, body) => {
        if (err) return callback(err, null);
        callback(null, resp, body);
      });
    });

    return function fetchData(_x, _x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var request = (url, options, callback) => {
    var data;

    if (options.body) {
      data = options.body;
    } else if (options.form) {
      data = options.form; // data.content_type = 'application/x-www-form-urlencoded'

      options.json = false;
    } else if (options.formData) {
      data = options.formData; // data.content_type = 'multipart/form-data'

      options.json = false;
    }

    options.response_timeout = options.timeout;
    return needle__default["default"].request(options.method || 'get', url, data, options, (err, resp, body) => {
      if (!err) {
        body = resp.body = resp.raw.toString();

        try {
          resp.body = JSON.parse(resp.body);
        } catch (_) {
        }

        body = resp.body;
      }

      callback(err, resp, body);
    }).request;
  };

  var index = ((_options, _v) => {
    var proto = _v.prototype;
    proto.http = http;
  });

  return index;

}));
