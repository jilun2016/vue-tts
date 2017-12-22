<template>
  <div>
    <div >
      <mt-tab-container  v-model="active">
        <mt-tab-container-item id="report1">
          <mt-cell
            title="报告11"
            to="/ReportDetail"
            is-link
            value="">
          </mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'report1'
    };
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
