<template>
  <div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
        <mt-tab-container-item id="tab-container1">
          <mt-cell style="color:gray;font-size:18px;" title="任务要求"></mt-cell>
          <mt-field placeholder="请填写任务要求" type="textarea" rows="3" v-model="taskDesc" ></mt-field>
          <mt-cell style="color:gray;font-size:18px;" title="验货抽样数"></mt-cell>
          <mt-field label="订单总数" placeholder="请填写订单总数" type="number" v-model="orderCount" ></mt-field>
          <mt-field label="抽样比例" placeholder="请填写抽样比例" type="number" v-model="sampleProportion">%</mt-field>
          <mt-field label="验货抽样数" placeholder="请填写验货抽样数" type="number" v-model="sampleCount"></mt-field>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="r">
      <mt-button type="primary" style="width:99vw;" @click="submit()">提交</mt-button>
    </div>
  </div>
</template>

<script>
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
        _this.getTaskDetail()
      },
      getTaskDetail: function () {
        let _this = this
        this.$ajax.get(_this.$BASE_URL+'/report/' +this.$route.params.reportId + '/task').then((res) => {
          let data = res.data
          _this.taskDesc = data.taskDesc
          _this.orderCount = data.orderCount
          _this.sampleProportion = data.sampleProportion
          _this.sampleCount = data.sampleCount
        }).catch((err) => {
        })
      },
      submit: function(){
        let _this = this;
        let param = {
          reportId: this.$route.params.reportId,
          taskDesc: _this.taskDesc,
          orderCount: _this.orderCount,
          sampleProportion: _this.sampleProportion,
          sampleCount: _this.sampleCount
        };
        this.$ajax.put(_this.$BASE_URL+'/report/' +this.$route.params.reportId + '/task', param).then((res) => {
          _this.$router.replace({
            name: 'commentShare'
          });
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
  .r{
    position:fixed;
    bottom:0;
    width:100vw;
  }
</style>
