// miniprogram/pages/Admin/new/new.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      url: 'detail/detail?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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