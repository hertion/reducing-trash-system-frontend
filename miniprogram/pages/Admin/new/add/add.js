// miniprogram/pages/Admin/new/add/add.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    author:'',
    content:'',
    farmerChecked:true,
    cleanerChecked:true,
    driverChecked:true,
    recycleFirmChecked:true,
  },
  onTitleChange(event){
    this.setData({
      title:event.detail
    })
  },
  onAuthorChange(event){
    this.setData({
      author:event.detail
    })
  },
  onContentChange(event){
    this.setData({
      content:event.detail
    })
  },
  onFarmerShowChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ farmerChecked: detail });
  },
  onCleanerShowChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ cleanerChecked: detail });
  },
  onDriverShowChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ driverChecked: detail });
  },
  onRecycleFirmShowChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ recycleFirmChecked: detail });
  },
  submit(){
    var that = this;
    var link = app.globalData.http+"/api/admin/record/news";
    var Token = app.getToken();
    var data = {
      author:this.data.author,
      title:this.data.title,
      content:this.data.content,
      hidden:false,
      farmerShow:this.data.farmerChecked,
      cleanerShow:this.data.cleanerChecked,
      kitchenShow:this.data.driverChecked,
      recycleFirmShow:this.data.recycleFirmChecked
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
                title: '提交成功',
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
              title: '提交失败',
              icon:"none",
              duration:1000,
            })
          }
      },
      fail(res){
        wx.hideLoading();
        wx.showToast({
          title: '提交失败',
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