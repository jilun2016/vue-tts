<template>
  <div class="app-wrapper">
    <div class="main-container">
      <router-view></router-view>
    </div>

  </div>

</template>

<script>
  import { FooterNav, FooterNavItem } from '@/views/layout'
  import Home from '@/views/home'
  import Order from '@/views/order'
  import Me from '@/views/me'

  const navList = [{
    url: '/home',
    img: '../../../static/vegetables.png',
    title: '首页'
  }, {
       url: '/TTS',
       img: '../../../static/vegetables.png',
       title: 'TTS'
  }, {
    url: '/category',
    img: '../../../static/vegetables.png',
    title: '商城'
  }, {
    url: '/order',
    img: '../../../static/vegetables.png',
    title: '购物车'
  }, {
    url: '/me',
    img: '../../../static/vegetables.png',
    title: '我的'
  }]

  export default {
    data () {
      return {

      }
    },
    components: {
      FooterNav,
      FooterNavItem,
      Home,
      Order,
      Me
    },
    methods: {
      onItemClick () {
        console.log('on item click')
      }
    }
  }
</script>

<style scoped>
  .app-wrapper {
    /*background-color: #cbff1d;*/
  }
</style>
