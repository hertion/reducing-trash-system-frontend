// miniprogram/pages/fcOrderDetail/fcOrderDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: '',
    updateFlag: 0,
    garbageChooses: [],
  },
  gotoUpdateGarbages() {
    wx.navigateTo({
      url: '../updateGarbages/updateGarbages',
    })
  },

  //给前端垃圾选择列表的空元素进行赋值
  isBuildChooseArray: function () {
    /**
     * 加载垃圾列表
     */
    var that = this;
    var link = app.globalData.http +'/api/user/getRecycleGarbage';
    var link2 = app.globalData.http +'/api/user/getUnRecycleGarbage';
    var link3 =app.globalData.http + '/api/user/getSoilGarbage';
    var Token = wx.getStorageSync('token');
    //请求可回垃圾
    wx.request({
      url: link,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          //正式开发环境从此开始：
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
            if (that.data.garbageChooses[id] == null) {
              var index = "garbageChooses[" + id + "].garbage";
              var index2 = "garbageChooses[" + id + "].amount";
              var index3 = "garbageChooses[" + id + "].id";
              that.setData({
                [index]: t.plastic[i],
                [index2]: 0,
              })
            }
          }
          for (var i = 0; i < b; i++) {
            var id = t.glass[i].id;
            if (that.data.garbageChooses[id] == null) {
              var index = "garbageChooses[" + id + "].garbage";
              var index2 = "garbageChooses[" + id + "].amount";
              var index3 = "garbageChooses[" + id + "].id";
              that.setData({
                [index]: t.glass[i],
                [index2]: 0,
              })
            }
          }
          for (var i = 0; i < c; i++) {
            var id = t.paper[i].id;
            if (that.data.garbageChooses[id] == null) {
              var index = "garbageChooses[" + id + "].garbage";
              var index2 = "garbageChooses[" + id + "].amount";
              var index3 = "garbageChooses[" + id + "].id";
              that.setData({
                [index]: t.paper[i],
                [index2]: 0,
              })
            }
          }
          for (var i = 0; i < d; i++) {
            var id = t.metal[i].id;
            if (that.data.garbageChooses[id] == null) {
              var index = "garbageChooses[" + id + "].garbage";
              var index2 = "garbageChooses[" + id + "].amount";
              var index3 = "garbageChooses[" + id + "].id";
              that.setData({
                [index]: t.metal[i],
                [index2]: 0,
              })
            }
          }
          for (var i = 0; i < e; i++) {
            var id = t.weave[i].id;
            if (that.data.garbageChooses[id] == null) {
              var index = "garbageChooses[" + id + "].garbage";
              var index2 = "garbageChooses[" + id + "].amount";
              var index3 = "garbageChooses[" + id + "].id";
              that.setData({
                [index]: t.weave[i],
                [index2]: 0,
              })
            }
          }
          app.globalData.fcOrder.garbageChooses = that.data.garbageChooses;
          console.log(that.data.garbageChooses);
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
            if (that.data.garbageChooses[id] == null) {
              var index = "garbageChooses[" + id + "].garbage";
              var index2 = "garbageChooses[" + id + "].amount";
              that.setData({
                [index]: t.metal[i],
                [index2]: 0,
              })
            }
          }
          for (var i = 0; i < b; i++) {
            var id = t.pesticide[i].id;
            if (that.data.garbageChooses[id] == null) {
              var index = "garbageChooses[" + id + "].garbage";
              var index2 = "garbageChooses[" + id + "].amount";
              that.setData({
                [index]: t.pesticide[i],
                [index2]: 0,
              })
            }
          }
          for (var i = 0; i < c; i++) {
            var id = t.kitchen[i].id;
            if (that.data.garbageChooses[id] == null){
              var index = "garbageChooses[" + id + "].garbage";
            var index2 = "garbageChooses[" + id + "].amount";
            that.setData({
              [index]: t.kitchen[i],
              [index2]: 0,
            })
            }
          }
          console.log(that.data.garbageChooses);
          app.globalData.fcOrder.garbageChooses = that.data.garbageChooses;
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
          app.globalData.soil = res.data.data.soil
          var t = res.data.data.soil;
          console.log(t);
          var a = t.soil.length;
          //制造订单数组
          for (var i = 0; i < a; i++) {
            var id = t.soil[i].id;
            if (that.data.garbageChooses[id] == null) {
              var index = "garbageChooses[" + id + "].garbage";
              var index2 = "garbageChooses[" + id + "].amount";
              var index3 = "garbageChooses[" + id + "].id";
              that.setData({
                [index]: t.soil[i],
                [index2]: 0,
              })
            }
          }
          app.globalData.fcOrder.garbageChooses = that.data.garbageChooses;
          console.log(that.data.garbageChooses);
        }
      },
      fail() {
        console.log("fail");
        is
      }
    })
    //
  },

  gotoRecycle() {
    if (app.globalData.updateFlag == 0) {
      this.isBuildChooseArray();
    }
    wx.navigateTo({
      url: '../recycle/recycle?orderId=' + this.data.order.id+'&orderKey=fc',
    })
  },
  gotoUnRecycle() {
    if (app.globalData.updateFlag == 0) {
      this.isBuildChooseArray();
    }
    wx.navigateTo({
      url: '../unRecycle/unRecycle?orderId=' + this.data.order.id+'&orderKey=fc',
    })
  },
  gotoSoil() {
    if (app.globalData.updateFlag == 0) {
      this.isBuildChooseArray();
    }
    wx.navigateTo({
      url: '../soil/soil?orderId=' + this.data.order.id+'&orderKey=fc',
    })
  },
  confirmOrder() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    var t = app.globalData.fcOrder.garbageChooses;
    var num = t.length;
    var list = new Array();
    for (var i = 1; i < num; i++) {
      if (t[i] != null && t[i].amount != 0) {
        delete t[i].type;
        delete t[i].garbage.category;
        delete t[i].garbage.name;
        delete t[i].garbage.score;
        delete t[i].garbage.type;
        delete t[i].garbage.unit;
        list.push(t[i])
      }
    }
    var order = {
      id: this.data.order.id,
      garbageChooses: list
    }
    console.log(order);
    var StringOrder = JSON.stringify(order);
    console.log(StringOrder);
    var link = app.globalData.http +'/api/cleaner/checkFCOrder';
    var Token = wx.getStorageSync('token');
    wx.request({
      url: link,
      method: 'POST',
      data: StringOrder,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code == 200) {
          app.globalData.updateFlag = 0;
          console.log(res.data);
          wx.showToast({
            title: '确认成功',
            icon: 'success',
            duration: 1000,
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '../fcOrder/fcOrder',
            })
          }, 1500);
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.globalData.updateFlag);
    if (app.globalData.updateFlag == 0) {
      var id = options.id;
      var price = options.price
      var link = app.globalData.http +'/api/cleaner/getBaseOrderById?id=' + id;
      var Token = wx.getStorageSync('token');
      wx.request({
        url: link,
        header: {
          'Authorization': Token,
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data);
          if (res.data.code == 200) {
            var time = res.data.data.insertTime;
            time = time.replace("T"," ");
            res.data.data.insertTime = time;
            res.data.data.price=price;
            that.setData({
              order: res.data.data,
            })
            app.globalData.order = res.data.data;
            app.globalData.fcOrder = res.data.data;
            var garbageChoosed = res.data.data.garbageChooses;
            var num = garbageChoosed.length;
            for (var i = 0; i < num; i++) {
              var id = garbageChoosed[i].garbage.id;
              var index = "garbageChooses[" + id + "].garbage";
              var index2 = "garbageChooses[" + id + "].amount";
              var index3 = "garbageChooses[" + id + "].id";
              that.setData({
                [index]: garbageChoosed[i].garbage,
                [index2]: garbageChoosed[i].amount,
                [index3]: garbageChoosed[i].id,
              })
            }
            console.log(that.data.garbageChooses);
            app.globalData.fcOrder.garbageChooses = that.data.garbageChooses; //将后端垃圾选择列表转换格式并赋好值存入fcOrder前端垃圾选择列表
          }

        }
      })
    } else {
      this.setData({
        order: app.globalData.fcOrder
      })
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