// miniprogram/pages/Common/welcome/welcome.js
var app = getApp()
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  gotoGuide(){
    wx.navigateTo({
      url: '../guide/guide',
    })
  },
  gotoStore() {
    wx.navigateTo({
      url: '../store/store',
    })
  },
  gotoFarmerAppoint(){
    wx.navigateTo({
      url: '../login2/login2',
    })
  },
  gotoLogin(){
    wx.navigateTo({
      url: '../login2/login2',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'token',
      success(res) {
        if(res.data!=null){
          console.log("登录成功")
          console.log(res)
          wx.switchTab({
            url: '../homePage/homePage',
          })
        }
      }
    })
    var that  = this;
    db.collection('http').where({
      _id:"85ff8afa5fe4a087008ea8ff32048305"
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data[0].ip)
        that.globalData.http=res.data[0].ip
        console.log(that.globalData.http)
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