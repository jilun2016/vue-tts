import { BASE_URL } from './type'

export default {
  choosePhoto: function(e){
    let _this = this;
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    if(files.length > 0) {
      let formData = new FormData();
      formData.append('file', files[0]);
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      };
      //提交给七牛处理
      axios.post(BASE_URL+"/v1/common/upload", formData,config).then((res) => {
        _this.imageUrl = res.data;
      }).catch((err) => {
      })
    }
  },
}
