var app = getApp()
Page({
  data: {
    titleColsNum: 1,
    commodity: null
  },
  onLoad: function (option) {
    var that = this;
    wx.request({
      url: app.globalData.server + '/commodity/detail',
      data: {
        id: option.id,
        orderNum: option.orderNum
      },
      success: function (res) {
        that.setData({
          commodity: res.data
        });
      }
    });
  }
})

