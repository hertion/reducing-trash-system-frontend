// miniprogram/pages/Rank/rank.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0,//0代表保洁员积分，1代表农户积分
    rankList: [],
    rankFlagByStreet:0,
    rankFlagByArea:0,
    rankByMyFarmers:0,
    rankListByVillage:[],
    rankListByArea:[],
    rankListByMyFarmers:[],
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
      rankList:this.data.rankListByVillage,
      flag:0,
    })
  },
  rankByStreets(){
    this.changeStreetsColor();
    if(this.data.rankFlagByStreet==0){
      var street = wx.getStorageSync('user').street;
      var that = this;
      var link = app.globalData.http +'/api/cleaner/getRankList';
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
              rankList: res.data.data,
            })
          }
        }
      })
      this.setData({
        rankFlagByStreet:1,
        flag:0
      })
    }
    else{
      this.setData({
        rankList:this.data.rankListByStreet,
        flag:0
      })
    }
  },
  rankByAreas(){
    this.changeAreasColor();
    if(this.data.rankFlagByArea==0){
      var area = wx.getStorageSync('user').area;
      var that = this;
      var link = app.globalData.http +'/api/cleaner/getRankList';
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
        }
      })
      this.setData({
        rankFlagByArea:1,
        flag:0
      })
    }
    else{
      this.setData({
        rankList:this.data.rankListByArea,
        flag:0
      })
    }
  },
  rankByMyFarmers(){
    if(this.data.rankByMyFarmers==0){
      var that = this;
      var link = app.globalData.http+'/api/cleaner/getFarmerRanklist';
      var Token = wx.getStorageSync('token');
      wx.request({
        url: link,
        header: {
          'Authorization': Token,
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.code == 200) {
            that.setData({
              rankListByMyFarmers:res.data.data,
              rankList: res.data.data
            })
          }
        }
      })
      this.setData({
        rankByMyFarmers:1,
        flag:1
      })
    }
    else{
      this.setData({
        rankList:this.data.rankListByMyFarmers,
        flag:1
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var village = wx.getStorageSync('user').village;
    var that = this;
    var link = app.globalData.http +'/api/cleaner/getRankList';
    var Token = wx.getStorageSync('token');
    var data={
      village:village
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
            rankListByVillage:res.data.data,
            rankList: res.data.data
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