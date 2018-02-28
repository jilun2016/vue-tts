/* eslint-disable */
import {BASE_API_URL} from './baseUrl'
(function (window, document) {

  try {
    if (navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1) {
      var timestamp, nonceStr, signature;
      var appId, shareUrl;
      var xhr = new XMLHttpRequest();
      var ajaxUrl = `${BASE_API_URL}/wx/jssdk_config?currentUrl=${encodeURIComponent(window.location.href)}`  //正式环境
      xhr.open('GET', ajaxUrl, false);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.onreadystatechange = function () {
        console.log(xhr)
        if (xhr.readyState == 4 && xhr.status == 200) {
          var res = xhr.responseText;
          var result = eval("(" + res + ")");
          // alert(JSON.stringify(result))
          if (result && result.data) {
            timestamp = result.data.timestamp; // 必填，生成签名的时间戳
            nonceStr = result.data.nonce; // 必填，生成签名的随机串
            signature = result.data.signature; // 必填，签名
            appId = result.data.appId;
            shareUrl = result.data.url;
          }
        }
      }

      var url = window.location.href;

      xhr.send();

      wx.config({
        debug: false,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'translateVoice',
          'startRecord',
          'stopRecord',
          'onRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard'
        ]
      });
    }
  } catch (e) {
    // alert('error:' + e)
    console.log(e);
  }

  function shareWeixin(shareInfo) {

    var meta = document.getElementsByTagName('meta');
    var share_desc = '';
    for (var i in meta) {
      if (typeof meta[i].name != "undefined" && meta[i].name.toLowerCase() == "description") {
        share_desc = meta[i].content;
      }
    }

    var shareImg = ''
    if (document.getElementById('shareImg')) {
      shareImg = document.getElementById('shareImg').src
    }

    shareInfo = shareInfo || {}
    var shareData = {
      title: shareInfo.title || document.title,
      desc: shareInfo.desc || share_desc,
      link: shareInfo.link || window.location.href,
      imgUrl: shareInfo.imgUrl || shareImg || (window.location.protocol + '//' + window.location.host + '/static/share.png'),
    };

    console.log('微信分享data：', shareData)
    //分享给朋友
    wx.onMenuShareAppMessage({
      title: shareData.title,
      desc: shareData.desc,
      link: shareData.link,
      imgUrl: shareData.imgUrl
    });
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: shareData.title,
      desc: shareData.desc,
      link: shareData.link,
      imgUrl: shareData.imgUrl
    });
    //分享到QQ
    wx.onMenuShareQQ({
      title: shareData.title,
      desc: shareData.desc,
      link: shareData.link,
      imgUrl: shareData.imgUrl
    });
    //分享到腾讯微博
    wx.onMenuShareWeibo({
      title: shareData.title,
      desc: shareData.desc,
      link: shareData.link,
      imgUrl: shareData.imgUrl
    });
    //分享到QQ空间
    wx.onMenuShareQZone({
      title: shareData.title,
      desc: shareData.desc,
      link: shareData.link,
      imgUrl: shareData.imgUrl
    });
  }

  window.shareWeixin = shareWeixin

  // 初始化
  // if(document.getElementById('shareArea')) {
    window.wx && window.wx.ready && window.wx.ready(function(){
      shareWeixin();
    });
  // }
})(window, document);
/* eslint-enable */
