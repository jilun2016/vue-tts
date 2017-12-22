import Vue from 'vue'
import App from './App'
import router from './router'
import AMap from 'vue-amap';
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import '../src/assets/icon/iconfont.css';
import'mint-ui/lib/style.css'
import MintUI from 'mint-ui'

import axios from 'axios'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

Vue.use(AMap);
AMap.initAMapApiLoader({
  key: 'fe2f51cffa60876c98bfd9f49528c90a',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation','AMap.Geocoder']
});
Vue.use(ElementUI);

Vue.use(MintUI)

Vue.prototype.$ajax = axios
