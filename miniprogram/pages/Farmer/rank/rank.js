// miniprogram/pages/Rank/rank.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankList: [],
    rankFlagByStreet:0,
    rankFlagByArea:0,
    rankListByVillage:[],
    rankListByArea:[],
    color1:'',
    color2:'',
    color3:'',
  },
  changeVillagesColor(){
    this.setData({
      color1:'#1296db solid 5rpx',
      color2:'',
      color3:'',
    })
  },
  changeStreetsColor(){
    this.setData({
      color1:'',
      color2:'#1296db solid 5rpx',
      color3:'',
    })
  },
  changeAreasColor(){
    this.setData({
      color1:'',
      color2:'',
      color3:'#1296db solid 5rpx',
    })
  },
  rankByVillages(){
    this.changeVillagesColor();
    this.setData({
      rankList:this.data.rankListByVillage
    })
  },
  rankByStreets(){
    this.changeStreetsColor();
    if(this.data.rankFlagByStreet==0){
      var street = wx.getStorageSync('user').street;
      var that = this;
      var link =app.globalData.http + '/api/farmer/getRankList';
      var Token = wx.getStorageSync('token');
      var data={
        street:street
      }
      wx.request({
        url: link,
        header: {
          'Authorization': Token,
          'content-type': 'application/json' // 默认值
        },
        method:'POST',
        data:data,
        success(res) {
          if (res.data.code == 200) {
            that.setData({
              rankListByStreet:res.data.data,
              rankList: res.data.data
            })
            console.log("按街道排");
          }
        }
      })
      this.setData({
        rankFlagByStreet:1
      })
    }
    else{
      this.setData({
        rankList:this.data.rankListByStreet
      })
    }
  },
  rankByAreas(){
    this.changeAreasColor();
    if(this.data.rankFlagByArea==0){
      var area = wx.getStorageSync('user').area;
      var that = this;
      var link = app.globalData.http +'/api/farmer/getRankList';
      var Token = wx.getStorageSync('token');
      var data={
        area:area
      }
      wx.request({
        url: link,
        header: {
          'Authorization': Token,
          'content-type': 'application/json' // 默认值
        },
        method:'POST',
        data:data,
        success(res) {
          if (res.data.code == 200) {
            that.setData({
              rankListByArea:res.data.data,
              rankList: res.data.data
            })
          }
          console.log("按地区排");
        }
      })
      this.setData({
        rankFlagByArea:1
      })
    }
    else{
      this.setData({
        rankList:this.data.rankListByArea
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var link = app.globalData.http +'/api/farmer/getRankList';
    var Token = wx.getStorageSync('token');
    var village1 = wx.getStorageSync('user').village;
    var data = {
      village:village1
    }
    wx.request({
      url: link,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: data,
      success(res) {
        if (res.data.code == 200) {
          that.setData({
            rankList: res.data.data,
            rankListByVillage:res.data.data,
          })
        }
      }
    })
    this.changeVillagesColor();
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