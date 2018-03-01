<template>
  <div class="app-main">
    <div class="swipe-banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item, i) in demo01_list" :key="i">
            <img class="banner" :src="item.img" :alt="item.title">
          </mt-swipe-item>
        </mt-swipe>
    </div>
  </div>
</template>

<script>
  const baseList = [{
    url: 'javascript:',
    img: 'https://static.vux.li/demo/1.jpg',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/2.jpg',
    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/5.jpg',
    title: '送你一次旅行',
    fallbackImg: 'https://static.vux.li/demo/3.jpg'
  }]

  export default {
    data () {
      return {
        demo01_list: baseList,
      }
    }
  }
</script>

<style scoped>
  .swipe-banner{
    height: 255px;
  }
  .banner{
    width: 100%;
  }
</style>
