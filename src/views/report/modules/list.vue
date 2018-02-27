<template>
  <div class="report-list">
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="report1">
        <p v-for="(item, index) in list" :key="index">
          <mt-cell isLink @click.native=showDetail(item.id,item.reportName) :title="item.reportName">
          </mt-cell>
        </p>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="r">
      <mt-button type="primary" style="width:100vw;" @click="addReport()">新增报告</mt-button>
    </div>
  </div>
</template>

<script>
  import {Toast, MessageBox} from 'mint-ui'
  import * as util from '@/util'

  export default {
    data() {
      return {
        active: 'report1',
        openId: util.getCookie('wxAppId') || '1234',
        list: []
      };
    },
    methods: {
      loadTop: function () {
        let _this = this
        _this.loadData()
      },
      loadData: function () {
        let _this = this
        // let params = [
        //   'openId=' + this.openId
        // ];
        // _this.$ajax.get(_this.$BASE_URL + '/report/reports?' + params.join('&')).then((res) => {
        _this.$ajax.get(_this.$BASE_URL + '/report/reports').then((res) => {
          _this.list.splice(0, _this.list.length)
          if (res.data && res.data.length) {
            _this.list = res.data
          }
        }).catch((err) => {})
      },
      showDetail(reportId, reportName) {
        this.$router.push({
          name: 'rp-detail',
          params: {
            reportId: reportId,
            reportName: reportName
          }
        })
      },
      addReport: function () {
        let _this = this
        MessageBox.prompt(' ', '新增报告', {
          inputType: 'text',
          inputValue: null,
          inputPlaceholder: '请输入报告名称',
          inputErrorMessage: '报告名称不能为空',
          inputValidator: (val) => {
            return !!(val)
          }
        }).then(({ value, action }) => {
          _this.$ajax.post(`${_this.$BASE_URL}/report`, {
            // openId: _this.openId,
            reportName: value
          }).then((res)=>{
            Toast('新增成功');
            _this.loadData()
          }).catch(function(err){
            console.log(err);
          });
        });
      }
    },
    created: function () {
      this.loadData()
    }
  };

</script>

<style lang="css" scoped>
  .item {
    display: inline-block;
  }

  .nav {
    padding: 10px;
  }

  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }

  .report-list{
    margin-bottom: 50px;
  }

  .r {
    position: fixed;
    bottom: 0;
    width: 100vw;
  }

</style>
