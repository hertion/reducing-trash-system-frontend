// miniprogram/pages/store/store.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: ''
  },
  // doLogin:function(callback = ()=>{}){
  //   let that = this;
  //   wx.login({
  //     success:function(loginRes){
  //       // console.log(loginRes);
  //       if(loginRes){
  //         //获取用户信息
  //         wx.getUserInfo({
  //           success:function(infoRes){
  //             console.log(infoRes,'>>>');
  //             //请求服务端的的登录接口
  //             wx.request({
  //               url: 'http://localhost:8080/api/login',//待填写
  //               data:{
  //                 code:loginRes.code,//临时登陆凭证
  //                 rawData:infoRes.rawData,//用户非敏感信息
  //                 signature:infoRes.signature,//签名
  //                 encryptedData:infoRes.encryptedData,//用户敏感信息
  //                 iv:infoRes.iv//解密算法的向量
  //               },
  //               success:function(res){
  //                 console.log("登陆成功");
  //                 res = res.data;
  //                 if(res.result==0){
  //                   that.userInfo = res.userInfo;
  //                   wx.setStorageSync('userInfo', JSON.stringify(res.userInfo));
  //                   wx.setStorageSync('loginFlag',res.skey);
  //                   console.log("skey="+res.skey);
  //                   // callback();
  //                 }else{
  //                   that.showInfo("res.errmsg");
  //                 }
  //               },
  //               fail:function(error){
  //                 //调用服务端登录接口失败
  //                 console.log(error);
  //               }
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // },


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