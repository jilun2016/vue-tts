<template>
  <div>
    <div class="page-title">
      <mt-cell :title=caculateDesc></mt-cell>
    </div>
    <div class="page-title">
      SHIPPING LOT SIZE: <input number="true" type="number" class="input">
    </div>
    <hr />
    <div class="page-title2">
    MAJOR Defects:
    <mt-picker :slots="slots" @change="onValuesChange" :visibleItemCount=3></mt-picker>
    </div>
    <hr />
    <div class="page-title2">
    MINOR Defects:
    <mt-picker :slots="slots" @change="onValuesChange" :visibleItemCount=3></mt-picker>
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
            textAlign: 'center'
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
