//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    tcs: {}
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/tc/list',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          tcs: res.data
        });
      }
    });
  },
  toUrl: function (e) {
    wx.navigateTo({
      url: '../a_tc_add/a_tc_add'
    })
  },
  toEditUrl: function (e) {
    wx.navigateTo({
      url: '../a_tc_edit/a_tc_edit?id=' + e.target.dataset.selid
    })
  }
})

