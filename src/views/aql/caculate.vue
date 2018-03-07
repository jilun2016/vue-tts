<template>
  <div>
    <div class="page-title">
      <mt-cell :title=caculateDesc></mt-cell>
    </div>
    <div class="page-title">
      SHIPPING LOT SIZE: <input number="true" type="number" min="2" max="2147483647" v-model="shippingSize" class="input">
    </div>
    <hr />
    <div class="page-title2">
    MAJOR Defects:
    <mt-picker :slots="slotsMajor" @change="onMajorValuesChange" :visibleItemCount=3></mt-picker>
    </div>
    <hr />
    <div class="page-title2">
    MINOR Defects:
    <mt-picker :slots="slotsMinor" @change="onMinorValuesChange" :visibleItemCount=3></mt-picker>
    </div>
    <hr />
    <mt-button type="primary" style="width:100vw;" @click.native="submit">计算</mt-button>
  </div>

</template>


<style scoped>
  .page-title {
    font-size: 20px;
    margin: 20px auto;
    text-align: center;
    display: block;
    line-height: 1;
  }
  .page-title2 {
    font-size: 20px;
    margin: 20px auto;
    text-align: left;
    display: block;
    line-height: 1;
  }
  .input{
    border: 1px solid #ccc;
    padding: 7px 0px;
    border-radius: 3px; /*css3属性IE不支持*/
    padding-left:5px;
    font-size: 18px;
    text-align: center;
  }
</style>



<script>
  export default {
    data() {
      return {
        caculateType: '',
        caculateDesc:'',
        majorValue: 0,
        minorValue: 0,
        shippingSize: 0,
        slotsMajor: [
          {
            flex: 1,
            values: ['0.010', '0.015', '0.025', '0.040', '0.065'],
            className: 'slotsMajor',
            textAlign: 'center'
          }
        ],
        slotsMinor: [
          {
            flex: 1,
            values: ['0.010', '0.015', '0.025', '0.040', '0.065'],
            className: 'slotsMinor',
            textAlign: 'center'
          }
        ]
      };
    },
    methods: {
      onMajorValuesChange(picker, values) {
        this.majorValue = values[0];
      },
      onMinorValuesChange(picker, values) {
        this.minorValue = values[0];
      },
      submit: function(){
        let _this = this
        let data = [
          "shippingSize=" +  _this.shippingSize,
          "caculateType=" +  _this.caculateType,
          "majorValue=" +  _this.majorValue,
          "minorValue=" + _this.minorValue
         ];
        _this.$ajax.get(_this.$BASE_URL+"/caculate?"+data.join('&')).then((res) => {
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
