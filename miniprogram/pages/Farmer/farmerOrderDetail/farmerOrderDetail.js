// miniprogram/pages/farmerOrderDetail/farmerOrderDetail.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    order:'',
  },
  deleteOrder(){
    Dialog.confirm({
      title: '温馨提示',
      message: '确定取消订单？',
    })
      .then(() => {
        // on confirm
        var that = this;
        var link = app.globalData.http + '/api/farmer/removeFCOrder?id='+this.data.order.id;
        var token = app.getToken();
        var data = null;
        wx.showLoading({
          title: '加载中...',
          mask: true
        });
        wx.request({
          url: link,
          header: {
              'content-type': 'application/json', // 默认值
              'Authorization': token
          },
          method: 'POST',
          data: data,
          success(res) {
            wx.hideLoading();
              console.log(res.data.data);
              if (res.data.code == 200) {
                wx.showToast({
                  title: '已为您取消订单',
                  icon: 'success',
                  duration: 2000,
                })
                setTimeout(function () {
                  wx.reLaunch({
                    url: '../farmerOrder/farmerOrder',
                  })
                }, 1500);
              }
          }
      })
      })
      .catch(() => {
        // on cancel
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    var link =app.globalData.http+'/api/farmer/getBaseOrderById?id='+id;
    var Token = wx.getStorageSync('token');
    wx.request({
      url: link,
      header: {
        'Authorization':Token,
        'content-type': 'application/json' // 默认值
      },
      success(res){
        console.log(res.data);
        if(res.data.code==200){
          var time = res.data.data.insertTime;
          time = time.replace("T"," ");
          res.data.data.insertTime = time;
          that.setData({
            order:res.data.data
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