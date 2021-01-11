// pages/login/login.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     * phone 手机号数据框数据
     * authCodeToken 用户登录过程中包含验证码的token uid
     * sm 验证码输入框中内容
     */
    data: {
        phone: "",
        sm: "",
        authcodeToken: "",
        // 手机验证码
        sendTime: '获取验证码',
        sendColor: '#363636',
        snsMsgWait: 10,
        garbageChooses:[],
    },
    phoneOnChange: function (e) {
        this.setData({
            phone: e.detail
        })
    },
    smOnChange: function (e) {
        this.setData({
            sm: e.detail
        })
    },
    // 发送验证码请求，后端返回token（包括uid，role，验证码）
    bindSm: function (e) {
        // TODO 实现“友好的交互体验”验证手机号合法性
        if (this.data.phone.length != 11) {
            // 手机号错误
            wx.showToast({
                title: '手机号码输入有误',
                icon: 'none',
                duration: 2000,
              })
            return;
        }
        if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(this.data.phone))) {
            wx.showToast({
                title: '手机号码输入有误',
                icon: 'none',
                duration: 2000,
              })
            return;
          }
        //验证码按钮
         // 60秒后重新获取验证码
    var inter = setInterval(function() {
        this.setData({
          smsFlag: true,
          sendColor: '#cccccc',
          sendTime: this.data.snsMsgWait + 's后重发',
          snsMsgWait: this.data.snsMsgWait - 1
        });
        if (this.data.snsMsgWait < 0) {
          clearInterval(inter)
          this.setData({
            sendColor: '#363636',
            sendTime: '发送验证码',
            snsMsgWait: 10,
            smsFlag: false
          });
        }
      }.bind(this), 1000);
        //
        var that = this
        console.log(this.data.phone)
        var link = 'http://localhost:8080/api/user/sentAuthCode?phone=' + this.data.phone;
        wx.request({
            url: link,
            method: "post",
            header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                if (res.data.code == 200) {
                    console.log("发送成功")
                    wx.showToast({
                        title: '发送成功',
                        icon: 'success',
                        duration: 2000,
                      })
                    that.setData({
                        authcodeToken:res.header.Authorization
                    })
                }
                else {
                    // 验证码错误
                    console.log("手机号错误");
                    wx.showToast({
                        title: '手机号码输入有误',
                        icon: 'none',
                        duration: 2000,
                      })
                }
              },
              fail(res) {
                  console.log("服务器错误")
                  console.log(res)
              }
          })
    },
    // 登录请求，携带token，
    bindLogin: function () {
        try {
            var value = wx.getStorageSync('authCode')
            if (value) {
                // Do something with return value
            }
        } catch (e) {
            // Do something when catch error
        }
        var link = 'http://localhost:8080/api/user/checkAuthCode?code=' + this.data.sm;
        wx.request({
            url: link,
            method: "POST",
            header: {
                'Authorization': this.data.authcodeToken,
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res);
                if (res.data.code == 200) {
                    wx.setStorageSync('token', JSON.stringify(res.header.Authorization))
                    wx.showToast({
                        title: '登录成功',
                        icon: "success",
                        duration: 2000,
                    })
                    wx.switchTab({
                        url: '../homePage/homePage',        
                        });


                } else {
                    // 验证码错误
                    console.log("验证码错误");
                }

            },
            fail(res) {
                console.log("error" + res)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /*
        try {
            var value = wx.getStorageSync('authCode')
            if (value) {
                console.log(value)
              // Do something with return value
            }
          } catch (e) {
            // Do something when catch error
          }
          */
    },
    click: function () {
        wx.getStorage({
            key: 'authCode',
            success(res) {
                console.log(res.data)
            },
            fail(res) {
                console.log("fail")
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