// miniprogram/pages/Admin/garbageManage/recycleManage/recycleManage.js
var app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recycleGarbage:'',
    garbageVariety:[]
  },
  gotoUpdate(event){
    var id = event.currentTarget.dataset.garbageid;
    wx.navigateTo({
      url: '../update/update?id='+id,
    })
  },
  add(){
    wx.navigateTo({
      url: '../add/add',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var link = app.globalData.http + '/api/user/getRecycleGarbage';
    var Token = wx.getStorageSync('token');
    wx.request({
      url: link,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      success(res){
        if(res.data.code==200){
          console.log(res.data.data)
          var obj = res.data.data.recycleGarbage;
          that.setData({
            recycleGarbage: res.data.data.recycleGarbage
          })
          // var variety = [];
          // for(var key in obj){
          //   variety.push(key);
          // }
          // console.log(variety);
          // that.setData({
          //   garbageVariety:variety
          // })
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
    // var that  = this;
    // db.collection('garbage').doc('21ded5cb5ff6b6bb041d0adb7553f8e9').get({
    //   success: function(res) {
    //     // res.data 包含该记录的数据
    //     console.log(res.data.garbages)
    //     app.globalData.categorys=res.data.garbages
    //   }
    // })
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