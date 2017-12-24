<template>
  <div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
        <mt-tab-container-item id="tab-container1">
          <mt-cell style="color:gray;font-size:18px;" title="任务要求"></mt-cell>
          <mt-field placeholder="请填写任务要求" type="textarea" rows="3" v-model="taskDesc"></mt-field>
          <mt-cell style="color:gray;font-size:18px;" title="验货抽样数"></mt-cell>
          <mt-field label="订单总数" placeholder="请填写订单总数" type="number" v-model="orderCount"></mt-field>
          <mt-field label="抽样比例" placeholder="请填写抽样比例" type="number" v-model="sampleProportion">%</mt-field>
          <mt-field label="验货抽样数" placeholder="请填写验货抽样数" type="number" v-model="sampleCount"></mt-field>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  const BASE_URL = 'http://localhost:7777/tts';
  import * as axios from 'axios';
  export default {
    name: 'page-tab-container',
    data() {
      return {
        active: 'tab-container1',
        taskDesc: '',
        orderCount: '',
        sampleProportion: '',
        sampleCount: ''
      };
    },
    methods: {
      loadData: function () {
        let _this = this
        _this.getComment()
      },
      getComment: function () {
        let _this = this
        axios.get(BASE_URL+'/' +this.$route.params.paramReportId + '/task').then((res) => {
          let data = res.data
        }).catch((err) => {
        })
      },
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
