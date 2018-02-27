<template>
  <div class="img-rotote">
    <div class="btn-top">
      <span class="cancel">取消</span>
      <span class="save">保存</span>
    </div>
    <div class="container">
      <img src="" alt="">
    </div>
    <div class="btn-bottom">
      <span @click="refresh">
        <i class="fa fa-refresh"></i>
        旋转
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      refresh() {
        alert('refresh')
      }
    }
  }
</script>

<style lang="less" scoped>
  .img-rotote{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #333;

    .btn-top{
      /* position: absolute; */
      /* top: 0; */
      width: 100%;
      position: relative;
      height: 10%;

      span{
        color: #fff;
        font-size: 16px;
        height: 30px;
        line-height: 30px;
        padding: 15px;
        display: inline-block;
      }

      span.cancel{
        position: absolute;
        left: 20px;
      }

      span.save{
        position: absolute;
        right: 20px;
      }
    }

    .container{
      height: 80%;
    }

    .btn-bottom{
      /* position: absolute;
      bottom: 0; */
      text-align: center;
      width: 100%;
      height: 10%;
      position: relative;

      span{
        color: #fff;
        font-size: 16px;
        height: 30px;
        line-height: 30px;
        padding: 15px;
        display: inline-block;
      }
    }
  }
</style>
