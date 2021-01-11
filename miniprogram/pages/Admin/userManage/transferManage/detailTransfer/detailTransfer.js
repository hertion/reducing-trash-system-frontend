// pages/cleanerManage/editCleaner/editCleaner.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  chooseFlag:false,//多选的开关
  show: false,//弹出层开关
  checked: false,//是否全选的开关
  id:'',
  name:'',
  phoneNumber:'',
  areaInfo:'',
    list: [],
    result: [],
  },
  // 搭配单元格组件使用的复选框组
  onChange(event) {
    this.setData({
      result: event.detail
    });
    console.log(this.data.result);
  },
  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  noop() {},
  // 
  chooseFlag(){
    this.setData({
        chooseFlag:!this.data.chooseFlag
    })
    this.showPopup()
  },
  //
  //弹出层使用
  showPopup() {
    this.setData({ show: !this.data.show });
  },
  //是否全选
  onCheckAllChange(event){
    // console.log(event.detail);
    this.setData({
      checked: event.detail,
    });
    var idList = [];
    var list = this.data.list;
    // console.log(list);
    for(var i=0;i<list.length;i++){
      var t = JSON.stringify(list[i].id);
      idList.push(t);
    }
    // console.log(idList);
    if(event.detail){
      this.setData({
        result:idList
      })
    }
    else{
      this.setData({
        result:[]
      })
    }
  },
  gotoTransferCleaner(){
    var id = this.data.id;
    var results = this.data.result;
    var StringResults = JSON.stringify(results);
    console.log(results);
    console.log(StringResults);
    wx.navigateTo({
      url: '../transferDriver/transferDriver?StringResults='+StringResults+'&id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    this.setData({
      id:options.id,
      name:options.name,
      phoneNumber:options.phoneNumber,
      areaInfo:options.areaInfo
    })
    // var link =app.globalData.http+'/api/admin/get/cleaner/byDriverId?id='+id;
    // var Token = app.getToken();
    // wx.request({
    //   url: link,
    //   header: {
    //     'Authorization':Token,
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res){
    //     console.log(res.data);
    //     if(res.data.code==200){

    //       that.setData({
    //         list:res.data.data
    //       })
    //     }
    //   }
    // })
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