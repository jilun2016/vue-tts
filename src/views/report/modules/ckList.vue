<template>
    <div class="homeBox">
      <div class="localtion">
        款号/型号：{{reportName}}
        <mt-button class="btn-save-draft-all" type="danger" v-if="draftEditFlag" @click="submitAll">保存草稿</mt-button>
      </div>
      <template v-if="draftDataList && draftDataList.length" >
        <div class="list" v-for="(item, i) in draftDataList" :key="i" v-if="(draftEditFlag && item.draftFlag) || !item.draftFlag">
          <div class="detail">
            <p class="title-draft" v-if="item.draftFlag"><i class="fa fa-pencil"></i>&nbsp;草稿内容</p>
            <p class="title">
              <!-- 工厂大门 - 1111 -->
              {{type.editName ? ( type.editName + ' - ' ) : ''}}
              {{item.reportDesc}}
            </p>
            <div class="img-list" v-if="item.images && item.images.length">
              <img  v-for="(item, n) in item.images" :key="n" :src="imgCropFilter(item)"/>
            </div>
          </div>
          <div class="edit">
            <div class="btn-group" :class="{isShow: item.isShow}">
              <span @click="eachEdit(item)"><i class="fa fa-edit"></i> 修改 </span>
              <span @click="eachDelete(item)"><i class="fa fa-trash"></i> 删除</span>
            </div>
            <!-- <span class="btn-save-draft">
              保存草稿
            </span> -->
            <span class="btn-edit" @click="eachEditClick(item)">
              <i class="fa fa-edit"></i>
            </span>
          </div>
        </div>
      </template>
      <div class="empty-box" v-else>
        <img :src="emptyImg" alt="">
        <div class="desc">啊哦，暂无报告哦～</div>
      </div>
      <div class="bottom-btn">
        <mt-button type="primary" style="width:100vw;" @click="addReportDetail()">
          新增
        </mt-button>
      </div>
    </div>
  </template>

  <script>
    import {Toast, MessageBox, Indicator} from 'mint-ui'
    import {TYPE_CONFIF} from './typeConfig'
    import {convertBase64UrlToBlob} from '@/util/imgFile'

    export default {
      data() {
        return {
          emptyImg: require('@/assets/img/empty2.png'),
          reportName: '',
          params: {
            reportId: '',
            reportType: '',
          },
          type: {},
          list: [],
          draftFlag: false,  // 编辑草稿状态
          draftEditFlag: false,
          draftDataList: [],
          newCacheData: {},
          saveCount: 0,
          saveSucessCount: 0,
          saveFail: false,
          tempData: {}
        };
      },
      watch: {
        'draftFlag': 'draftModal'
      },
      methods: {
        eachEditClick(item) {
          item.isShow = !item.isShow
        },
        eachEdit(item) {
          window.localStorage.setItem('editData', JSON.stringify(item))
          this.$router.push({name:'rp-ck-edit',
            params: {
              reportId: this.params.reportId,
              reportType: this.params.reportType,
              reportDetailId: item.reportDetailId,
              reportName: this.$route.params.reportName
            }
          })
        },
        eachDelete(item) {
          let _this = this
          if (item.draftFlag) {
            if (item.reportDetailId) {
              window.localStorage.removeItem(_this.draftKey(item.reportDetailId))
            } else {
              delete _this.newCacheData[item.timeStamp]
              if (JSON.stringify(_this.newCacheData) === "{}"){
                window.localStorage.removeItem(_this.draftKey())
              } else {
                window.localStorage.setItem(_this.draftKey(), JSON.stringify(_this.newCacheData))
              }
            }
            Toast('删除成功')
            _this.initData()
            return
          }

          _this.$ajax.delete(_this.$BASE_URL + `/report/item/${item.reportDetailId}`).then((res) => {
            Toast('删除成功')
            _this.initData()
          }).catch((err) => {
            Toast(err.message || '删除失败')
          })
        },
        addReportDetail() {
          window.localStorage.removeItem('editData')
          this.$router.push({name:'rp-ck-add', params: {reportId: this.params.reportId, reportType: this.params.reportType, reportName: this.$route.params.reportName}})
        },
        initData() {
          let _this = this
          _this.draftDataList = []
          // 缓存数组
          let newCacheData = _this.draftData(_this.draftKey())
          if (newCacheData) {
            _this.draftFlag = true
            for(var key in newCacheData){
              _this.draftDataList.push(newCacheData[key])
            }
            _this.newCacheData = newCacheData
          }
          _this.$ajax.get(_this.$BASE_URL + `/report/${this.params.reportId}/${this.params.reportType}`).then((res) => {
            // _this.list.splice(0, _this.list.length)
            res.data.forEach(element => {
              element.isShow = false
              element.images = element.reportImages ? element.reportImages.split(',') : []

              // 缓存数组
              let cacheData = _this.draftData(_this.draftKey(element.reportDetailId))
              if (cacheData) {
                _this.draftDataList.push(cacheData)
                _this.draftFlag = true
              } else {
                _this.draftDataList.push(element)
              }
              console.log('所有数据：', _this.draftDataList)
            });
            // _this.list = res.data
          }).catch((err) => {
            console.log(err)
            Toast(err.message || '获取失败')
          })
        },
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
        draftKey (reportDetailId) {
          let key = `${this.params.reportId}:${this.params.reportType}`
          return reportDetailId ? `${key}:${reportDetailId}` : `${key}:new`
        },
        draftData (key) {
          return window.localStorage.getItem(key) && JSON.parse(window.localStorage.getItem(key))
        },
        draftModal () {
          let _this = this
          MessageBox.confirm('您有未保存的草稿内容, 是否继续编辑?', {
            title: '提示',
            confirmButtonText: '继续',
            cancelButtonText: '放弃',
            showCancelButton: true
          }).then(() => {
            // 草稿状态保存
            window.localStorage.setItem('draftEditFlag', 1)
            _this.draftEditFlag = true
          }, () => {
            // 清空缓存数据
            window.localStorage.setItem('draftEditFlag', 0)
            _this.draftEditFlag = false
            // 清空全部缓存数据
            _this.draftDataList.forEach((item, i) => {
              if (item.draftFlag){
                if (item.reportDetailId) {
                  window.localStorage.removeItem(_this.draftKey(item.reportDetailId))
                } else {
                  delete _this.newCacheData[item.timeStamp]
                  if (JSON.stringify(_this.newCacheData) === "{}"){
                    window.localStorage.removeItem(_this.draftKey())
                  } else {
                    window.localStorage.setItem(_this.draftKey(), JSON.stringify(_this.newCacheData))
                  }
                }
              }
            })
          })
        },
        submitAll () {
          var _this = this
          Indicator.open({
            text: '保存中...',
            spinnerType: 'fading-circle'
          });
          _this.saveCount = 0
          _this.draftDataList.forEach((item, i) => {
            if (item.draftFlag){
              _this.tempData[i] = {
                time: null,
                imgLength: 0,
                imagesList: []
              }
              _this.saveCount++
              _this.submit(item, i)
            }
          })

          let time = setInterval(() => {
            if (_this.saveCount == _this.saveSucessCount || _this.saveFail) {
              clearInterval(time)
              Indicator.close()
              console.log(_this.saveCount, _this.saveSucessCount, _this.saveFail)
              if (_this.saveFail) {
                Toast('保存异常，请重试！')
                setTimeout(() => {
                  window.location.reload()
                }, 2000)
              } else {
                Toast('保存成功')
                setTimeout(() => {
                  window.location.reload()
                }, 2000)
              }
            }
          }, 1000)
        },
        // 批量保存
        submit (item, n) {
          let _this = this;
          // 先上传到七牛云 再保存
          _this.tempData[n].imagesList = []
          var imgLength = _this.tempData[n].imgLength = item.images.length
          for(var i=0; i<imgLength; i++){
            var imageCode = item.images[i]
            if (imageCode.indexOf('data:image/') > -1) {
              _this.photo_toQN(imageCode, n)
            } else {
              _this.tempData[n].imagesList.push(imageCode)
            }
          }

          // 定时检测有没有上传完
          _this.tempData[n].time = setInterval(function(){
            if (_this.tempData[n].imgLength === _this.tempData[n].imagesList.length) {

              clearInterval(_this.tempData[n].time)

              let param = {
                reportId: _this.$route.params.reportId,
                reportType: _this.$route.params.reportType,
                reportImages: _this.tempData[n].imagesList.join(','),
                reportDesc: item.reportDesc
              };
              if(item.reportDetailId){
                _this.$ajax.put(_this.$BASE_URL + '/report/item/' + item.reportDetailId, param).then((res) => {
                  // 清空数据
                  window.localStorage.removeItem(_this.draftKey(item.reportDetailId))
                  _this.saveSucessCount++
                }).catch((err) => {
                  _this.saveFail = true
                })
              }else{
                _this.$ajax.post(_this.$BASE_URL + '/report/item', param).then((res) => {
                  // 清空数据
                  delete _this.newCacheData[item.timeStamp]
                  if (JSON.stringify(_this.newCacheData) === "{}"){
                    window.localStorage.removeItem(_this.draftKey())
                  } else {
                    window.localStorage.setItem(_this.draftKey(), JSON.stringify(_this.newCacheData))
                  }
                  _this.saveSucessCount++
                }).catch((err) => {
                  _this.saveFail = true
                })
              }
            }
          }, 500)
        },
        // 批量上传到七牛云
        photo_toQN: function (urlData, n) {
          let _this = this;
          let formData = new FormData();
          formData.append('file', convertBase64UrlToBlob(urlData));
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          };
          //提交给七牛处理
          _this.$ajax.post(_this.$BASE_URL + "/common/upload", formData, config).then((res) => {
            _this.tempData[n].imagesList.push(res.data)
          }).catch((err) => {
            _this.saveFail = true
          });
        }
      },
      created() {
        let _this = this
        this.params.reportId = this.$route.params.reportId
        this.params.reportType = this.$route.params.reportType
        this.reportName = this.$route.params.reportName
        TYPE_CONFIF.forEach(element => {
          if(element.type == _this.$route.params.reportType) {
            _this.type = element
          }
        })
        window.localStorage.setItem('draftEditFlag', 0)
        this.initData()
      }
    }
  </script>

  <style lang="less" scoped>
    @pd15: 15px;

    .homeBox {
      position: fixed;
      width: 100%;
      height: 87%;
      top: 0;
      font-size: 14px;
      background-color: #F2F2F8;
      overflow-y: scroll;
      padding-bottom: 45px;
    }

    .localtion , .list{
      padding: @pd15
    }

    .localtion{
      background: #eeeef3;
      position: absolute;
      width: 100%;
      top: 0;
      box-sizing: border-box;
    }

    .list{
      background: #fff;
      border-bottom: 1px solid #dfdfdf;
      margin-top: 45px;

      .title{
        margin-bottom: 15px;
      }

      .edit{
        position: relative;
        text-align: right;
        height: 40px;

        .btn-group{
          right: 0;
          display: none;
          background: #5C5B5C;
          color: #fff;
          padding: 10px 5px;
          font-size: 0;
          border-radius: 5px;
          > span{
            font-size: 14px;
            display: inline-block;
            padding: 0 15px;
          }
          > span:first-of-type{
            border-right: 2px solid #000;
          }

          &.isShow{
            display: inline-block;
          }
        }

        .btn-edit{
          /* padding: 10px 0 20px 20px; */
          display: inline-block;
          color: #999;
          height: 40px;
          line-height: 40px;
        }
      }
    }

    .bottom-btn {
      position: fixed;
      bottom: 10px;
      width: 100vw;
    }

    .img-list img{
      width: 45%;
      margin: 5px;
    }

    .empty-box{
      margin-top: 45px;
      text-align: center;
      img{
        width: 40%;
        margin: 40px 0 10px 0;
      }
    }

    .btn-save-draft-all{
      position: fixed;
      right: 3px;
      top: 4px;
    }

    .title-draft{
      color: #999;
      margin-bottom: 5px;
      font-size: 16px;
      line-height: 1.5;
    }
  </style>
