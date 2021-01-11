// miniprogram/pages/Admin/driverManage/driverManage.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cid:'',
    cleaners:[],
    allCleaners:[],
  },
  onSearchChange(e) {
    this.setData({
      cid:  e.detail,
    });
    if(e.detail==''){
      this.setData({
        cleaners:this.data.allCleaners
      })
    }
  },
  onSearch() {
    var list = this.data.allCleaners;
    var flag = 0;
    for(var i=0;i<list.length;i++){
      if(list[i].id==this.data.cid){
        var t = [];
        flag=1;
        t.push(list[i]);
        this.setData({
          cleaners:t
        })
      }
    }
    if(flag==0){
      wx.showToast({
        title: '未找到该用户',
        icon:'none',
        duration:1000
      })
    }
  },
  gotoAddCleaner(){
    wx.navigateTo({
      url: 'addTransfer/addTransfer',
    })
  },
  gotoDetailCleaner(event){
    var id = event.currentTarget.dataset.id;
    var index = event.currentTarget.dataset.index;
    // console.log(id);
    // console.log(index);
    var cleaner = this.data.cleaners[index];
    // console.log(cleaner);
    var name = cleaner.name;
    var phoneNumber = cleaner.phoneNumber;
    if(cleaner.addressVo.province){
      var areaInfo = cleaner.addressVo.province+" "+cleaner.addressVo.city+" "+cleaner.addressVo.area+" "+cleaner.addressVo.street+" "+cleaner.addressVo.village;
    }
    else{
      var areaInfo = null
    }
    console.log(areaInfo);
    wx.navigateTo({
      url: 'detailTransfer/detailTransfer?id='+id+'&name='+name+'&phoneNumber='+phoneNumber+'&areaInfo='+areaInfo,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var link  = app.globalData.http +'/api/admin/get/transferStation';
    var Token  = app.getToken();
    wx.request({
      url: link,
      header: {
          'content-type': 'application/json', // 默认值
          'Authorization': Token
      },
      success(res) {
          if(res.data.code==200){
            console.log(res.data)
            that.setData({
              cleaners:res.data.data,
              allCleaners:res.data.data
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