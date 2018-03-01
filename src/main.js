import Vue from 'vue'
import App from './App'
import router from './router'
import AMap from 'vue-amap';
import '../src/assets/icon/iconfont.css';
import 'font-awesome/css/font-awesome.css'
import 'mint-ui/lib/style.css'
import '@/assets/style/mint-ui/reset.less'

import * as util from '@/util'
import MintUI from 'mint-ui'

// import axios from 'axios'
import http from '@/util/http'
import {BASE_API_URL} from '@/util/baseUrl'

// 微信分享
import '@/util/wx-share'

Vue.config.productionTip = false


Vue.use(AMap);
AMap.initAMapApiLoader({
  key: 'fe2f51cffa60876c98bfd9f49528c90a',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation','AMap.Geocoder']
});

Vue.use(MintUI)

Vue.prototype.$ajax = http
Vue.prototype.$BASE_URL = BASE_API_URL

// 拦截未登陆情况
router.beforeEach((to, from, next) => {
  // if (to.path.indexOf('/rp/') > -1 && !util.getCookie('wxAppId')) {
  //   if (!util.isWeiXin() && to.path.indexOf('wxerror') == -1) {
  //     console.log(to, from)
  //     next({
  //       path: '/wxerror'
  //     })
  //     return
  //   }

  //   if (to.path.indexOf('wxlogin') == -1) {
  //      // 跳转微信授权登录
  //     next({
  //       path: '/wxlogin'
  //     })
  //     return
  //   }

  //   var code = util.getQueryString('code')
  //   if (code) {
  //     // 根据code获取openid 并塞到cookie
  //     _this.$ajax.post(_this.$BASE_URL + '/report/item', param).then((res) => {
  //       // 清空数据
  //       util.setCookie('wxAppId', res.appId, 7*24*60*60)
  //       next()
  //     })
  //   } else {
  //     next()
  //   }
  // }
  next()
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
