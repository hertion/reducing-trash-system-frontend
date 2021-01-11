// miniprogram/pages/my/my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    score:0,
    times:0,
  },
  /**公用方法 */
  gotoUserSetting(){
    wx.navigateTo({
      url: '../userSetting/userSetting',
    })
},
  /**保洁员方法 */
  gotoCROrder(){
    wx.navigateTo({
      url: '../../Cleaner/crOrder/crOrder',
    })
  },
  gotoFCOrder(){
      wx.navigateTo({
        url: '../../Cleaner/fcOrder/fcOrder',
      })
  },
  gotoCDOrder(){
    wx.navigateTo({
      url: '../../Cleaner/cdOrder/cdOrder',
    })
  },
  gotoFCManage(){
    wx.navigateTo({
      url: '../../Cleaner/fcManage/fcManage',
    })
  },
  /**农户方法 */
  gotoMyNote(){
    wx.navigateTo({
      url: '../../Farmer/myNote/myNote',
    })
  },
  gotoFarmerOrder(){
    wx.navigateTo({
      url: '../../Farmer/farmerOrder/farmerOrder',
    })
  },
  /**司机方法 */
  gotodriverOrder(){
    wx.navigateTo({
      url: '../../Driver/driverOrder/driverOrder',
    })
  },
  /**可回收公司方法 */
  gotoCROrderByRecycle(){
    wx.navigateTo({
      url: '../../RecycleCompany/crOrder/crOrder',
    })
},
/**中转站方法 */
gotoRecord(){
  wx.navigateTo({
    url: '../../TransforStation/record/record',
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
    var that = this;
    var userRole = user.role.toLowerCase();
    var link2 =app.globalData.http + '/api/'+userRole+'/getOrderInfo';
    var Token = wx.getStorageSync('token');
    if(user.role=='FARMER'||user.role=='CLEANER'){
      wx.request({
        url: link2,
        header: {
          'Authorization': Token,
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if(res.data.code==200){
            that.setData({
              score:res.data.data[0].score,
              times:res.data.data[1].times,
            })
          }
        },
        fail() {
          console.log("fail");
        }
      })
    }
  },
  show:function(){
    console.log(this.data.user);
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
