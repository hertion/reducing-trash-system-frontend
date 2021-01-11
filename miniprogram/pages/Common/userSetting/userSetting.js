// miniprogram/pages/userSetting/userSetting.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    myCleaner: '',
    phoneNumber:''
  },
  gotoUpdatePassword(){
    wx.navigateTo({
      url: '../updatePassword/updatePassword',
    })
  },
  logOut() {
    app.globalData.token = null;
    app.globalData.user = null;
    wx.setStorageSync('token', null);
    wx.setStorageSync('user', null);
    wx.reLaunch({
      url: '../login2/login2',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user =  wx.getStorageSync('user')
    this.setData({
      user: user
    })
    if(user.role=='FARMER'){
      var that = this;
    var link = app.globalData.http +"/api/farmer/getCleaner";
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
          that.setData({
            myCleaner: res.data.data.name,
            phoneNumber:res.data.data.phoneNumber
          })
        }
      }
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