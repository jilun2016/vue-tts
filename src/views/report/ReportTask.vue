<template>
  <div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
        <mt-tab-container-item id="tab-container1">
          <mt-cell style="color:gray;font-size:18px;" title="任务要求"></mt-cell>
          <mt-cell title="10% inspection"></mt-cell>
          <mt-cell style="color:gray;font-size:18px;" title="验货抽样数"></mt-cell>
          <mt-cell title="订单总数" value="520 PCS"></mt-cell>
          <mt-cell title="抽样比例" value="10.00%"></mt-cell>
          <mt-cell title="验货抽样数" value="52 PCS"></mt-cell>
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
