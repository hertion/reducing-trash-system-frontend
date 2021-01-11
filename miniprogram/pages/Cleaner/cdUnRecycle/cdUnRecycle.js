// miniprogram/pages/cdUnRecycle/cdUnRecycle.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    currentTab: 0,
    score: 0.0,
    unRecycleGarbage: [],
    garbageChooses: [],
  },
/**
   * 垃圾数量的改变,以及对应的积分变化
   */
  onUnitChangeByFloat(event) {
    // console.log(event.detail)
    var that = this;
    var id = event.target.dataset.id;
    var amount = event.target.dataset.name;
    var index = "garbageChooses[" + id + "]." + amount;
    var ret = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    if ((event.detail.value).match(ret)) {
      this.setData({
        [index]: (parseFloat(event.detail.value)).toFixed(1)
      })
      var t = that.data.garbageChooses;
      var myScore = 0;
      for (var i = 0; i < t.length; i++) {
        if (t[i] != null) {
          myScore = myScore + ((t[i].amount) * (t[i].garbage.score))
        }
      }
      myScore = myScore.toFixed(1)
      that.setData({
        score: myScore
      })
      app.globalData.score = myScore;
    } else {
      wx.showToast({
        title: '请输入正确的整数或小数',
        icon: "none",
        duration: 1000,
      })
      this.setData({
        [index]: 0
      })
      var t = that.data.garbageChooses;
      var myScore = 0;
      for (var i = 0; i < t.length; i++) {
        if (t[i] != null) {
          myScore = myScore + ((t[i].amount) * (t[i].garbage.score))
        }
      }
      myScore = myScore.toFixed(1)
      that.setData({
        score: myScore
      })
      app.globalData.score = myScore;
    }

  },
  /**
   * 垃圾数量的改变,以及对应的积分变化
   */
  onUnitChangeByInt(event) {
    // console.log(event.detail)
    var that = this;
    var id = event.target.dataset.id;
    var amount = event.target.dataset.name;
    var index = "garbageChooses[" + id + "]." + amount;
    var ret = /^[1-9]*[1-9][0-9]*$/;
    if ((event.detail.value).match(ret)) {
      this.setData({
        [index]: (parseInt(event.detail.value))
      })
      var t = that.data.garbageChooses;
      var myScore = 0;
      for (var i = 0; i < t.length; i++) {
        if (t[i] != null) {
          myScore = myScore + ((t[i].amount) * (t[i].garbage.score))
        }
      }
      myScore = myScore.toFixed(1)
      that.setData({
        score: myScore
      })
      app.globalData.score = myScore;
    } else {
      wx.showToast({
        title: '请输入正确的整数',
        icon: "none",
        duration: 1000,
      })
      this.setData({
        [index]: 0
      })
      var t = that.data.garbageChooses;
      var myScore = 0;
      for (var i = 0; i < t.length; i++) {
        if (t[i] != null) {
          myScore = myScore + ((t[i].amount) * (t[i].garbage.score))
        }
      }
      myScore = myScore.toFixed(1)
      that.setData({
        score: myScore
      })
      app.globalData.score = myScore;
    }
  },
  addAmount(event) {
    var that = this;
    var id = event.target.dataset.id;
    var amount = parseFloat(this.data.garbageChooses[id].amount) + 1;
    var index = "garbageChooses[" + id + "].amount";
    this.setData({
      [index]: amount
    })
    var t = that.data.garbageChooses;
    var myScore = 0;
    for (var i = 0; i < t.length; i++) {
      if (t[i] != null) {
        myScore = myScore + ((t[i].amount) * (t[i].garbage.score))
      }
    }
    that.setData({
      score: myScore
    })
    app.globalData.score = myScore;
  },
  delAmount(event) {
    var that = this;
    var id = event.target.dataset.id;
    var amount = parseFloat(this.data.garbageChooses[id].amount) - 1;
    if(amount<0){
      amount=0;
    }
    var index = "garbageChooses[" + id + "].amount";
    this.setData({
      [index]: amount
    })
    var t = that.data.garbageChooses;
    var myScore = 0;
    for (var i = 0; i < t.length; i++) {
      if (t[i] != null) {
        myScore = myScore + ((t[i].amount) * (t[i].garbage.score))
      }
    }
    that.setData({
      score: myScore
    })
    app.globalData.score = myScore;
  },
  /**
   * 提交订单
   */
  submit() {
    console.log(this.data.garbageChooses);
    app.globalData.cdGarbageChooses = this.data.garbageChooses;
    wx.navigateTo({
      url: '../cdAppointment/cdAppointment'
    })
  },
  /**
   * 导航所用方法（黑盒）
   */
  switchNav: function (e) {
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({
        currentTab: id
      });
    }
    page.setData({
      active: id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.cdGarbageChooses);
    this.setData({
      unRecycleGarbage: app.globalData.unRecycleGarbage,
      garbageChooses: app.globalData.cdGarbageChooses,
      score:app.globalData.score,
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