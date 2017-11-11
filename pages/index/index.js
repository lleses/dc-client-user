//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    titleColsNum: 1,
    types: null,
    typeIndex: 0,
    typeId: null,
    commoditys: {},
    userId: null
  },
  onShow: function () {
    console.log("onLoad--index");
    var _that = this;
    app.getSessionId(function (p_sessionId) {
      console.log("p_sessionId:" + p_sessionId);
      wx.request({
        url: app.globalData.server + '/commodity_type/init_data',
        data: {
          sessionId: p_sessionId,
          appId: app.globalData.appId
        },
        success: function (res) {
          _that.setData({
            types: res.data.types,
            commoditys: res.data.commoditys,
            typeIndex: 0
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
    app.getSessionId(function (p_sessionId) {
      console.log("p_sessionId:" + p_sessionId);
      wx.request({
        url: app.globalData.server + '/commodity_type/selType',
        data: {
          sessionId: p_sessionId,
          appId: app.globalData.appId,
          commodityTypeId: e.target.dataset.typeId
        },
        success: function (res) {
          _that.setData({
            commoditys: res.data
          });
        }
      });
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
        url: app.globalData.server + '/cart/add',
        data: {
          sessionId: p_sessionId,
          commodityId: e.target.dataset.buyId,
          price: e.target.dataset.comPrice
        },
        success: function (res) {
          var commoditys = _that.data.commoditys;
          for (var i = 0; i < commoditys.length; i++) {
            var _commodity = commoditys[i];
            if (_commodity.id == e.target.dataset.buyId) {
              _commodity.orderNum++;
            }
          }
          _that.setData({
            commoditys: commoditys
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
        url: app.globalData.server + '/shoppingCart/less',
        data: {
          sessionId: p_sessionId,
          commodityId: e.target.dataset.buyId,
          price: e.target.dataset.comPrice
        },
        success: function (res) {
          var commoditys = _that.data.commoditys;
          for (var i = 0; i < commoditys.length; i++) {
            var _commodity = commoditys[i];
            if (_commodity.id == e.target.dataset.buyId) {
              if (_commodity.orderNum != 0) {
                _commodity.orderNum--;
              }
            }
          }
          _that.setData({
            commoditys: commoditys
          });
        }
      });
    });
  }
})

