// miniprogram/pages/Cleaner/cfAppointment/cfAppointment.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1: false, //司机弹出层开关
    show2: false, //可回收公司弹出层开关
    remark: '',
    price: 0,
    score: 0,
    name: '',
    tele: '',
    province:'',
    city:'',
    area: '',
    village: '',
    street: '',
    address: '',
    areaInfo: '',
    drivers: [],
    driverName: '',
    driverId: '',
    firms: [],
    firmName: '回收企业姓名',
    firmId: 5,
    garbageChooses: [],
    driverNames: [],
    firmNames: [],
  },
  //司机选择器
  onDriverConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    var driverId = this.data.drivers[index].id;
    console.log(driverId);
    this.setData({
      driverName: value,
      show1: false,
      driverId: driverId
    });
  },
  onDriverCancel() {
    this.setData({
      show1: false
    });
  },
  showPopup1() {
    this.setData({
      show1: true,
      show2: false,
    });
  },
  //可回收企业选择器
  onFirmConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    var firmId = this.data.firms[index].id;
    console.log(firmId);
    this.setData({
      firmName: value,
      show2: false,
      firmId: firmId
    });
  },
  onFirmCancel() {
    this.setData({
      show2: false
    });
  },
  showPopup2() {
    this.setData({
      show1: false,
      show2: true,
    });
  },

  gotoAddressManage() {
    wx.navigateTo({
      url: 'addressManage/addressManage',
    })
  },
  gotoRecycle() {
    app.globalData.driverId=this.data.driverId
    app.globalData.driverName=this.data.driverName
    app.globalData.firmId=this.data.firmId
    app.globalData.firmName=this.data.firmName
    app.globalData.remark=this.data.remark
    wx.navigateTo({
      url: 'recycle/recycle',
    })
  },
  onRemarkChange(event){
    this.setData({
      remark:event.detail
    })
  },
    submit() {
      var t =this.data;
      var g = this.data.garbageChooses;
      var flag=0;
      for (var i = 0; i < g.length; i++) {
        if (g[i] != null && g[i].amount != 0) {
          flag=1;
        }
      }
    if(t.driverId==''||t.firmName==''||t.name==''||t.village==''||flag==0||t.tele==''){
      wx.showToast({
        title: '请完善订单信息',
        icon:'none',
        duration:1000
      })
    }else{
      var that = this;
      var Token = app.getToken();
    var link = app.globalData.http + '/api/cleaner/record/CROrder';
    var t = this.data.garbageChooses;
    console.log(this.data.garbageChooses);
    var newGarbageChooses = new Array();
    for (var i = 0; i < t.length; i++) {
      if (t[i] != null && t[i].amount != 0) {
        var m = {
          amount:'',
          garbage:{
            id:''
          }
        }
        m.amount = t[i].amount;
        m.garbage.id=t[i].garbage.id;
        newGarbageChooses.push(m);
      }
    }
    console.log(newGarbageChooses);
    var myBaseOrder = {
      address: this.data.address,
      province:this.data.province,
      city:this.data.city,
      area:this.data.area,
      street:this.data.street,
      village:this.data.village,
      remark: this.data.remark,
      name: this.data.name,
      phoneNumber: this.data.tele,
      garbageChooses:newGarbageChooses
    }
    console.log(myBaseOrder);
    // var firm = {
    //   id: this.data.firmId
    // }
    var firm = this.data.firmName
    var driver = {
      id: this.data.driverId
    }
    var data = {
      baseOrder:myBaseOrder,
      company:firm,
      recycleDriver:driver
    }
    console.log(data);
    wx.request({
      url: link,
      method: 'POST',
      data:JSON.stringify(data),
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': Token
      },
      success(res) {
        if (res.data.code == 200) {
          that.setData({
            driverName:'',
            driverId:'',
            firmName:'',
            firmId:'',
            remark:'',
            garbageChooses:[],
            score:0,
            price:0
          })
          app.globalData.garbageChooses=[];
          app.globalData.score=0;
          app.globalData.price=0;
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000,
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../../Common/homePage/homePage',
            })
          }, 1000);
        } else {
          wx.showToast({
            title: '提交失败',
            icon: "none",
            duration: 1000,
          })
        }
      },
      fail(res) {
        wx.hideLoading();
        wx.showToast({
          title: '提交失败',
          icon: "none",
          duration: 2000,
        })
      }
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.user.id) {
      var u = app.globalData.user
    } else {
      var u = app.getUser();
      app.globalData.user = u;
    }
    console.log(u);
    this.setData({
      name: u.name,
      tele: u.phoneNumber,
      address: u.address,
      province:u.province,
      city:u.city,
      area: u.area,
      street: u.street,
      village: u.village,
      areaInfo: "黑龙江省 哈尔滨市" + u.area + " " + u.street + " " + u.village,
      garbageChooses: app.globalData.garbageChooses,
      driverName:app.globalData.driverName,
      driverId:app.globalData.driverId,
      firmName:app.globalData.firmName,
      firmId:app.globalData.firmId,
      remark: app.globalData.remark,
      price: app.globalData.price,
      score: app.globalData.score
    })
    var that = this;
    var link = app.globalData.http + '/api/cleaner/list/recycleFirm';
    var Token = app.getToken();
    wx.request({
      url: link,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': Token
      },
      success(res) {
        if (res.data.code == 200) {
          var firms = res.data.data;
          var firmNames = [];
          for (var i = 0; i < firms.length; i++) {
            firmNames.push(firms[i].name)
          }
          that.setData({
            firms: firms,
            firmNames: firmNames
          })
        }
      }
    })
    var link2 = app.globalData.http + '/api/cleaner/list/recycleDriver';
    var Token = app.getToken();
    wx.request({
      url: link2,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': Token
      },
      success(res) {
        if (res.data.code == 200) {
          var drivers = res.data.data;
          var driverNames = [];
          for (var i = 0; i < drivers.length; i++) {
            driverNames.push(drivers[i].name)
          }
          that.setData({
            drivers: drivers,
            driverNames: driverNames
          })
        }
      }
    })
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