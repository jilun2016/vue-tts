<template>
  <div class="homeBox" style="text-align:center;">
    <div class="localtion" align="left">
      <br/>
      <p> 款号/型号：AJMY202SKLB </p>
      <br/>
    </div>
    <br/>
    <p align="left">大货箱堆</p>
    <textarea
      style=" width:98%; height:200px;border-left-style:none; border-right-style:none; border-top-style:none;resize:none;overflow:scroll"
      v-model="reportCKDesc" placeholder="如需要，可添加说明"></textarea>
    <br/>
    <div class="card-content-imglist" align="left">
      <ul>
        <li v-if="images.length < 5">
          <img src="../../assets/img/xiangji2.png" @click="addImange()">
        </li>
        <li v-for="(item, index) in images" :key="index">
          <div class="img-cancel" @click.stop="removeImage(index)"></div>
          <img :src="imgCropFilter(item)">
        </li>
      </ul>
      <input type="file" id="fileElem" accept="image/*" @change="choosePhoto($event)" hidden/>
    </div>
    <div class="r">
      <mt-button type="primary" style="width:99vw;" @click="submit()">提交</mt-button>
    </div>
  </div>
</template>

<script>
  import * as axios from 'axios';

  const BASE_URL = 'http://localhost:7777/tts/v1';

  export default {
    data() {
      return {
        fullscreenLoading: false,
        images: [],
        reportCKDesc: ''
      };
    },
    methods: {
      loadData: function () {
        let _this = this
        _this.getTaskCKDetail()
      },
      getTaskCKDetail: function () {
        let _this = this
        axios.get(BASE_URL+'/report/' +this.$route.params.reportId + '/ck').then((res) => {
          let data = res.data
          _this.images = (data.images ? data.images.split(',') : []);
          _this.reportCKDesc = data.reportCKDesc
        }).catch((err) => {
        })
      },
      submit: function () {
        let _this = this;
        let param = {
          images: _this.images,
          reportCKDesc: _this.reportCKDesc
        };
        axios.post(BASE_URL + '/report/' + this.$route.params.reportId + '/CK', param).then((res) => {
        }).catch((err) => {
        })
      },
      addImange: function () {
        let fileElem = document.getElementById("fileElem");
        if (fileElem) {
          fileElem.click();
        }
      },
      imgCropFilter: function (imageCode) {
        let result = 'tts/xiangji.png';
        if (imageCode) {
          let array = imageCode.split(',');
          if (array.length > 0) {
            result = array[0];
          }
        }
        return 'http://cdn2017.oss-cn-shenzhen.aliyuncs.com/' + result;
      },
      removeImage: function (index) {
        let _this = this
        let images = _this.images
        images.splice(index, 1)
        _this.images = images
      },
      viewImage: function (index) {
        let _this = this
        let imgList = []
        let current = ''
        _this.$lodash.forEach(_this.images, function (imageCode) {
          imgList.push(_this.imgFilter(imageCode))
        })
        _this.$wx.previewImage({
          current: imgList[index],
          urls: imgList
        })
      },
      choosePhoto: function (e) {
        let _this = this;
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        if (files.length > 0) {
          _this.fullscreenLoading = true;
          let formData = new FormData();
          formData.append('file', files[0]);
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          };
          _this.fullscreenLoading = true;
          axios.post(BASE_URL + "/v1/common/upload", formData, config).then((res) => {
            let images = _this.images;
            images.push(res.data);
            _this.images = images;
          }).catch((err) => {
          });
          _this.fullscreenLoading = false
        }
      }
    },
    created: function (){
      this.loadData()
    }
  }
</script>

<style lang="css" scoped>
  .localtion {
    margin: 0px;
    padding: 0px;
    background-color: #e9e9e9;
    font-family: Consolas;
    font-size: 18px;
  }
  .homeBox {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    font-family: Consolas;
    font-size: 18px;
    background-color: #ffffff;
  }
  .r {
    position: fixed;
    bottom: 0;
    width: 100vw;
  }
  .card-content-imglist {
    width: 100%;
    margin-bottom: .5rem;
  }
  .card-content-imglist ul {
    width: 100%;
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
  }
  .card-content-imglist ul li {
    width: 31%;
    margin-right: .25rem;
    display: inline-block;
    height: 0;
    padding-bottom: 31%;
    overflow: hidden;
    margin-bottom: .25rem;
  }
  .card-content-imglist ul li:hover {
    background: #f1f1f1;
  }
  .card-content-imglist img {
    width: 100%;
  }
  .img-cancel {
    width: 1.8rem;
    height: 1.8rem;
    display: inline-block;
    background-image: url(../../assets/img/cancel.png);
    background-size: 100% 100%;
    position: relative;
    margin-bottom: -1.8rem;
    float: right;
  }
  .img-cancel:hover {
    opacity: .8;
  }
</style>
