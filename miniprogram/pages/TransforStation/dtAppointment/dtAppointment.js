// pages/homePage/homePage.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        driverId: "",
        weight: "",
        name:'',
        tele:'',
    },
    onIdChange(event) {
        this.setData({
            driverId: event.detail.value
        })
        var that = this;
        var link = app.globalData.http +'/api/transferStation/getDriver?id=' + this.data.driverId;
        console.log(link);
        var Token = wx.getStorageSync('token');
        console.log(Token);
        wx.request({
            url: link,
            header: {
                'Authorization': Token,
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res.data);
                if (res.data.code == 200) {
                    wx.showToast({
                        title: '为您找到该司机',
                        icon: 'none',
                        duration: 1500,
                    })
                    that.setData({
                        name: res.data.data
                    })
                } else {
                    wx.showToast({
                        title: '没有为您找到该司机',
                        icon: 'none',
                        duration: 1500,
                    })
                    setTimeout(function(){
                        that.setData({
                            driverId: '',
                        })
                    },1500);
                }
            }
        });

    },
    onWeightChange(event) {
        this.setData({
            weight: event.detail
        })
    },
    onTeleChange(event){
        this.setData({
            tele:event.detail
        })
    },
    bindsubmit: function (res) {
        if (this.data.driverId == "" || this.data.weight == ""|| this.data.tele == "") {
            wx.showToast({
              title: '请完善订单',
              icon:'none',
              duration:1500,
            })
            return;
        }
        var data = app.globalData.data;
        data.garbageChooses[0].amount = Number(this.data.weight)
        data.garbageChooses[0].garbage.id = 1
        data.name=this.data.name;
        data.phoneNumber = this.data.tele;
        console.log(data)
        var link = app.globalData.http + "/api/transferStation/addDTOrder?id=" + this.data.driverId;
        var token = app.getToken()
        console.log(token)
        wx.request({
            url: link,
            method: 'POST',
            data: data,
            header: {
                'content-type': 'application/json', // 默认值
                'Authorization': token
            },
            success(res) {
                console.log(res.data)
                if(res.data.code==200){
                    wx.showToast({
                      title: '提交成功',
                      icon:'success',
                      duration:1000,
                    })
                    setTimeout(function(){
                        wx.switchTab({
                          url: '../../Common/my/my',
                        })
                    },1000);
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(app.globalData.data);
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