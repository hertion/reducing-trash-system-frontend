// miniprogram/pages/homePage/homePage.js
var app = getApp();
var address = require("../../../data/mock2");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    tele: '',
    id: '',
    area:'',
    village:'',
    street:'',
    address: '',
    areaInfo:'',
    garbageChooses: [],
    //地址选择系列
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    areas: [],
    streets: [],
    villages: [],
    areaInfo: ''
    //
  },
  /**地址选择器方法 */
  // 点击所在地区弹出选择框
  select: function (e) {
    // 如果已经显示，不在执行显示动画
    if (this.data.addressMenuIsShow) {
      return false
    } else {
      // 执行显示动画
      this.startAddressAnimation(true)
    }
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    if (isShow) {
      // vh是用来表示尺寸的单位，高度全屏是100vh
      this.animation.translateY(0 + 'vh').step()
    } else {
      this.animation.translateY(40 + 'vh').step()
    }
    this.setData({
      animationAddressMenu: this.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var street = that.data.street
    var value = that.data.value
    this.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.areas[value[0]].name + ' ' + that.data.streets[value[1]].name + ' ' + that.data.villages[value[2]].name
    that.setData({
      areaInfo: "黑龙江省 哈尔滨市 " + areaInfo,
    })
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    var areas = this.data.areas
    var streets = this.data.streets
    var villages = this.data.villages
    var areaNum = value[0]
    var streetNum = value[1]
    var villageNum = value[2]
    // 如果地区选择项和之前不一样，表示滑动了地区，此时街道默认是地区的第一组数据，
    if (this.data.value[0] != areaNum) {
      var id = areas[areaNum].id
      this.setData({
        value: [areaNum, 0, 0],
        streets: address.streets[id],
        villages: address.villages[address.strees[id][0].id],
      })
    } else if (this.data.value[1] != streetNum) {
      // 滑动选择了第二项数据，即街道，此时村显示区-街道对应的第一组数据
      var id = streets[streetNum].id
      this.setData({
        value: [areaNum, streetNum, 0],
        villages: address.villages[streets[streetNum].id],
      })
    } else {
      // 滑动选择了区
      this.setData({
        value: [areaNum, streetNum, villageNum]
      })
    }
  },
  //
  verify() {
    var that = this;
    var link = app.globalData.http + '/api/recycleFirm/getCleaner?id=' + this.data.id;
    console.log(link);
    var Token = wx.getStorageSync('token');
    console.log(Token);
    wx.request({
      url: link,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 200) {
          wx.showToast({
            title: '为您找到保洁员',
            icon: 'none',
            duration: 1500,
          })
          that.setData({
            name: res.data.data
          })
        } else {
          wx.showToast({
            title: '没有为您找到该保洁员',
            icon: 'none',
            duration: 1500,
          })
        }
      }
    });


  },
  gotoRecycle() {
    var value = this.data.value
    var o= app.globalData.order
   o.name = this.data.name;
    o.id = this.data.id;
o.tele = this.data.tele;
o.area=this.data.areas[value[0]].name,
      o.street=this.data.streets[value[1]].name,
      o.village = this.data.villages[value[2]].name
      o.areaInfo = this.data.areaInfo
    o.address = this.data.address;
    wx.navigateTo({
      url: '../recycle/recycle',
    })
  },

  // 表单值改变
  onIdChange(event) {
    this.setData({
      id: event.detail,
      name: '',
    })
  },
  onRemarkChange(event) {
    this.setData({
      remark: event.detail
    })
  },
  onNameChange(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({
      name: event.detail
    })
  },
  onTeleChange(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    var ret = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!((event.detail.value).match(ret))) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 1000,
      })
    } else {
      this.setData({
        tele: event.detail.value
      })
    }
  },
  onAddressChange(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({
      address: event.detail
    })
  },
  submit() {
    if (this.data.name == '' || this.data.tele == '' || this.data.id == '' || this.data.address == '') {
      wx.showToast({
        title: '请完善发起人信息',
        icon: 'none',
        duration: 1000,
      })
    } else {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
      var value = this.data.value
      var t = this.data.garbageChooses;
      console.log(this.data.garbageChooses);
      var newGarbageChooses = new Array();
      for (var i = 0; i < t.length; i++) {
        if (t[i] != null && t[i].amount != 0) {
          delete t[i].garbage.category;
          delete t[i].garbage.name;
          delete t[i].garbage.score;
          delete t[i].garbage.type;
          delete t[i].garbage.unit;
          newGarbageChooses.push(t[i]);
        }
      }
      console.log(newGarbageChooses);
      var myBaseOrder = {
        name: this.data.name,
        phoneNumber: this.data.tele,
        address: this.data.address,
        province: '黑龙江省',
        city: '哈尔滨市',
        area: this.data.areas[value[0]].name,
        street: this.data.streets[value[1]].name,
        village: this.data.villages[value[2]].name,
        remark: this.data.remark,
        garbageChooses: newGarbageChooses,
      };
      var link = app.globalData.http + '/api/recycleFirm/addCROrder?id=' + this.data.id;
      var Token = wx.getStorageSync('token');
      var StringBaseOrder = JSON.stringify(myBaseOrder);
      console.log(StringBaseOrder);
      wx.request({
        url: link,
        method: 'POST',
        data: StringBaseOrder,
        header: {
          'Authorization': Token,
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.hideLoading();
          console.log(res.data)
          if (res.data.code == 200) {
            app.globalData.order.name = '';
            app.globalData.order.tele = '';
            app.globalData.order.id = '';
            app.globalData.order.area = '';
            app.globalData.order.street = '';
            app.globalData.order.village = '';
            app.globalData.order.areaInfo = '';
            app.globalData.order.address = '';
            app.globalData.garbageChooses = [];
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
            })
            setTimeout(function () {
              wx.switchTab({
                url: '../../Common/homePage/homePage',
              })
            }, 1500);
          } else {
            wx.showToast({
              title: '提交失败',
              icon: 'none',
              duration: 1500,
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.order.name != null) {
      this.setData({
        name: app.globalData.order.name,
        tele: app.globalData.order.tele,
        id: app.globalData.order.id,
        area:app.globalData.order.area,
        village:app.globalData.order.village,
        street:app.globalData.order.street,
        address: app.globalData.order.address,
        areaInfo:app.globalData.order.areaInfo,
        garbageChooses: app.globalData.garbageChooses
      })
    }
    /**地址选择器设置默认值 */
    var id = address.areas[0].id
    this.setData({
      areas: address.areas,
      streets: address.streets[id],
      villages: address.villages[address.streets[id][0].id],
    })
    //
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /**地址选择器需要 */
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    this.animation = animation
    //
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})