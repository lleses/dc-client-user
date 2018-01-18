var app = getApp()
Page({
  data: {
    carts: [],
    zj: 0, //总价
    level: 0,
    products: [],
    name: "",
    phone: "",
    address: "",
    detailedAddress: ""
  },
  onShow: function () {
    var _that = this;
    wx.showLoading({
      title: '加载中',
    });
    app.getSessionId(function (p_sessionId) {
      console.log("p_sessionId:" + p_sessionId);
      wx.request({
        url: app.globalData.server + '/user/cart/toPay',
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
            carts: _rs.data.carts,
            zj: _rs.data.zj,
            level: _rs.data.level,
            products: _rs.data.products
          });
        }
      });
    });
  },
  improveInformation: function (e) {
    var _that = this;
    wx.chooseAddress({
      success: function (res) {
        _that.setData({
          name: res.userName,
          phone: res.telNumber,
          address: res.provinceName + " " + res.cityName + " " + res.countyName,
          detailedAddress: res.detailInfo
        });
      }
    })
  },
  to_pay: function (e) {
    var _that = this;
    var _msg = "";
    //验证
    if (!_that.data.name) {
      _msg = "请填写收货人姓名";
    } else if (!_that.data.phone) {
      _msg = "请填写收货人电话";
    } else if (!_that.data.address) {
      _msg = "请填写送货地址";
    } else if (!_that.data.detailedAddress) {
      _msg = "请填写送货详细地址";
    }
    if (!!_msg) {
      wx.showModal({
        title: '温馨提示',
        content: _msg,
        showCancel: false
      });
      return;
    }
    wx.showToast({
      title: '等待接口审批',
      success: function () {
      }
    });
  }
})

