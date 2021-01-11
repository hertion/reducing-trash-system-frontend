// miniprogram/pages/farmerOrderDetail/farmerOrderDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: '',
    garbageChooses: [],
  },
  //给前端垃圾选择列表的空元素进行赋值
  isBuildChooseArray: function () {
    /**
     * 加载垃圾列表
     */
    var that = this;
    var link = app.globalData.http +'/api/user/getUnRecycleGarbage';
    var Token = wx.getStorageSync('token');
    //请求不可回垃圾
    wx.request({
      url: link,
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
          //制造订单数组
          for (var i = 0; i < a; i++) {
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
          for (var i = 0; i < b; i++) {
            var id = t.pesticide[i].id;
            if (that.data.garbageChooses[id] == null) {
              var index = "garbageChooses[" + id + "].garbage";
              var index2 = "garbageChooses[" + id + "].amount";
              var index3 = "garbageChooses[" + id + "].id";
              that.setData({
                [index]: t.pesticide[i],
                [index2]: 0,
              })
            }
          }
          console.log(that.data.garbageChooses);
          app.globalData.cdOrder.garbageChooses = that.data.garbageChooses;
        }
      },
      fail() {
        console.log("fail");
      }
    })
    //
  },
  gotoUnRecycle() {
    if (app.globalData.updateFlag == 0) {
      this.isBuildChooseArray();
    }
    wx.navigateTo({
      url: '../unRecycle/unRecycle?orderId=' + this.data.order.id,
    })
  },
  confirmOrder() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    var t = app.globalData.cdOrder.garbageChooses;
    var num = t.length;
    var list = new Array();
    for (var i = 1; i < num; i++) {
      if (t[i]!=null&&t[i].amount != 0) {
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
    var link = app.globalData.http +'/api/driver/checkCDOrder';
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
        if(res.data.code==200){
          app.globalData.updateFlag=0;
          console.log(res.data);
          wx.showToast({
            title: '确认成功',
            icon:'success',
            duration:1000,
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../../Common/homePage/homePage',
            })
          },1500);
        }
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    if (app.globalData.updateFlag == 0) {
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
            that.setData({
              order: res.data.data
            })
            app.globalData.order = res.data.data;
            app.globalData.cdOrder = res.data.data;
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
            app.globalData.cdOrder.garbageChooses = that.data.garbageChooses; //将后端垃圾选择列表转换格式并赋好值存入cdOrder前端垃圾选择列表
          }
        }
      })
    } else {
      this.setData({
        order: app.globalData.cdOrder
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