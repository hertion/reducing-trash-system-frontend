// miniprogram/pages/Common/guide/guide.js
var app = getApp();
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    recycleGarbage:'',
    unRecycleGarbage:'',
    soilGarbage:''
  },
 // 滑动切换tab
 bindChange: function (e) {
  var that = this;
  that.setData({
    currentTab: e.detail.current
  });
},
// 点击tab切换
swichNav: function (e) {
  var that = this;
  if (this.data.currentTab === e.target.dataset.current) {
    return false;
  } else {
    that.setData({
      currentTab: e.target.dataset.current
    })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var link = app.globalData.http + '/api/user/getRecycleGarbage';
    var link2 = app.globalData.http + '/api/user/getUnRecycleGarbage';
    var link3 = app.globalData.http + '/api/user/getSoilGarbage';
    if(wx.getStorageSync('token')){
        var Token = wx.getStorageSync('token');
    }
    else{
    var Token = '69bc4c5ad17c50f02db92062c8a05f55d95a0dcd5356ad32e3977d49ab643e9a';
    }
    //可回收
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
        }
      }
    })
    // 不可回收
    wx.request({
      url: link2,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      success(res){
        if(res.data.code==200){
          console.log(res.data.data)
          var obj = res.data.data.unRecycleGarbage;
          that.setData({
            unRecycleGarbage: res.data.data.unRecycleGarbage
          })
        }
      }
    })
    //自利用
    wx.request({
      url: link3,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      success(res){
        if(res.data.code==200){
          console.log(res.data.data)
          that.setData({
            soilGarbage: res.data.data.soil
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