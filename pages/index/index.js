//获取应用实例
var app = getApp()
Page({
  data: {
    server: app.globalData.server,
    productTypes: {},//产品类别
    carts: [],//购物车
    typeIndex: 0,//产品类别Index
    typeId: null//产品类别ID
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
        url: app.globalData.server + '/user/product/list',
        data: {
          sessionId: p_sessionId,
          storeId: app.globalData.storeId
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
            productTypes: _rs.data.productTypes,
            carts: _rs.data.carts
          });
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
  selType: function (e) {
    var _that = this;
    console.log("selType--typeIndex:" + e.target.dataset.typeIndex + ",typeId:" + e.target.dataset.typeId);
    _that.setData({
      typeIndex: e.target.dataset.typeIndex,
      typeId: e.target.dataset.typeId
    });
  },
  toUrl: function (e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.selid,
    })
  },
  addBuyNum: function (e) {
    var _that = this;
    app.getSessionId(function (p_sessionId) {
      console.log("p_sessionId:" + p_sessionId);
      wx.request({
        url: app.globalData.server + '/user/cart/add',
        data: {
          sessionId: p_sessionId,
          storeId: app.globalData.storeId,
          productId: e.currentTarget.dataset.productId
        },
        success: function (res) {
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
            carts: _rs.data.carts
          });
        }
      });
    });
  },
  lessBuyNum: function (e) {
    var _that = this;
    app.getSessionId(function (p_sessionId) {
      console.log("p_sessionId:" + p_sessionId);
      wx.request({
        url: app.globalData.server + '/user/cart/less',
        data: {
          sessionId: p_sessionId,
          storeId: app.globalData.storeId,
          productId: e.currentTarget.dataset.productId
        },
        success: function (res) {
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
            carts: _rs.data.carts
          });
        }
      });
    });
  }
})
