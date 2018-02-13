<template>
  <div class='contaner'>
    授权中...
  </div>
</template>

<script>
  import * as util from '@/util'

  export default {
    data() {
      return {

      }
    },
    methods: {
      redirectWXAuth () {
        var url = util.funcUrlDel('code')
        var redirectUri = window.encodeURIComponent(`${url}`)
        var appId = ''
        var weixinAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=blackfish#wechat_redirect`
        window.location.replace(weixinAuthUrl)
      }
    },
    created() {
      // 跳转授权页面
      this.redirectWXAuth()
    }
  }
</script>

<style lang="less" scoped>
  .contaner{
    font-size: 16px;
    text-align: center;
    margin-top: 50px;
  }
</style>
