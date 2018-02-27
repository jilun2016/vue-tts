<template>
  <div>
    <div >
      <mt-tab-container  v-model="active">
        <mt-tab-container-item id="report1">
          <p v-for="(item, index) in list" :key="index">
            <mt-cell  isLink @click.native=showDetail(item.reportId) :title="item.reportName">
            </mt-cell>
          </p>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
const BASE_URL = 'https://tts.jilunxin.com/tts/v1';
import * as axios from 'axios';
export default {
  data() {
    return {
      active: 'report1',
      list: []
    };
  },
  methods:{
    loadTop: function(){
      let _this = this
      _this.loadData()
    },
    loadData: function(){
      let _this = this
      let params = [
        'openId=' + 123456
      ];
      axios.get(BASE_URL+'/report/reports?' + params.join('&')).then((res) => {
        _this.list.splice(0, _this.list.length)
        _this.list = res.data
      }).catch((err) => {
      })
    },
    showDetail(reportId){
      this.$router.push({name:'ReportDetail', params: {reportId: reportId }})
    }

  },
  created: function (){
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
</style>
