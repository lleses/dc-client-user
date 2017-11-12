var app = getApp()
Page({
  data: {
    name: null,
    phone: null,
    address: null,
    detailedAddress: null,
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
            name: _user.name,
            phone: _user.phone,
            address: _user.address,
            detailedAddress: _user.detailedAddress,
            carts: _carts,
            zj: _zj
          })
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
        app.getSessionId(function (p_sessionId) {
          console.log("p_sessionId:" + p_sessionId);
          wx.request({
            url: app.globalData.server + '/cart/saveUserInfo',
            data: {
              sessionId: p_sessionId,
              name: _that.data.name,
              phone: _that.data.phone,
              address: _that.data.address,
              detailedAddress: _that.data.detailedAddress
            },
            success: function (rs) {
            }
          });
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

