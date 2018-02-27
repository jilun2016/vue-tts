'use strict'

import axios from 'axios'
import qs from 'qs'
import {BASE_API_URL} from '@/util/baseUrl'

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  console.log('接口出参：', response)
  return response
  // if (response && (response.status === 200 || response.status === 304 || response.status === 400 || response.status === 401 || response.status === 415 )) {
  //   return response
  //   // 如果不需要除了data之外的数据，可以直接 return response.data
  // }
  // // 异常状态下，把错误信息返回去
  // return {
  //   status: -404,
  //   msg: '网络异常'
  // }
}

function checkCode (res) {
  // 如果未授权跳转授权页 todo
  if (res.data && res.data.errorCode && res.data.errorCode === '1011') {
    var redirectUrl =  res.data.errorMessage.replace('WxRedirectUrl', encodeURIComponent(window.location.href))
    window.location.href = redirectUrl
    return
  }

  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    alert(res.msg)
  }

  // if (res.status === 400 || res.status === 401) {
  //   alert(res.data.errorMessage)
  // }

  if (res.data && res.data.errorMessage) {
    alert(res.data.errorMessage)
  }

  // if (res.data && (!res.data.success)) {
  //   alert(JSON.stringify(res))
  // }
  return res
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: BASE_API_URL,
      url,
      data: data,
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  put (url, data) {
    return axios({
      method: 'put',
      baseURL: BASE_API_URL,
      url,
      data: data,
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: BASE_API_URL,
      url,
      params, // get 请求时带的参数
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
