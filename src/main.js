import Vue from 'vue'
import App from './App'
import router from './router'
import AMap from 'vue-amap';
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import '../src/assets/icon/iconfont.css';
import 'font-awesome/css/font-awesome.css'
import 'mint-ui/lib/style.css'
import * as util from '@/util'
import MintUI from 'mint-ui'

import axios from 'axios'
Vue.config.productionTip = false


Vue.use(AMap);
AMap.initAMapApiLoader({
  key: 'fe2f51cffa60876c98bfd9f49528c90a',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation','AMap.Geocoder']
});
Vue.use(ElementUI);

Vue.use(MintUI)

Vue.prototype.$ajax = axios
Vue.prototype.$BASE_URL = 'http://localhost:7777/tts/v1'

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
