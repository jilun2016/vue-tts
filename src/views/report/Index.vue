<template>
  <div>
    <div >
      <mt-tab-container  v-model="active">
        <mt-tab-container-item id="report1">
          <p v-for="(item, index) in list" :key="index">
            <mt-cell :title="item.reportName"
                     :to="{ name: 'ReportDetail', params: { reportId: item.reportId }}"
                     is-link value="">
            </mt-cell>
          </p>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
const BASE_URL = 'http://localhost:7777/tts';
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
