var app = getApp()
Page({
  data: {
    stores: []
  },
  onShow: function () {
    console.log("onLoad--index");
    var _that = this;
    wx.showLoading({
      title: '加载中',
    });
    app.getSessionId(function (p_sessionId) {
      console.log("p_sessionId:" + p_sessionId);
      wx.request({
        url: app.globalData.server + '/user/product/check',
        data: {
          sessionId: p_sessionId
        },
        success: function (res) {
          wx.hideLoading();
          if (!res.statusCode == 200) {
            console.log(res.errMsg);
            return;
          }
          var _rs = res.data;
          console.log("list,返回信息----");
          console.log(_rs);
          if (_rs.code == 100) {
            console.log(_rs.message);
            return;
          }
          //跳转首页
          if (_rs.data.url == 32) {
            //跳转首页
            app.globalData.storeId = _rs.data.storeId;
            wx.switchTab({
              url: '../index/index',
            })
          } else if (_rs.data.url == 31) {//门店列表页
            _that.setData({
              stores: _rs.data.stores
            });
          }
        },
        fail: function () {
          wx.hideLoading();
          wx.showToast({
            title: '网络异常',
            success: function () {
            }
          });
        }
      });
    });
  },
  selStore: function (e) {
    console.log("--selStore");
    app.getSessionId(function (p_sessionId) {
      console.log("p_sessionId:" + p_sessionId);
      wx.request({
        url: app.globalData.server + '/user/product/checkStore',
        data: {
          sessionId: p_sessionId,
          storeId: e.currentTarget.dataset.storeId
        },
        success: function (res) {
          wx.hideLoading();
          if (!res.statusCode == 200) {
            console.log(res.errMsg);
            return;
          }
          var _rs = res.data;
          console.log("list,返回信息----");
          console.log(_rs);
          if (_rs.code == 100) {
            console.log(_rs.message);
            return;
          }
          //跳转首页
          app.globalData.storeId = e.currentTarget.dataset.storeId;
          wx.switchTab({
            url: '../index/index',
          })
        },
        fail: function () {
          wx.hideLoading();
          wx.showToast({
            title: '网络异常',
            success: function () {
            }
          });
        }
      });
    });
  }
})
