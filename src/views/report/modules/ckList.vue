<template>
    <div class="homeBox">
      <div class="localtion">
        款号/型号：AJMY202SKLB
      </div>
      <template v-if="list && list.length" >
        <div class="list" v-for="(item, i) in list" :key="i">
            <div class="detail">
              <p class="title">
                <!-- 工厂大门 - 1111 -->
                {{item.reportDesc}}
              </p>
              <div class="img-list">
                <img  v-for="(item, n) in item.reportImages" :key="n" :src="item"/>
                <!-- <img src="http://cdn2017.oss-cn-shenzhen.aliyuncs.com/tts/2/4/9f2a38788b534bfb8f26783871d2f875.png" alt="">
                <img src="http://cdn2017.oss-cn-shenzhen.aliyuncs.com/tts/2/4/9f2a38788b534bfb8f26783871d2f875.png" alt=""> -->
              </div>
            </div>
            <div class="edit">
              <div class="btn-group" :class="{isShow: item.isShow}">
                <span @click="eachEdit(item)"><i class="fa fa-edit"></i> 修改 </span>
                <span @click="eachDelete(item)"><i class="fa fa-trash"></i> 删除</span>
              </div>
              <span class="btn-edit" @click="eachEditClick(item)">
                <i class="fa fa-edit"></i>
              </span>
            </div>
          </div>
      </template>
      <div class="empty-box" v-else>
        <img :src="emptyImg" alt="">
        <div class="desc">啊哦，暂无报告哦～</div>
      </div>
      <div class="bottom-btn">
        <mt-button type="primary" style="width:100vw;" @click="addReportDetail()">
          新增
        </mt-button>
      </div>
    </div>
  </template>

  <script>
    import {Toast} from 'mint-ui'
    export default {
      data() {
        return {
          emptyImg: require('@/assets/img/empty2.png'),
          params: {
            reportId: '',
            reportType: '',
          },
          list: [
            // {
            //   id: 1,
            //   isShow: false,
            //   type: 'ck'
            // },
            // {
            //   id: 2,
            //   isShow: false,
            //   type: 'ck'
            // }
          ]
        };
      },
      methods: {
        eachEditClick(item) {
          item.isShow = !item.isShow
        },
        eachEdit(item) {
          this.$router.push({name:'rp-ck-edit', params: {reportId: this.params.reportId, reportType: this.params.reportType, reportDetailId: item.reportDetailId}})
        },
        eachDelete(item) {
          let _this = this
          _this.$ajax.delete(_this.$BASE_URL + `/report/item/${item.reportDetailId}`).then((res) => {
            Toast('删除成功')
          }).catch((err) => {
            Toast(err.message || '删除失败')
          })
        },
        addReportDetail() {
          this.$router.push({name:'rp-ck-add', params: {reportId: this.params.reportId, reportType: this.params.reportType}})
        },
        initData() {
          let _this = this
          _this.$ajax.get(_this.$BASE_URL + `/report/${this.params.reportId}/${this.params.reportType}`).then((res) => {
            // _this.list.splice(0, _this.list.length)
            _this.list = res.data
          }).catch((err) => {
            console.log(err)
            Toast(err.message || '获取失败')
          })
        }
      },
      created() {
        this.params.reportId = this.$route.params.reportId
        this.params.reportType = this.$route.params.reportType
        this.initData()
      }
    }
  </script>

  <style lang="less" scoped>
    @pd15: 15px;

    .homeBox {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0px;
      font-size: 14px;
      background-color: #F2F2F8;
      overflow-y: scroll;
      padding-bottom: 45px;
    }

    .localtion , .list{
      padding: @pd15
    }

    .localtion{
      background: #eeeef3;
    }

    .list{
      background: #fff;

      .title{
        margin-bottom: 15px;
      }

      .edit{
        position: relative;
        text-align: right;
        height: 40px;

        .btn-group{
          right: 0;
          display: none;
          background: #5C5B5C;
          color: #fff;
          padding: 10px 5px;
          font-size: 0;
          border-radius: 5px;
          > span{
            font-size: 14px;
            display: inline-block;
            padding: 0 15px;
          }
          > span:first-of-type{
            border-right: 2px solid #000;
          }

          &.isShow{
            display: inline-block;
          }
        }

        .btn-edit{
          /* padding: 10px 0 20px 20px; */
          display: inline-block;
          color: #999;
          height: 40px;
          line-height: 40px;
        }
      }
    }

    .bottom-btn {
      position: fixed;
      bottom: 0;
      width: 100vw;
    }

    .img-list img{
      width: 45%;
      margin: 5px;
    }

    .empty-box{
      text-align: center;
      img{
        width: 40%;
        margin: 40px 0 10px 0;
      }
    }
  </style>
