<template>
  <div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
        <mt-tab-container-item id="tab-container1">
          <mt-cell  isLink @click.native=showSubReport() title="任务要求" value="编写">
          </mt-cell>
          <mt-cell  isLink @click.native=showSubReportCK() title="厂况" value="编写">
          </mt-cell>
          <mt-cell title="大货情况" to="/ReportUpload" is-link value="编写" ></mt-cell>
          <mt-cell title="抽样" to="/ReportUpload" is-link value="编写" ></mt-cell>
          <mt-cell title="包装" to="/ReportUpload" is-link value="编写" ></mt-cell>
          <mt-cell title="款式\型号" to="/ReportUpload" is-link value="编写"></mt-cell>
          <mt-cell title="辅料" to="/ReportUpload" is-link value="编写" ></mt-cell>
          <mt-cell title="做工" to="/ReportUpload" is-link value="编写" ></mt-cell>
          <mt-cell title="尺寸" to="/ReportUpload" is-link value="编写" ></mt-cell>
          <mt-cell title="测试" to="/ReportUpload" is-link value="编写"></mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'page-tab-container',
    data() {
      return {
        active: 'tab-container1',
        paramReportId: '',
      };
    },
    methods:{
      showSubReport(){
        this.$router.push({name:'ReportTask', params: {reportId: this.paramReportId }})
      },
      showSubReportCK(){
        this.$router.push({name:'ReportCK', params: {reportId: this.paramReportId }})
      },
      showSubReportDH(){
        this.$router.push({name:'ReportDH', params: {reportId: this.paramReportId }})
      }
    },
    created: function (){
      this.paramReportId = this.$route.params.reportId
    },
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
