<template>
  <div class="home">
    <!-- 导航 -->
    <div class="nav">
      <div class="matrix-nav">
        <div class="row-flex">
          <div class="row-flex-item" v-for="(item, index) in navList" :key="index">
              <shop-nav class="nva-icon" :title="item.title" :src="item.img" :link="item.url"></shop-nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ShopNav from '@/components/ShopNav'

  const navList = [{
    url: '../check',
    img: '../../../static/vegetables.png',
    title: '打卡'
  }, {
    url: '../aql',
    img: '../../../static/fruit.png',
    title: 'AQL计算'
  }, {
    url: '../rp/list',
    img: '../../../static/vegetables.png',
    title: '报告',
  }]

  export default {
    data () {
      return {
        navList: navList,
        demo02_index: 1,
        goToCell: '跳转',
        news: '公告',
        recommend: '品牌特卖',
      }
    },
    components: {
      ShopNav
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

<style lang="less" scoped>
  .row-flex{
    width: 100%;
    text-align: left;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    box-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    .row-flex-item{
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      -webkit-flex: 1;
      min-width: 20px;
      width: 0%;
    }
  }

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
