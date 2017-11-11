//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },
  getSessionId: function (f_callback) {
    var _that = this;
    var _sessionId = wx.getStorageSync('sessionId');
    console.log("get sessionId, sessionId=" + _sessionId);
    if (!!f_callback != null && typeof f_callback === "function") {
      _that.wxLogin(_sessionId, f_callback);
    } else {
      console.log("getSessionId callback is not function");
    }
  },
  wxLogin: function (p_sessionId, f_callback) {
    var _that = this;
    wx.login({
      success: function (e) {
        var _code = e.code;
        console.log("login success ,code=" + _code);
        if (_code) {
          wx.request({
            url: _that.globalData.server + '/wxAuth/createSssion',
            data: {
              sessionId: p_sessionId,
              code: _code,
              appId: _that.globalData.appId
            },
            success: function (res) {
              var _sessionId = res.data;
              console.log("save sessionId,  sessionId=" + _sessionId);
              wx.setStorageSync('sessionId', _sessionId);
              if (!!f_callback != null && typeof f_callback === "function") {
                f_callback(_sessionId);
              } else {
                console.log("getSessionId callback is not function");
              }
            }
          });
        } else {
          console.log('获取用户登录态失败！' + e.errMsg)
        }
      },
      fail: function (e) {
        console.log('login fail');
      },
    });
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
    }
  },
  globalData: {
    userInfo: null,
    appId: "wx198ab4de814c9787",
    server: 'http://localhost:8080'
  }
})