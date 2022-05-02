import needle from 'needle'

const msg = {
  fail: '请求异常',
  unachievable: '接口无法访问',
  timeout: '请求超时',
  notConnectNetwork: '无法连接到服务器',
  cancelRequest: '取消请求'
}

const httpOptions = {
  debug: false,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
  }
}

const process = {
  env: {
    NODE_DEBUG: false
  }
}

const log = (_tag, _d) => {
  // eslint-disable-next-line no-unused-expressions
  httpOptions.debug && (
    console.log(`\n---------->>> ${_tag}`) ||
    console.log(_d)
  )
}

// var proxyUrl = "http://" + user + ":" + password + "@" + host + ":" + port;
// var proxiedRequest = request.defaults({'proxy': proxyUrl});

export const setHttpOptions = (options) => {
  console.log('set options', options)
  const { debug } = options
  httpOptions.debug = debug
}

/**
 * 请求超时自动重试
 * @param {*} url
 * @param {*} options
 */
export const httpFetch = (url, options = { method: 'get' }) => {
  const requestObj = httpPromise(url, options)
  requestObj.promise = requestObj.promise.catch((err) => {
    // console.log('出错', err)
    if (err.message === 'socket hang up') {
      // window.globalObj.apiSource = 'temp'
      return Promise.reject(new Error(msg.unachievable))
    }
    switch (err.code) {
      case 'ETIMEDOUT':
      case 'ESOCKETTIMEDOUT':
        return Promise.reject(new Error(msg.timeout))
      case 'ENOTFOUND':
        return Promise.reject(new Error(msg.notConnectNetwork))
      default:
        return Promise.reject(err)
    }
  })
  return requestObj
}

/**
 * 取消请求
 * @param {*} index
 */
export const cancelHttp = (requestObj) => {
  // console.log(requestObj)
  if (!requestObj) return
  // console.log('cancel:', requestObj)
  if (!requestObj.abort) return
  requestObj.abort()
}

/**
 * http 请求
 * @param {*} url 地址
 * @param {*} options 选项
 * @param {*} callback 回调
 */
export const http = (url, options, callback) => {
  try {
    if (typeof options === 'function') {
      callback = options
      options = {}
    }
    if (options.method == null) options.method = 'get'
    log('http', url)
    log('options', options)
    return fetchData(url, options.method, options, (err, resp, body) => {
      log('http response', body)
      if (err) log('http Error', JOSN.stringify(err))
      callback(err, resp, body)
    })
  } catch (error) {
    console.log(23, error)
  }
}

/**
 * http get 请求
 * @param {*} url 地址
 * @param {*} options 选项
 * @param {*} callback 回调
 */
export const httpGet = (url, options, callback) => {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }
  log('httpGet', url)
  log('options', options)
  return fetchData(url, 'get', options, (err, resp, body) => {
    log('httpGet response', body)
    if (err) log('httpGet Error', JOSN.stringify(err))
    callback(err, resp, body)
  })
}

/**
 * http post 请求
 * @param {*} url 地址
 * @param {*} data 数据
 * @param {*} options 选项
 * @param {*} callback 回调
 */
export const httpPost = (url, data, options, callback) => {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }
  options.data = data
  log('httpPost', url)
  log('options', options)
  return fetchData(url, 'post', options, (err, resp, body) => {
    log('httpPost response', body)
    if (err) log('httpPost Error', JOSN.stringify(err))
    callback(err, resp, body)
  })
}

/**
 * http jsonp 请求
 * @param {*} url 请求地址
 * @param {*} options 选项 options.jsonpCallback 回调
 * @param {*} callback 回调
 */
export const httpJsonp = (url, options, callback) => {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }
  const jsonpCallback = 'jsonpCallback'
  if (url.indexOf('?') < 0) url += '?'
  url += `&${options.jsonpCallback}=${jsonpCallback}`
  options.format = 'script'
  log('httpJsonp', url)
  log('options', options)
  return fetchData(url, 'get', options, (err, resp, body) => {
    log('httpJsonp response', body)
    if (err) {
      log('httpPost Error', JOSN.stringify(err))
    } else {
      body = JSON.parse(body.replace(new RegExp(`^${jsonpCallback}\\(({.*})\\)$`), '$1'))
    }
    callback(err, resp, body)
  })
}

// const handleDeflateRaw = data => new Promise((resolve, reject) => {
//   deflateRaw(data, (err, buf) => {
//     if (err) return reject(err)
//     resolve(buf)
//   })
// })

// const regx = /(?:\d\w)+/g

const fetchData = async (
  url,
  method,
  {
    headers = {}, format = 'json', timeout = 15000, ...options
  },
  callback
) => {
  headers = Object.assign({}, headers)
  // if (headers[bHh]) {
  //   const path = url.replace(/^https?:\/\/[\w.:]+\//, '/')
  //   let s = Buffer.from(bHh, 'hex').toString()
  //   s = s.replace(s.substr(-1), '')
  //   s = Buffer.from(s, 'base64').toString()
  //   let v = process.versions.app.split('-')[0].split('.').map(n => n.length < 3 ? n.padStart(3, '0') : n).join('')
  //   let v2 = process.versions.app.split('-')[1] || ''
  //   headers[s] = !s || `${(await handleDeflateRaw(Buffer.from(JSON.stringify(`${path}${v}`.match(regx), null, 1).concat(v)).toString('base64'))).toString('hex')}&${parseInt(v)}${v2}`
  //   delete headers[bHh]
  // }
  log('fetchData', url)
  log('options', options)
  log('headers', headers)
  return request(
    url,
    {
      ...options,
      method,
      headers: Object.assign({}, httpOptions.headers, headers),
      timeout,
      agent: undefined,
      json: format === 'json'
    },
    (err, resp, body) => {
      if (err) return callback(err, null)
      callback(null, resp, body)
    }
  )
}

/**
 * promise 形式的请求方法
 * @param {*} url
 * @param {*} options
 */
const httpPromise = (url, options) => {
  const obj = {
    isCancelled: false
  }
  obj.promise = new Promise((resolve, reject) => {
    obj.cancelFn = reject
    log('httpPromise', url)
    log('options', options)
    fetchData(url, options.method, options, (err, resp, body) => {
      // options.isShowProgress && window.api.hideProgress()
      log('httpPromise response', body)
      obj.requestObj = null
      obj.cancelFn = null
      if (err) return reject(err)
      resolve(resp)
    }).then((ro) => {
      obj.requestObj = ro
      if (obj.isCancelled) obj.cancelHttp()
    })
  })
  obj.cancelHttp = () => {
    if (!obj.requestObj) return (obj.isCancelled = true)
    cancelHttp(obj.requestObj)
    obj.requestObj = null
    obj.promise = obj.cancelHttp = null
    obj.cancelFn(new Error(msg.cancelRequest))
    obj.cancelFn = null
  }
  return obj
}


const request = (url, options, callback) => {
  let data
  if (options.body) {
    data = options.body
  } else if (options.form) {
    data = options.form
    // data.content_type = 'application/x-www-form-urlencoded'
    options.json = false
  } else if (options.formData) {
    data = options.formData
    // data.content_type = 'multipart/form-data'
    options.json = false
  }
  options.response_timeout = options.timeout
  return needle.request(
    options.method || 'get',
    url,
    data,
    options,
    (err, resp, body) => {
      if (!err) {
        body = resp.body = resp.raw.toString()
        try {
          resp.body = JSON.parse(resp.body)
        } catch (_) {
          log('needle error', _)
        }
        body = resp.body
      }
      callback(err, resp, body)
    }
  ).request
}
