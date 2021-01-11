// miniprogram/pages/Admin/garbageManage/soilManage/soilManage.js
var app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recycleGarbage:'',
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
    var link = app.globalData.http + '/api/user/getSoilGarbage';
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
          that.setData({
            recycleGarbage: res.data.data.soil
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