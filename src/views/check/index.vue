<template>
  <div>
    <div class="amap-page-container">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo" :plugin="plugin" :events="events">
        <el-amap-info-window :position="mywindow.position" :content="address" :visible="mywindow.visible" :events="mywindow.events"></el-amap-info-window>
        <el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
        <el-amap-circle :center="circle.center" :radius="circle.radius" :fillOpacity="circle.fillOpacity" :events="circle.events"
          :strokeColor="circle.strokeColor" :strokeStyle="circle.strokeStyle" :fillColor="circle.fillColor"></el-amap-circle>
      </el-amap>
    </div>
    <p hidden>location: lng = {{ lng }} lat = {{ lat }}</p>
    <div class = "localtion">
      <p >我的位置:</p>
      <p style="color:gray;font-size:15px;">{{ address }}</p>
      <el-form ref="form" :model="form" class="fromFront"  label-width="50px">
        <hr />
        <el-row :gutter="20">
          <el-col  :span="18"  >
          <el-button type="text" @click="dialogFormVisible = true" style="text-align:left; width:80vw;">
            <font class = "localtion" > 备注：  </font> <font class = "localtion" color="gray">选填</font>
          </el-button>
          <el-dialog  :visible.sync="dialogFormVisible"  width = "80%" :show-close="dialogClose" >
            <el-input type="textarea" :rows="4" placeholder="添加备注(选填)" v-model="textarea">
            </el-input>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          </el-col>
          <el-col :span="18" style="text-align:right; width:20vw;"  v-loading.fullscreen.lock="fullscreenLoading">
              <p v-if="imageUrl == ''">
                <img src="../../assets/img/xiangji.png" @click="addImange()">
              </p>
              <p v-if="imageUrl !== ''">
                <img :src="imgCropFilter(imageUrl)" @click="addImange()" >
              </p>
            <input type="file" id="fileElem" accept="image/*" @change="choosePhoto($event)" hidden/>
          </el-col>
        </el-row>
        邮箱地址:<input class = "localtion" style="text-align:left; width:80vw;" type="text" v-model="checkEmail"  placeholder="请输入发送邮箱地址"><br>
      </el-form>
    </div>
    <hr />
    <p />
    <div class="but-group">
      <el-button type="primary" style="width:100vw;" @click.native="submit">成功按钮</el-button>
    </div>
  </div>

</template>


<style>
  .amap-page-container {
    height: 500px;
  }
  .el-button-primary .router-link{
    color:#fff;
    margin-right: 20px;}
  .localtion {
    margin:0px;
    padding:0px;
    background-color:#E7EAEB;
    font-family: Consolas;
    font-size:18px;
  }
  .fromFront .el-form-item{
    margin:0px;
    padding:0px;
    background-color:#E7EAEB;
    font-family:"微软雅黑","黑体","宋体";
    font-size:50px;
  }

</style>



<script>
  import AMap from 'vue-amap';
  import * as axios from 'axios';
  const BASE_URL = 'https://tts.jilunxin.com/tts/v1';
  export default {
    data() {
      let self = this;
      return {
        fullscreenLoading: false,
        imageUrl: '',
        dialogClose:false,
        showFileList:false,
        textarea: '',
        dialogFormVisible: false,
        events: {
          click(e) {
            let {lng, lat} = e.lnglat;
            self.lng = lng;
            self.lat = lat;
            var geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: "all"
            });
            geocoder.getAddress([lng, lat], function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  self.address = result.regeocode.formattedAddress;
                  self.$nextTick();
                }
              }
            });
          }
        },
        form: {
          remark: ''
        },
        searchOption: {
          city: '上海',
          citylimit: true
        },
        zoom: 15,
        center: [11.5273285, 31.21515000],


        circle: {
          clickable: true,
          center: [113.36114, 22.31889],
          radius: 500,
          fillOpacity: 0.3,
          strokeStyle: 'dashed',
          fillColor: '#FFFF00',
          strokeColor: '#00BFFF',
          loaded: false,
        },
        lng: 0,
        lat: 0,
        address: '',
        checkEmail: '',
        marker: {
          position: [113.36114, 22.31889],
          events: {
            click: () => {
              if (this.mywindow.visible === true) {
                this.mywindow.visible = false
              } else {
                this.mywindow.visible = true
              }
            },
            dragend: (e) => {
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
            }
          },
          visible: true,
          draggable: false
        },
        mywindow: {
          position: [113.36114, 22.31889],
          content: '<h4>该点数据信息</h4><div class="text item">Information A: ...</div><div class="text item">Information B: ...</div>',
          visible: true,
          events: {
            close() {
              this.mywindow.visible = false
            }
          }
        },


        plugin: [{
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.address = result.position.formattedAddress;
                  self.loaded = true;
                  self.$nextTick();
                  self.address = result.formattedAddress;
                  console.log(result);
                }
              });
            }
          }
        }]


      };
    },
    methods: {
      addImange: function() {
        let fileElem = document.getElementById("fileElem");
        if(fileElem) {
          fileElem.click();
        }
      },
      imgCropFilter: function(imageCode){
        let result = 'tts/xiangji.png';
        if (imageCode) {
          let array = imageCode.split(',');
          if(array.length > 0){
            result = imageCode;
          }
        }
        return 'http://cdn2017.oss-cn-shenzhen.aliyuncs.com/' + result+"?x-oss-process=style/3232"
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
          _this.fullscreenLoading=true;
          let formData = new FormData();
          formData.append('file', files[0]);
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };
          _this.fullscreenLoading=true;
          //提交给七牛处理
          axios.post(BASE_URL+"/common/upload", formData,config).then((res) => {
            _this.imageUrl = res.data;
            _this.fullscreenLoading=false
          }).catch((err) => {
          })
          _this.fullscreenLoading=false
        }
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
    }
  }


</script>
