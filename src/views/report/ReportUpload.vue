<template>
  <div  class = "homeBox" style="text-align:center;" >
    <div  class ="localtion" align="left">
      <br />
      <p> 款号/型号：AJMY202SKLB </p>
      <br />
    </div>
    <br />
    <p align="left">工厂大门</p>
    <textarea style=" width:98%; height:200px;border-left-style:none; border-right-style:none; border-top-style:none;resize:none;overflow:scroll" v-model="comment" placeholder="如需要，可添加说明" ></textarea>
    <br />
    <div align="left">
      <ul>
        <li v-if="images.length < 3">
          <img src="../../assets/img/xiangji2.png" @click="addImange()">
        </li>
        <li v-for="(item, index) in images" :key="index"><div class="img-cancel" @click.stop="removeImage(index)"></div>
          <img :src="imgCropFilter(item)" @click.stop="viewImage(index)">
        </li>
      </ul>
      <input type="file" id="fileElem" accept="image/*" @change="choosePhoto($event)" hidden/>
    </div>
    <div class="r">
    <mt-button type="primary" style="width:99vw;">primary</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'page-tab-container',
    data() {
      return {
        active: 'tab-container1',
        comment: '',
        images: [],
      };
    },
    methods: {
      addImange: function() {
        let fileElem = document.getElementById("fileElem");
        if(fileElem) {
          fileElem.click();
        }
      },
      removeImage: function(index) {
        let _this = this
        let images = _this.images
        images.splice(index, 1)
        _this.images = images
      },
      imgCropFilter: function(imageCode){
        let result = 'Fo9D7-leb-x3A3rS6GsiEBQZ2On4';
        if (imageCode) {
          let array = imageCode.split(',');
          if(array.length > 0){
            result = array[0];
          }
        }
        return 'https://cdns.mtscrm.com/' + result + '?imageView2/1/w/150/h/150'
      },
      viewImage:function(index){
        let _this = this
        let imgList =  []
        let current = ''
        _this.$lodash.forEach(_this.images,function(imageCode){
          imgList.push(_this.imgFilter(imageCode))
        })
        _this.$wx.previewImage({
          current:imgList[index],
          urls: imgList
        })
      },
      choosePhoto: function(e){
        let _this = this;
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        if(files.length > 0) {
          _this.fullscreenLoading=true
          _this.axios.get('v1/common/uptokens').then((res) => {
            let data = res.data
            let formData = new FormData()
            formData.append('token', data.upToken)
            formData.append('file', files[0])
            //提交给七牛处理
            _this.$axios.post('https://up.qbox.me/', formData).then((res) => {
              let images = _this.images;
              images.push(res.data.key);
              _this.images = images;
            }).catch((err) => {
            })
          }).catch((err) => {
          })
          _this.fullscreenLoading=false
        }
      },

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
  .textareafull {
    width:98%;
    height:200px;
  }
  .localtion {
    margin:0px;
    padding:0px;
    background-color:#e9e9e9;
    font-family: Consolas;
    font-size:18px;
  }
  .homeBox {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    font-family: Consolas;
    font-size:18px;
    background-color:#ffffff;
  }
  .fixed-btn{
    z-index: 99;
    width: 100%;
    text-align: center;
    height: 3.67rem;
    line-height: 3.67rem;
    font-size: 1.33rem;
    color: #fff;
    background-color: #7B7DE5;
  }
  .r{
    position:fixed;
    bottom:0;
    width:100vw;
  }
</style>
