<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="swiper">
      <swiper :list="swipers" auto style="width:100%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
    </div>
    <!-- 导航 -->
    <div class="nav">
      <div class="matrix-nav">
        <flexbox :gutter="0">
          <flexbox-item v-for="(item, index) in navList" :key="index">
            <shop-nav class="nva-icon" :title="item.title" :src="item.img" :link="item.url"></shop-nav>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
  import { Swiper, SwiperItem, Cell, Marquee, MarqueeItem, Flexbox, FlexboxItem, Divider, Scroller } from 'vux'
  import ShopNav from '@/components/ShopNav'

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
    img: 'https://static.vux.li/demo/3.jpg',
    title: '送你一次旅行'
  }]

  const navList = [{
    url: '../check',
    img: '../../../static/vegetables.png',
    title: '打卡'
  }, {
    url: '/aql',
    img: '../../../static/fruit.png',
    title: 'AQL计算'
  }, {
    url: '../report',
    img: '../../../static/vegetables.png',
    title: '报告',
  }]

  export default {
    data () {
      return {
        swipers: baseList,
        navList: navList,
        demo02_index: 1,
        goToCell: '跳转',
        news: '公告',
        recommend: '品牌特卖',
      }
    },
    components: {
      Swiper,
      SwiperItem,
      Cell,
      Marquee,
      MarqueeItem,
      Flexbox,
      FlexboxItem,
      ShopNav,
      Divider,
      Scroller,
    },
    methods: {
      demo01_onIndexChange (index) {
        this.demo01_index = index
      },
      onItemClick () {
        console.log('on item click')
      },
      recomm(url) {
        console.log("--recomm--")
        if (/^javas/.test(this.url) || !this.url) return
        this.$router.push(url)
      },
    }
  }
</script>

<style scoped>
  .home {
    padding-bottom: 70px;
  }
  .nav {
    background-color: #fff;
    padding-top: 10px;
    padding-bottom: 12px;
  }
  .matrix-nav {
    margin-top: 5px;
  }
  .nva-icon {
    width: 60px;
    margin: 0 auto;
    /*background-color: #58b7ff;*/
  }
  .recommend {
    padding: 15px 12px 0 12px;
    /*background-color: #08e9ef;*/
  }
  .recommend .sells {
    /*height: 90px;*/
    /*position: relative;*/
    width: 680px;
    /*background-color: antiquewhite;*/
  }
  .recommend .sells .item {
    width: 130px;
    height: 90px;
    background-color: #ccc;
    /*display:inline-block;*/
    margin-left: 6px;
    float: left;
  }
  .recommend .sells .item img {
    width: 130px;
    height: 90px;
  }
  .recommend .sells .item:first-child {
    margin-left: 0;
  }
  .shop-goods {
    background-color: #ffffff;
  }
</style>
