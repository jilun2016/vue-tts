<template>
  <div class="homeBox">
    <div class="localtion">
      款号/型号：{{reportName}}
    </div>
    <div class="description">
      <div>
        <p>{{type.editName}}</p>
        <textarea v-model="reportDesc" placeholder="如需要，可添加说明" rows="4"></textarea>
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
  import {convertBase64UrlToBlob} from '@/util/imgFile'

  export default {
    data() {
      return {
        reportId: null,
        reportDetailId: null,
        reportName: '',
        reportType: '',
        fullscreenLoading: false,
        type: {},
        images: [],
        imagesList: [],
        timeStamp: new Date().getTime(),
        reportDesc: '',
        draftEditFlag: 0,
      };
    },
    watch: {
      // 如果 `question` 发生改变，这个函数就会运行
      images: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
        this.dataChange()
      },
      reportDesc: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
        this.dataChange()
      }
    },
    methods: {
      loadData: function () {
        let _this = this
        _this.$ajax.get(_this.$BASE_URL+'/report/item/' +this.$route.params.reportDetailId).then((res) => {
          let data = res.data
          _this.images = (data.reportImages ? data.reportImages.split(',') : []);
          _this.reportDesc = data.reportDesc
        }).catch((err) => {
        })
      },
      submit: function () {
        let _this = this;
        if(this.images.length == 0) {
          Toast("请添加图片")
          return
        }
        // 先上传到七牛云 再保存
        _this.imagesList = []
        var imgLength = _this.images.length
        for(var i=0; i<imgLength; i++){
          var imageCode = _this.images[i]
          if (imageCode.indexOf('data:image/') > -1) {
            _this.photo_toQN(imageCode)
          } else {
            let images = _this.imagesList;
            images.push(imageCode);
            _this.imagesList = images;
          }
        }

        // 定时检测有没有上传完
        var time = setInterval(function(){
          if (imgLength === _this.imagesList.length) {
            clearInterval(time)
            let param = {
              reportId: _this.$route.params.reportId,
              // reportName: this.$route.params.reportName,
              reportType: _this.$route.params.reportType,
              reportImages: _this.imagesList.join(','),
              reportDesc: _this.reportDesc
            };
            if( _this.$route.params.reportDetailId){
              _this.$ajax.put(_this.$BASE_URL + '/report/item/' + _this.$route.params.reportDetailId, param).then((res) => {
                Toast('更新成功')
                _this.clearCacheData()
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
                  _this.clearCacheData()
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
          }
        }, 500)
      },
      addImange: function () {
        let fileElem = document.getElementById("fileElem");
        if (fileElem) {
          fileElem.click();
        }
      },
      // imgCropFilter: function (imageCode) {
      //   return imageCode
      // },
      imgCropFilter: function (imageCode) {
        let result = 'tts/xiangji.png';
        if (imageCode) {
          if (imageCode.indexOf('data:image/') > -1) {
            return imageCode;
          } else {
            let array = imageCode.split(',');
            if (array.length > 0) {
              result = array[0];
            }
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
        // _this.$wx.previewImage({
        //   current: imgList[index],
        //   urls: imgList
        // })
      },
      // 选择完直接上传到七牛云
      choosePhoto_toQN: function (img) {
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
      },
      // 批量上传到七牛云
      photo_toQN: function (urlData) {
        let _this = this;
        let formData = new FormData();
        formData.append('file', convertBase64UrlToBlob(urlData));
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        //提交给七牛处理
        _this.$ajax.post(_this.$BASE_URL + "/common/upload", formData, config).then((res) => {
          let images = _this.imagesList;
          images.push(res.data);
          _this.imagesList = images;
        }).catch((err) => {
        });
      },
      // 保存缓存 不上传到七牛云
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

          var file = files[0];
          //判断类型是不是图片
          if(!/image\/\w+/.test(file.type)){
            alert("请确保文件为图像类型");
            return false;
          }
          //小于1M压缩
          if(file.size/1024 > 1025) { //大于1M，进行压缩上传
            console.log('>1M')
            _this.photoCompress(file, {
                quality: 0.2
            }, function(base64Codes){
              _this.images.push(base64Codes)
                // //console.log("压缩后：" + base.length / 1024 + " " + base);
                // var bl = convertBase64UrlToBlob(base64Codes);
                // form.append("file", bl, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
                // xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
                // xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
                // xhr.onload = uploadComplete; //请求完成
                // xhr.onerror =  uploadFailed; //请求失败
                // xhr.send(form); //开始上传，发送form数据
            });
          }else{
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
              // let image_base64=this.result.split(",")[1]
              _this.images.push(this.result)
            }
          }
        }
      },
      dataChange: function () {
        let key = `${this.reportId}:${this.reportType}`
        var cacheData

        var data = {
          images: this.images,
          reportDesc: this.reportDesc,
          reportDetailId: this.reportDetailId,
          draftFlag: true,
          isShow: false,
          timeStamp: this.timeStamp
        }

        if(this.reportDetailId){
          key = `${key}:${this.reportDetailId}`
          cacheData = data
        } else {
          key = `${key}:new`
          cacheData = window.localStorage.getItem(key)
          cacheData = cacheData ? JSON.parse(cacheData) : {}
          cacheData[this.timeStamp] = data
        }

        if (this.reportDesc || (this.images && this.images.length > 0)) {
          window.localStorage.setItem(key, JSON.stringify(cacheData))
        } else {
          window.localStorage.removeItem(key)
        }
      },
      clearCacheData: function() {
        let key = `${this.reportId}:${this.reportType}`
        if(this.reportDetailId){
          key = `${key}:${this.reportDetailId}`
        } else {
          key = `${key}:new`
        }
        window.localStorage.removeItem(key)
      },
      photoCompress: function(file,w,objDiv){
        let _this = this
        var ready=new FileReader();
        /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
        ready.readAsDataURL(file);
        ready.onload=function(){
            var re=this.result;
            _this.canvasDataURL(re,w,objDiv)
        }
      },
      canvasDataURL: function(path, obj, callback){
        var img = new Image();
        img.src = path;
        img.onload = function(){
          var that = this;
          // 默认按比例压缩
          var w = that.width,
            h = that.height,
            scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
          var quality = 0.7;  // 默认图片质量为0.7
          //生成canvas
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          // 创建属性节点
          var anw = document.createAttribute("width");
          anw.nodeValue = w;
          var anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);
          // 图像质量
          if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
          }
          // quality值越小，所绘制出的图像越模糊
          var base64 = canvas.toDataURL('image/jpeg', quality);
          // 回调函数返回base64的值
          callback(base64);
        }
      }
    },
    created: function (){
      let _this = this
      this.reportId = this.$route.params.reportId
      this.reportDetailId = this.$route.params.reportDetailId
      this.reportName = this.$route.params.reportName
      this.reportType = this.$route.params.reportType
      TYPE_CONFIF.forEach(element => {
        if(element.type == _this.reportType) {
          _this.type = element
        }
      })
      _this.draftEditFlag = window.localStorage.getItem('draftEditFlag')
      let editData = window.localStorage.getItem('editData')

      if (_this.draftEditFlag == '1') {
        let cacheData = editData && JSON.parse(editData)
        if (cacheData) {
          _this.timeStamp = cacheData.timeStamp
          _this.images = cacheData.images
          _this.reportDesc = cacheData.reportDesc
        }
      } else if(this.reportDetailId) {
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
