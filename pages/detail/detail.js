var app = getApp()
Page({
  data: {
    server: app.globalData.server,
    titleColsNum: 1,
    product: null
  },
  onLoad: function (option) {
    var _that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.server + '/user/product/detail',
      data: {
        id: option.id
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
        _that.setData({
          product: _rs.data.product
        });
      }
    });
  }
})

