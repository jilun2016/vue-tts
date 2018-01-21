<template>
    <div>
      <div class="reportName">
        <span>{{params.reportName}}</span>
        <span class="edit-btn" @click="editName()"><i class="fa fa-edit"></i></span>
        <span class="toggle-btn" @click="isHide = !isHide">
          <i class="fa" :class="{'fa-angle-down': isHide, 'fa-angle-up': !isHide}"></i>
        </span>
      </div>
      <div class="page-tab-container" :class="{hide: isHide}">
        <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
          <mt-tab-container-item id="tab-container1">
            <mt-cell v-for="(item, i) in formList" :key="i" :title="item.title" @click.native="itemClick(item)" is-link value="编写" ></mt-cell>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </template>

  <script>
    import {Toast, MessageBox} from 'mint-ui'
    import {TYPE_CONFIF} from './typeConfig'

    export default {
      name: 'page-tab-container',
      data() {
        return {
          isHide: false,
          active: 'tab-container1',
          params: {
            reportId: '',
            reportName: '',
          },
          formList: TYPE_CONFIF
        };
      },
      methods:{
        itemClick(item) {
          switch (item.type){
            case 'report_rwyq':
              this.$router.push({name:'rp-task', params: {reportId: this.params.reportId, reportType: item.type, reportName: this.params.reportName}})
              return;
            case 'report_zs':
              this.$router.push({name:'rp-summary', params: {reportId: this.params.reportId, reportType: item.type, reportName: this.params.reportName}})
              return;
            default:
              this.$router.push({name:'rp-ck-list', params: {reportId: this.params.reportId, reportType: item.type, reportName: this.params.reportName}})
          }
        },
        editName() {
          let _this = this;
          MessageBox.prompt(' ', '修改报告名称', {
            inputType: 'text',
            inputValue: _this.params.reportName,
            inputPlaceholder: '请输入报告名称',
            inputErrorMessage: '报告名称不能为空',
            inputValidator: (val) => {
              // if (val === null) {
              //   return true;//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
              // }
              return !!(val)
            }
          }).then(({ value, action }) => {
            _this.$ajax.put(`${_this.$BASE_URL}/report/${_this.params.reportId}`, {
              reportName: value
            }).then((res)=>{
              Toast('修改成功');
              _this.params.reportName = value
              _this.$router.replace({
                name: 'rp-detail',
                params: {
                  reportId: _this.params.reportId,
                  reportName: value
                }
              });
            }).catch(function(err){
              Toast('修改失败');
            });
          });
        }
      },
      created: function (){
        this.params.reportId = this.$route.params.reportId
        this.params.reportName = this.$route.params.reportName
      }
    };
  </script>

  <style lang="less" scoped>
    .reportName{
      height: 60px;
      line-height: 60px;
      padding: 0 10px;
      background: #fff;
      font-size: 18px;
      justify-content: space-around;
      .edit-btn{
        font-size: 14px;
        color: #999;
        margin-left: 10px;
      }
      .toggle-btn{
        display: inline-block;
        float: right;
        margin-right: 20px;
      }
    }
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
