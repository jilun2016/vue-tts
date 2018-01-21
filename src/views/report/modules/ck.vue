<template>
  <div class="homeBox">
    <div class="localtion">
      款号/型号：{{reportName}}
    </div>
    <div class="description">
      <div>
        <p>{{type.editName}}</p>
        <textarea v-model="reportCKDesc" placeholder="如需要，可添加说明" rows="4"></textarea>
      </div>
    </div>
    <div class="card-content-imglist">
      <ul>
        <li v-for="(item, index) in images" :key="index">
          <div class="img-cancel" @click.stop="removeImage(index)"></div>
          <img :src="imgCropFilter(item)">
        </li>
        <li v-if="images.length < 5">
          <img src="../../../assets/img/xiangji2.png" @click="addImange()">
        </li>
      </ul>
      <input type="file" id="fileElem" accept="image/*" @change="choosePhoto($event)" hidden/>
    </div>
    <div class="r">
      <mt-button type="primary" style="width:100vw;" @click="submit()">提交</mt-button>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import {TYPE_CONFIF} from './typeConfig'

  export default {
    data() {
      return {
        reportName: '',
        reportType: '',
        fullscreenLoading: false,
        type: {},
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
        _this.$ajax.get(_this.$BASE_URL+'/report/item/' +this.$route.params.reportDetailId).then((res) => {
          let data = res.data
          _this.images = (data.reportImages ? data.reportImages.split(',') : []);
          _this.reportCKDesc = data.reportDesc
        }).catch((err) => {
        })
      },
      submit: function () {
        let _this = this;
        let param = {
          reportId: this.$route.params.reportId,
          // reportName: this.$route.params.reportName,
          reportType: this.$route.params.reportType,
          reportImages: _this.images.join(','),
          reportDesc: _this.reportCKDesc
        };
        if( _this.$route.params.reportDetailId){
          _this.$ajax.put(_this.$BASE_URL + '/report/item/' + _this.$route.params.reportDetailId, param).then((res) => {
            Toast('更新成功')
            _this.loadData()
            // if(res && res.data && res.data.id) {
            //   Toast('更新成功')
            // }else{
            //   Toast('更新失败')
            // }
          }).catch((err) => {
            _this.loadData()
            // Toast('更新失败')
          })
        }else{
          _this.$ajax.post(_this.$BASE_URL + '/report/item', param).then((res) => {
            if(res && res.data && res.data.id) {
              Toast('新增成功')
              _this.$router.replace({
                name: 'rp-ck-list'
              });
            }else{
              Toast('新增失败')
            }
          }).catch((err) => {
            Toast('新增失败')
          })
        }

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
          //提交给七牛处理
          _this.$ajax.post(_this.$BASE_URL + "/common/upload", formData, config).then((res) => {
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
      let _this = this
      this.reportName = this.$route.params.reportName
      this.reportType = this.$route.params.reportType
      TYPE_CONFIF.forEach(element => {
        if(element.type == _this.reportType) {
          _this.type = element
        }
      })
      if(this.$route.params.reportDetailId) {
        this.loadData()
      }
    }
  }
</script>

<style lang="less" scoped>
  @pd15: 0 15px;

  .localtion ,.description, .card-content-imglist{
    padding: @pd15
  }

  .description, .card-content-imglist{
    background: #fff;
  }

  .homeBox {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    font-size: 14px;
    background-color: #F2F2F8;
    overflow-y: scroll;
  }

  .localtion {
    color: #666;
    padding: 15px;
    background: #eeeef3;
  }

  .description {
    padding-top: 15px;
    > div{
      border-bottom: 1px solid #dfdfdf;
    }
    textarea{
      width: 100%;
      margin-top: 10px;
      padding-bottom: 10px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 0;
      border: 0;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      outline: 0;
      line-height: 1.6;
      font-size: inherit;
      width: 100%;
      color: #666;
    }
  }

  .r {
    position: fixed;
    bottom: 0;
    width: 100vw;
  }
  .card-content-imglist {
    padding: 15px;
    margin-bottom: 45px;
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
    background-image: url(../../../assets/img/cancel.png);
    background-size: 100% 100%;
    position: relative;
    margin-bottom: -1.8rem;
    float: right;
  }
  .img-cancel:hover {
    opacity: .8;
  }
</style>
