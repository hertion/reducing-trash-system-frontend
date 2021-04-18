// miniprogram/pages/Admin/new/detail/detail.js
var  app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    new:{},
  },
  gotoUpdate(){
    var id = this.data.new.id;
    wx.navigateTo({
      url: '../update/update?id='+id,
    })
  },
  gotoDelete(){
    var id = this.data.new.id;
    var link = app.globalData.http+"/api/admin/record/news";
    var Token = app.getToken();
    var data = {
      id:id,
      author:this.data.new.author,
      title:this.data.new.title,
      content:this.data.new.content,
      hidden:true,
      farmerShow:this.data.new.farmerShow,
      cleanerShow:this.data.cleanerShow,
      kitchenShow:this.data.kitchenShow,
      recycleFirmShow:this.data.recycleFirmShow
    }
    console.log(data);
    wx.request({
      url: link,
      method: 'POST',
      data: data,
      header: {
          'content-type': 'application/json', // 默认值
          'Authorization': Token
      },
      success(res) {
        wx.hideLoading();
          console.log(res.data)
          if(res.data.code==200){
              wx.showToast({
                title: '删除成功',
                icon:'success',
                duration:1000,
              })
              setTimeout(function(){
                  wx.reLaunch({
                    url: '../new',
                  })
              },1000);
          }
          else{
            wx.showToast({
              title: '删除失败',
              icon:"none",
              duration:1000,
            })
          }
      },
      fail(res){
        wx.hideLoading();
        wx.showToast({
          title: '删除失败',
          icon:"none",
          duration:2000,
        })
      }
  })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that = this;
    var Token = app.getToken();
    console.log(wx.getStorageSync('user'));
    this.setData({
      user:wx.getStorageSync('user')
    })
    console.log(app.globalData.user)
    var link = app.globalData.http+"/api/user/get/news/info?id="+id;
    wx.request({
      url: link,
      header: {
        'Authorization':Token,
        'content-type': 'application/json' // 默认值
      },
      success(res){
        console.log(res.data);
        if(res.data.code==200){
          var t = res.data.data;
          t.insertTime = (t.insertTime).replace("T"," ");
          that.setData({
            new:t
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