<template>
  <div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
        <mt-tab-container-item id="tab-container1">
          <mt-cell title="任务要求" to="/ReportTask" is-link value="查看" />
          <mt-cell title="厂况" to="/ReportUpload" is-link value="编写" />
          <mt-cell title="大货情况" to="/ReportUpload" is-link value="编写" />
          <mt-cell title="抽样" to="/ReportUpload" is-link value="编写" />
          <mt-cell title="包装" to="/ReportUpload" is-link value="编写" />
          <mt-cell title="款式\型号" to="/ReportUpload" is-link value="编写" />
          <mt-cell title="辅料" to="/ReportUpload" is-link value="编写" />
          <mt-cell title="做工" to="/ReportUpload" is-link value="编写" />
          <mt-cell title="尺寸" to="/ReportUpload" is-link value="编写" />
          <mt-cell title="测试" to="/ReportUpload" is-link value="编写" />
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
        active: 'tab-container1'
      };
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
