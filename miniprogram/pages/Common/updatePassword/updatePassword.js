// miniprogram/pages/updatePassword/updatePassword.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tele: '',
    password1: '',
    password2: '',

  },
  onTeleChange(event) {
    this.setData({
      tele: event.detail
    })
  },
  onPassword1Change(event) {
    this.setData({
      password1: event.detail
    })
  },
  onPassword2Change(event) {
    this.setData({
      password2: event.detail
    })
  },
  checkPassword(event) {
    console.log("hello");
    console.log(event.detail.value);
    console.log(this.data.password1);
    if (event.detail.value != this.data.password1) {
      wx.showToast({
        title: '您两次输入的密码不一致',
        icon: 'none',
        duration: 1500,
      })
    }
  },
  bindsubmit() {
    if (this.data.tele == '') {
      wx.showToast({
        title: '您的用户名不可以为空',
        icon: 'none',
        duration: 1500,
      })
      return;
    } else if (this.data.password2 != this.data.password1) {
      wx.showToast({
        title: '您两次输入的密码不一致',
        icon: 'none',
        duration: 1500,
      })
      return;
    } else {
      var that = this;
      var link = app.globalData.http + "/api/user/updatePsw?password=" + this.data.password2;
      var token = app.getToken()
      wx.request({
        url: link,
        method:'POST',
        data:null,
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': token,
        },
        success(res) {
          console.log(res.data)
          if(res.data.code==200){
              wx.showToast({
                title: '修改成功',
                icon:'success',
                duration:1000,
              })
              setTimeout(function(){
                wx.showToast({
                  title: '请重新登录',
                  icon:'none',
                  duration:1000,
                })
              },1000);
              setTimeout(function(){
                app.globalData.token = null;
                app.globalData.user = null;
                wx.setStorageSync('token', null);
                wx.setStorageSync('user', null);
                wx.reLaunch({
                  url: '../login2/login2',
                })
              },2000);
          }
          if(res.data.code==500){
            wx.showToast({
              title: '新密码与原密码一致',
              icon:'none',
              duration:1000,
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
    var user = wx.getStorageSync('user');
    console.log(user.phoneNumber);
this.setData({
  tele:user.phoneNumber
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