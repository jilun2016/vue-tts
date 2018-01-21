<template>
    <div class="summary">
      <div class="localtion">
        对于客户特别重视的验货要点，反馈如下
      </div>
      <div class="description">
        <textarea v-model="reportSummary" placeholder="如需要，可添加说明" rows="8"></textarea>
      </div>
      <div class="r">
        <mt-button type="primary" style="width:100vw;" @click="submit()">提交</mt-button>
      </div>
    </div>
  </template>

  <script>
    import {Toast} from 'mint-ui'

    export default {
      data() {
        return {
          reportSummary: ''
        };
      },
      methods: {
        loadData: function () {
          let _this = this
          _this.getSummaryCKDetail()
        },
        getSummaryCKDetail: function () {
          let _this = this
          _this.$ajax.get(_this.$BASE_URL+'/report/' +this.$route.params.reportId + '/summary').then((res) => {
            let data = res.data
            _this.reportSummary = data.reportSummary
          }).catch((err) => {
            Toast('获取失败');
          })
        },
        submit: function () {
          let _this = this;
          let param = {
            summary: _this.reportSummary,
          };
          _this.$ajax.post(_this.$BASE_URL + '/report/' + this.$route.params.reportId + '/summary', param).then((res) => {
            Toast('保存成功');
          }).catch((err) => {
            Toast('保存失败');
          })
        },
      },
      created: function (){
        this.loadData()
      }
    }
  </script>

  <style lang="less" scoped>
    .summary {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0px;
      font-size: 14px;
      background-color: #F2F2F8;
      overflow-y: scroll;
    }

    .localtion {
      color: #666;
      padding: 15px;
    }

    .description {
      background: #fff;
      padding: 15px;
      > div{
        border-bottom: 1px solid #dfdfdf;
      }
      textarea{
        width: 100%;
        margin-top: 10px;
        padding-bottom: 10px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 0;
        border: 0;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        outline: 0;
        line-height: 1.6;
        font-size: inherit;
        width: 100%;
        color: #666;
      }
    }

    .r {
      position: fixed;
      bottom: 0;
      width: 100vw;
    }
  </style>
