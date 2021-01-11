// miniprogram/pages/cleanerManage/transfer/transfer.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cleanerId: '',
    newCleanerId: '',
    newCleaner: '',
    results: []
  },
  onIdChange(event) {
    this.setData({
      newCleanerId: event.detail
    })
    if (event.detail == '') {
      this.setData({
        newCleaner: ''
      })
    }
  },
  check() {
    var id = this.data.newCleanerId;
    console.log(id);
    var that = this;
    var link = app.globalData.http + '/api/admin/get/user/info?id=' + id;
    var Token = wx.getStorageSync('token');
    wx.request({
      url: link,
      header: {
        'Authorization': Token,
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '为您找到该保洁员',
            icon: 'none',
            duration: 1500,
          })
          that.setData({
            newCleaner: res.data.data
          })
        } else {
          wx.showToast({
            title: '没有为您找到该保洁员',
            icon: 'none',
            duration: 1500,
          })
          setTimeout(function () {
            that.setData({
              newCleanerId: '',
            })
          }, 1500);
        }
      }
    })
  },
  submit() {
    if (this.data.newCleaner.name) {
      var that = this;
      var cleanerId = that.data.cleanerId;
      var results = that.data.results;
      var newCleanerId = that.data.newCleanerId;
      var Token = app.getToken();
      var link = app.globalData.http + '/api/admin/transfer/Cleaner/' + cleanerId + '/' + newCleanerId;
      wx.request({
        url: link,
        method: 'POST',
        data:results,
        header: {
          'Authorization': Token
        },
        success(res) {
          if (res.data.code == 200) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1000,
            })
            setTimeout(function () {
              wx.reLaunch({
                url: '../cleanerManage',
              })
            }, 1000);
          } else {
            wx.showToast({
              title: '提交失败',
              icon: "none",
              duration: 1000,
            })
          }
        }
      })

    } else {
      wx.showToast({
        title: '请完善保洁员信息',
        icon: "none",
        duration: 1000,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var StringResults = options.StringResults;
    var results = JSON.parse(StringResults);
    this.setData({
      results: results,
      cleanerId: id
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