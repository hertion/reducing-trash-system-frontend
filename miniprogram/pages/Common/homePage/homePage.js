// miniprogram/pages/farmerHomePage/farmerHomePage.js
var app = getApp()
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    garbageChooses: [],
    score: 0,
    times: 0,
    unFinishedList: [],
    news:[],
  },
  gotoAddNew() {
    wx.navigateTo({
      url: 'add/add',
    })
  },
  gotoNewDetail(event) {
    var id =  event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../Admin/new/detail/detail?id='+id,
    })
  },
  gotoNew1(){
    wx.navigateTo({
      url: '../new1/new1',
    })
  },
  gotoNew2(){
    wx.navigateTo({
      url: '../new2/new2',
    })
  },
  gotoNew3(){
    wx.navigateTo({
      url: '../new3/new3',
    })
  },
  /**保洁员、农户公用方法 */
  gotoStore() {
    wx.navigateTo({
      url: '../../Common/store/store',
    })
  },
  /**保洁员方法 */
  gotoFCOrder() {
    wx.navigateTo({
      url: '../../Cleaner/fcOrder/fcOrder',
    })
  },
  gotoFCOrder2(){
     /**
     * 加载垃圾列表
     */
    var that = this;
    var link = app.globalData.http + '/api/user/getRecycleGarbage';
    var link2 = app.globalData.http + '/api/user/getUnRecycleGarbage';
    var link3 = app.globalData.http + '/api/user/getSoilGarbage';
    var Token = wx.getStorageSync('token');
    //请求可回垃圾
    wx.request({
      url: link,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //正式开发环境从此开始：
        if (res.data.code == 200) {
          app.globalData.recycleGarbage = res.data.data.recycleGarbage
          // that.setData({
          //   recycleGarbage: res.data.data.recycleGarbage
          // })
          var t = res.data.data.recycleGarbage;
          console.log(t);
          var a = res.data.data.recycleGarbage.plastic.length;
          var b = res.data.data.recycleGarbage.glass.length;
          var c = res.data.data.recycleGarbage.paper.length;
          var d = res.data.data.recycleGarbage.metal.length;
          var e = res.data.data.recycleGarbage.weave.length;
          var garbageNum = a + b + c + d + e;
          console.log(garbageNum);
          //制造订单数组
          for (var i = 0; i < a; i++) {
            var id = t.plastic[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.plastic[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          for (var i = 0; i < b; i++) {
            var id = t.glass[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.glass[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          for (var i = 0; i < c; i++) {
            var id = t.paper[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.paper[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          for (var i = 0; i < d; i++) {
            var id = t.metal[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.metal[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          for (var i = 0; i < e; i++) {
            var id = t.weave[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.weave[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          app.globalData.fcOrder.garbageChooses = that.data.garbageChooses;
        }
      },
      fail() {
        console.log("fail");
      }
    })
    //请求不可回垃圾
    wx.request({
      url: link2,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          //正式开发环境从此开始：
          app.globalData.unRecycleGarbage = res.data.data.unRecycleGarbage
          // that.setData({
          //   recycleGarbage: res.data.data.recycleGarbage
          // })
          var t = res.data.data.unRecycleGarbage;
          console.log(t);
          var a = t.metal.length;
          var b = t.pesticide.length;
          var c = t.kitchen.length;
          //制造订单数组

          for (var i = 0; i < a; i++) {
            var id = t.metal[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.metal[i],
              [index2]: 0,
              [index3]: 'unRecycle',
            })
          }
          for (var i = 0; i < b; i++) {
            var id = t.pesticide[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.pesticide[i],
              [index2]: 0,
              [index3]: 'unRecycle',
            })
          }
          for (var i = 0; i < c; i++) {
            var id = t.kitchen[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.kitchen[i],
              [index2]: 0,
              [index3]: 'unRecycle',
            })
          }
          app.globalData.fcOrder.garbageChooses = that.data.garbageChooses;
          // console.log(that.data.unReGarbageChooses);
        }
      },
      fail() {
        console.log("fail");
      }
    })
    //请求就地回收垃圾煤渣
    wx.request({
      url: link3,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          //正式开发环境从此开始：
          app.globalData.soil = res.data.data.soil
          // that.setData({
          //   recycleGarbage: res.data.data.recycleGarbage
          // })
          var t = res.data.data.soil;
          console.log(t);
          var a = t.soil.length;
          //制造订单数组
          for (var i = 0; i < a; i++) {
            var id = t.soil[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.soil[i],
              [index2]: 0,
              [index3]: 'soil',
            })
          }
          app.globalData.fcOrder.garbageChooses = that.data.garbageChooses;
          console.log(that.data.garbageChooses);
        }
      },
      fail() {
        console.log("fail");
      }
    })
    //
    wx.navigateTo({
      url: '../../Cleaner/cfAppointment/cfAppointment',
    })
  },
  gotoCRAppointment(){
      /**
     * 加载垃圾列表
     */
    var that = this;
    var link = app.globalData.http + '/api/user/getRecycleGarbage';
    var Token = app.getToken();
    //请求可回垃圾
    wx.request({
      url: link,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //正式开发环境从此开始：
        if (res.data.code == 200) {
          app.globalData.recycleGarbage = res.data.data.recycleGarbage
          var t = res.data.data.recycleGarbage;
          console.log(t);
          var a =t.plastic.length;
          var b = t.glass.length;
          var c = t.paper.length;
          var d = t.metal.length;
          var e = t.weave.length;
          var garbageNum = a + b + c + d + e;
          console.log(garbageNum);
          //制造订单数组
          for (var i = 0; i < a; i++) {
            var id = t.plastic[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.plastic[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          for (var i = 0; i < b; i++) {
            var id = t.glass[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.glass[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          for (var i = 0; i < c; i++) {
            var id = t.paper[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.paper[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          for (var i = 0; i < d; i++) {
            var id = t.metal[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.metal[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          for (var i = 0; i < e; i++) {
            var id = t.weave[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.weave[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          app.globalData.garbageChooses = that.data.garbageChooses;
        }
      },
      fail() {
        console.log("fail");
      }
    })
    wx.navigateTo({
      url: '../../Cleaner/crAppointment/crAppointment',
    })
  },
  gotoCDAppointment() {
    var that = this;
    // var link2 = app.globalData.http + '/api/user/getUnRecycleGarbage';
    // var Token = wx.getStorageSync('token');
    // //请求不可回垃圾
    // wx.request({
    //   url: link2,
    //   header: {
    //     'Authorization': Token,
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     if (res.data.code == 200) {
    //       //正式开发环境从此开始：
    //       app.globalData.unRecycleGarbage = res.data.data.unRecycleGarbage
    //       // that.setData({
    //       //   recycleGarbage: res.data.data.recycleGarbage
    //       // })
    //       var t = res.data.data.unRecycleGarbage;
    //       console.log(t);
    //       var a = t.metal.length;
    //       var b = t.pesticide.length;
    //       //制造订单数组
    //       for (var i = 0; i < a; i++) {
    //         var id = t.metal[i].id;
    //         // if (that.data.garbageChooses[id] == null) {
    //         var index = "garbageChooses[" + id + "].garbage";
    //         var index2 = "garbageChooses[" + id + "].amount";
    //         var index3 = "garbageChooses[" + id + "].id";
    //         that.setData({
    //           [index]: t.metal[i],
    //           [index2]: 0,
    //         })
    //         // }
    //       }
    //       for (var i = 0; i < b; i++) {
    //         var id = t.pesticide[i].id;
    //         // if (that.data.garbageChooses[id] == null) {
    //         var index = "garbageChooses[" + id + "].garbage";
    //         var index2 = "garbageChooses[" + id + "].amount";
    //         var index3 = "garbageChooses[" + id + "].id";
    //         that.setData({
    //           [index]: t.pesticide[i],
    //           [index2]: 0,
    //         })
    //         // }
    //       }
    //       console.log(that.data.garbageChooses);
    //       app.globalData.cdGarbageChooses = that.data.garbageChooses;
    //     }
    //   },
    //   fail() {
    //     console.log("fail");
    //   }
    // })
    wx.navigateTo({
      url: '../../Cleaner/cd2Appointment/cd2Appointment',
    })
  },
  gotoCleanerRank() {
    wx.navigateTo({
      url: '../../Cleaner/rank/rank',
    })
  },
  /**农户方法 */
  gotoGuide(){
    wx.navigateTo({
      url: '../guide/guide',
    })
  },
  gotoFarmerAppoint: function () {
    /**
     * 加载垃圾列表
     */
    var that = this;
    var link = app.globalData.http + '/api/user/getRecycleGarbage';
    var link2 = app.globalData.http + '/api/user/getUnRecycleGarbage';
    var link3 = app.globalData.http + '/api/user/getSoilGarbage';
    var Token = wx.getStorageSync('token');
    //请求可回垃圾
    wx.request({
      url: link,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //正式开发环境从此开始：
        if (res.data.code == 200) {
          app.globalData.recycleGarbage = res.data.data.recycleGarbage
          // that.setData({
          //   recycleGarbage: res.data.data.recycleGarbage
          // })
          var t = res.data.data.recycleGarbage;
          console.log(t);
          var a = res.data.data.recycleGarbage.plastic.length;
          var b = res.data.data.recycleGarbage.glass.length;
          var c = res.data.data.recycleGarbage.paper.length;
          var d = res.data.data.recycleGarbage.metal.length;
          var e = res.data.data.recycleGarbage.weave.length;
          var garbageNum = a + b + c + d + e;
          console.log(garbageNum);
          //制造订单数组
          for (var i = 0; i < a; i++) {
            var id = t.plastic[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.plastic[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          for (var i = 0; i < b; i++) {
            var id = t.glass[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.glass[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          for (var i = 0; i < c; i++) {
            var id = t.paper[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.paper[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          for (var i = 0; i < d; i++) {
            var id = t.metal[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.metal[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          for (var i = 0; i < e; i++) {
            var id = t.weave[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.weave[i],
              [index2]: 0,
              [index3]: 'recycle',
            })
          }
          app.globalData.garbageChooses = that.data.garbageChooses;
        }
      },
      fail() {
        console.log("fail");
      }
    })
    //请求不可回垃圾
    wx.request({
      url: link2,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          //正式开发环境从此开始：
          app.globalData.unRecycleGarbage = res.data.data.unRecycleGarbage
          // that.setData({
          //   recycleGarbage: res.data.data.recycleGarbage
          // })
          var t = res.data.data.unRecycleGarbage;
          console.log(t);
          var a = t.metal.length;
          var b = t.pesticide.length;
          var c = t.kitchen.length;
          //制造订单数组

          for (var i = 0; i < a; i++) {
            var id = t.metal[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.metal[i],
              [index2]: 0,
              [index3]: 'unRecycle',
            })
          }
          for (var i = 0; i < b; i++) {
            var id = t.pesticide[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.pesticide[i],
              [index2]: 0,
              [index3]: 'unRecycle',
            })
          }
          for (var i = 0; i < c; i++) {
            var id = t.kitchen[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.kitchen[i],
              [index2]: 0,
              [index3]: 'unRecycle',
            })
          }
          app.globalData.garbageChooses = that.data.garbageChooses;
          // console.log(that.data.unReGarbageChooses);
        }
      },
      fail() {
        console.log("fail");
      }
    })
    //请求就地回收垃圾煤渣
    wx.request({
      url: link3,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          //正式开发环境从此开始：
          app.globalData.soil = res.data.data.soil
          // that.setData({
          //   recycleGarbage: res.data.data.recycleGarbage
          // })
          var t = res.data.data.soil;
          console.log(t);
          var a = t.soil.length;
          //制造订单数组
          for (var i = 0; i < a; i++) {
            var id = t.soil[i].id;
            var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            var index3 = "garbageChooses[" + id + "].type";
            that.setData({
              [index]: t.soil[i],
              [index2]: 0,
              [index3]: 'soil',
            })
          }
          app.globalData.garbageChooses = that.data.garbageChooses;
          console.log(that.data.garbageChooses);
        }
      },
      fail() {
        console.log("fail");
      }
    })
    //
    wx.navigateTo({
      url: '../../Farmer/farmerAppointment/farmerAppointment',
    })
  },
  gotoFarmerRank() {
    wx.navigateTo({
      url: '../../Farmer/rank/rank',
    })
  },
  /** 司机方法*/
  gotoOrderDetail(event) {
    var id = event.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../../Driver/driverOrderDetail/driverOrderDetail?id=' + id,
    })
  },
  gotoDriverAppointment(){
    wx.navigateTo({
      url: '../../Driver/driverAppointment/driverAppointment',
    })
  },
  /**可回收公司方法 */
  gotoAppointment() {
    var that = this;
    // var link = app.globalData.http + '/api/user/getRecycleGarbage';
    // var Token = wx.getStorageSync('token');
    // wx.request({
    //   url: link,
    //   header: {
    //     'Authorization': Token,
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     if (res.data.code == 200) {
    //       //正式开发环境从此开始：
    //       app.globalData.recycleGarbage = res.data.data.recycleGarbage
    //       // that.setData({
    //       //   recycleGarbage: res.data.data.recycleGarbage
    //       // })
    //       var t = res.data.data.recycleGarbage;
    //       console.log(t);
    //       var a = res.data.data.recycleGarbage.plastic.length;
    //       var b = res.data.data.recycleGarbage.glass.length;
    //       var c = res.data.data.recycleGarbage.paper.length;
    //       var d = res.data.data.recycleGarbage.metal.length;
    //       var e = res.data.data.recycleGarbage.weave.length;
    //       var garbageNum = a + b + c + d + e;
    //       console.log(garbageNum);
    //       //制造订单数组
    //       for (var i = 0; i < a; i++) {
    //         var id = t.plastic[i].id;
    //         var index = "garbageChooses[" + id + "].garbage";
    //         var index2 = "garbageChooses[" + id + "].amount";
    //         that.setData({
    //           [index]: t.plastic[i],
    //           [index2]: 0,
    //         })
    //       }
    //       for (var i = 0; i < b; i++) {
    //         var id = t.glass[i].id;
    //         var index = "garbageChooses[" + id + "].garbage";
    //         var index2 = "garbageChooses[" + id + "].amount";
    //         that.setData({
    //           [index]: t.glass[i],
    //           [index2]: 0,
    //         })
    //       }
    //       for (var i = 0; i < c; i++) {
    //         var id = t.paper[i].id;
    //         var index = "garbageChooses[" + id + "].garbage";
    //         var index2 = "garbageChooses[" + id + "].amount";
    //         that.setData({
    //           [index]: t.paper[i],
    //           [index2]: 0,
    //         })
    //       }
    //       for (var i = 0; i < d; i++) {
    //         var id = t.metal[i].id;
    //         var index = "garbageChooses[" + id + "].garbage";
    //         var index2 = "garbageChooses[" + id + "].amount";
    //         that.setData({
    //           [index]: t.metal[i],
    //           [index2]: 0,
    //         })
    //       }
    //       for (var i = 0; i < e; i++) {
    //         var id = t.weave[i].id;
    //         var index = "garbageChooses[" + id + "].garbage";
    //         var index2 = "garbageChooses[" + id + "].amount";
    //         that.setData({
    //           [index]: t.weave[i],
    //           [index2]: 0,
    //         })
    //       }
    //       app.globalData.garbageChooses = that.data.garbageChooses;
    //       console.log(that.data.garbageChooses);
    //     }
    //   },
    //   fail() {
    //     console.log("fail");
    //   }
    // })
     wx.navigateTo({
      url: '../../RecycleCompany/crOrder/crOrder',
    })
  },
  /**中转站方法 */
  gotoDTAppointment() {
    wx.navigateTo({
      url: '../../TransforStation/dtAppointment/dtAppointment',
    })
  },
  /**管理员方法 */
  gotoUserManage() {
    wx.navigateTo({
      url: '../../Admin/userManage/userManage'
    })
  },
  gotoGarbageManage(){
    wx.navigateTo({
      url: '../../Admin/garbageManage/garbageManage',
    })
  }  ,
  gotoNew(){
    wx.navigateTo({
      url: '../../Admin/new/new',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.http == '') {
      var that = this;
      db.collection('http').where({
          _id: "85ff8afa5fe4a087008ea8ff32048305"
        })
        .get({
          success: function (res) {
            // res.data 是包含以上定义的两条记录的数组
            console.log(res.data[0].ip)
            that.globalData.http = res.data[0].ip
            console.log(that.globalData.http)
            //分开！
            var user = wx.getStorageSync('user')
            this.setData({
              user: user
            })
            var that = this;
            var userRole = user.role.toLowerCase();
            var link2 = app.globalData.http + '/api/' + userRole + '/getOrderInfo';
            var Token = wx.getStorageSync('token');
            if (user.role == 'FARMER' || user.role == 'CLEANER') {
              wx.request({
                url: link2,
                header: {
                  'Authorization': Token,
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  if (res.data.code == 200) {
                    that.setData({
                      score: res.data.data[0].score,
                      times: res.data.data[1].times,
                    })
                  }
                },
                fail() {
                  console.log("fail");
                }
              })
            }
            var link = app.globalData.http + '/api/driver/getCDOrder/Checking';
            var data = {
              col: "none"
            }
            if (user.role == 'DRIVER') {
              wx.request({
                url: link,
                header: {
                  'Authorization': Token,
                  'content-type': 'application/json' // 默认值
                },
                method: 'POST',
                data: data,
                success(res) {
                  console.log(res.data);
                  if (res.data.code == 200) {
                    that.setData({
                      unFinishedList: res.data.data
                    })
                  }
                }
              });
            }
          }
        })
    } else {
      var user = wx.getStorageSync('user')
      this.setData({
        user: user
      })
      var that = this;
      //新闻
      var link = app.globalData.http + "/api/user/list/news?limit=15";
    var Token = app.getToken();
    wx.request({
      url: link,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': Token
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data)
          var t = res.data.data
          for(var i=0;i<t.length;i++){
            t[i].time = (t[i].time).replace("T"," ");
          }
          that.setData({
            news: t,
          })
        }
      }
    })
      //
      var userRole = user.role.toLowerCase();
      var link2 = app.globalData.http + '/api/' + userRole + '/getOrderInfo';
      var Token = wx.getStorageSync('token');
      if (user.role == 'FARMER' || user.role == 'CLEANER') {
        wx.request({
          url: link2,
          header: {
            'Authorization': Token,
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            if (res.data.code == 200) {
              that.setData({
                score: res.data.data[0].score,
                times: res.data.data[1].times,
              })
            }
          },
          fail() {
            console.log("fail");
          }
        })
      }
      var link = app.globalData.http + '/api/driver/getCDOrder/Checking';
      var data = {
        col: "none"
      }
      if (user.role == 'DRIVER') {
        wx.request({
          url: link,
          header: {
            'Authorization': Token,
            'content-type': 'application/json' // 默认值
          },
          method: 'POST',
          data: data,
          success(res) {
            console.log(res.data);
            if (res.data.code == 200) {
              that.setData({
                unFinishedList: res.data.data
              })
            }
          }
        });
      }
    }


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
    if (wx.getStorageSync('user').role == 'DRIVER') {
      this.onLoad();
    }
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