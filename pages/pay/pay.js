var app = getApp()
Page({
  data: {
    user:null,
    carts: {},
    zj: 0
  },
  onShow: function () {
    var _that = this;
    app.getSessionId(function (p_sessionId) {
      console.log("p_sessionId:" + p_sessionId);
      wx.request({
        url: app.globalData.server + '/cart/index',
        data: {
          sessionId: p_sessionId
        },
        success: function (res) {
          var _user = res.data.user;
          var _carts = res.data.cartRelationships;
          var _zj = 0;
          for (var i = 0; i < _carts.length; i++) {
            _zj = _zj + _carts[i].money;
          }
          _that.setData({
            user:_user,
            carts: _carts,
            zj: _zj
          })
        }
      });
    });
  },
  toPay: function (e) {
    wx.navigateTo({
      url: '../to_pay/to_pay',
    })
  },
})

