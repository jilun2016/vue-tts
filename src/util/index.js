
export function isIos () {
  let mobile = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(mobile)) {
    return true
  }
  return false
}

export function isAndroid () {
  return window.navigator.appVersion.match(/android/ig)
}

export function isWeiXinOrAlipay () {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger' || ua.indexOf('micromessenger') > -1 ||
    ua.indexOf('alipay') > -1) {
    return true
  }
  return false
}

export function isWeiXin () {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger' || ua.indexOf('micromessenger') > -1) {
    return true
  }
  return false
}

// 获取设备类型
export function device () {
  if (isIos()) {
    return 'ios'
  } else if (isAndroid()) {
    return 'android'
  }
  return 'others'
}

// 从url解析出p值
export function parsePValue (url = window.location.href) {
  var reg = new RegExp('(\/p\/[^\/?#]+\/)([0-9]+)')
  var r = url.match(reg)
  if (r != null) {
    return r[2]
  }
  return null
}

/**
 * 判断有没有base64
 * 1 Base64由64个字符组成A-Z a-z 0-9 + / =
 * 2 字符串的长度一定是4的倍数
 * 3 = 一定出现在末尾，等号的个数为0-2
 * @param {*} str
 */
export function isBase64Encode (str) {
  var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  if (base64regex.test(str)) {
    return true
  } else {
    return false
  }
}

/**
 * 保留两位小数
 * @param {*} num //数字
 */
export function returnFloat (num) {
  var value = Math.round(parseFloat(num) * 100) / 100
  var xsd = value.toString().split('.')
  if (xsd.length === 1) {
    value = value.toString() + '.00'
    return value
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + '0'
    }
    return value
  }
}

export function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2]); return null
}

// 删除url中某个参数,并跳转
export function funcUrlDel (name) {
  var loca = window.location
  var baseUrl = loca.origin + loca.pathname + '?'
  var query = loca.search.substr(1)
  if (query.indexOf(name) > -1) {
    var obj = {}
    var arr = query.split('&')
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split('=')
      obj[arr[i][0]] = arr[i][1]
    };
    delete obj[name]
    // eslint-disable-next-line
    var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
    return url
  }
  return window.location.href
}

// 获取当前域名
export function getMainHost (type) {
  return window.location.protocol + '//' + window.location.host
}


// cookie操作
export function setCookie (name, value, seconds) {
  seconds = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。
  var expires = "";
  if (seconds != 0 ) { //设置cookie生存时间
  var date = new Date();
  date.setTime(date.getTime()+(seconds*1000));
  expires = "; expires="+date.toGMTString();
  }
  document.cookie = name+"="+escape(value)+expires+"; path=/";
}

export function getCookie (e) {
  var i = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
  if (i !== null) {
    return i[2]
  } else {
    return ""
  }
}

export function delCookie (name) {
  let expire = new Date();
  expire.setTime(expire.getTime() - 1);
  let value = this.getCookie(name);
  if (value != null) {
    document.cookie = name + "=" + value + ";expires=" + expire.toGMTString() + "; path=/";
  }
}
