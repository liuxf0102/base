//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
     
  },

  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      console.log("getUninoid 1");
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          
          that.globalData.userInfo = res.userInfo;
          typeof cb == "function" && cb(that.globalData.userInfo);
          
        }
      })
    };
    
  },
  getOpenid:function()
  {
    console.log("getUninoid");
    var that = this;
    wx.login({
      success: function (res) {
        console.log("login success:" + res.code);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wx5699f282563037ea',
              secret: '9f8dc89e304f4f0082598c60df5e1519',
              js_code: res.code,
              grant_type: 'authorization_code'
            }, success: function (res) {
              console.log(res);
              
                that.globalData.openid = res.data.openid;;

            }
          }
          )
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    openid:''
    
  }
})
