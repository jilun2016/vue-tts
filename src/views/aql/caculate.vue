<template>
  <div>
    <div class="page-title">
      <mt-cell :title=caculateDesc></mt-cell>
    </div>
    <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
      <mt-tab-container-item id="tab-container1">
        SHIPPING LOT SIZE:  <mt-field type="number" v-model="shipSize"></mt-field>
         <hr />
        MIN AND MAJ:
        <mt-picker :slots="slots" @change="onValuesChange"  visibleItemCount=3 itemHeight=40></mt-picker>
        <hr />
        <el-button type="primary" style="width:100vw;" @click.native="submit">计算</el-button>
      </mt-tab-container-item>
    </mt-tab-container>


  </div>

</template>


<style>
  .page-title {
    font-size: 20px;
    margin: 20px auto;
    text-align: center;
    display: block;
    line-height: 1;
  }
</style>



<script>
  export default {
    data() {
      return {
        active: 'tab-container1',
        caculateType: '',
        caculateDesc:'',
        pickerValue: '',
        minValue: 0,
        maxValue: 0,
        slots: [
          {
            flex: 1,
            values: ['0.010', '0.015', '0.025', '0.040', '0.065'],
            className: 'slot1',
            textAlign: 'right'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['0.010', '0.015', '0.025', '0.040', '0.065'],
            className: 'slot3',
            textAlign: 'left'
          }
        ]
      };
    },
    methods: {
      onValuesChange(picker, values) {
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0]);
        }
        this.minValue = values[0];
        this.maxValue = values[1];
      },
      submit: function(){
        let _this = this
        let param = {
          checkRemark: _this.textarea,
          checkImage: _this.imageUrl,
          address: _this.address,
          checkEmail: _this.checkEmail,
          openId: '123'
        }
        axios.post(BASE_URL+"/check", param).then((res) => {
        }).catch((err) => {
        })
      },
    },
    created: function (){
      this.caculateType = this.$route.params.type
      this.caculateDesc = this.$route.params.desc
    },
  }


</script>
