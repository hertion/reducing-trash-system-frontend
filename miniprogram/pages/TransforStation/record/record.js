// pages/record/record.js
var app = getApp();
var time = require('../../../utils/util');
var address = require("../../../data/mock2");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: [],
        show: false,
        show1: false, //时间选择器弹出框控制开关
    show2: false, //筛选开关
    //时间选择器
    currentDate: new Date().getTime(),
    showDate: '',
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return `${value}日`;
    },
    //地址选择系列
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    areas: [],
    streets: [],
    villages: [],
    areaInfo: ''
    //
    },
 /**时间选择器弹出层**/
 showPopup1() {
    this.setData({
      show1: true
    });
  },
  onClose1() {
    this.setData({
      show1: false
    });
  },
  //
  /**筛选弹出层 */
  showPopup2() {
    this.setData({
      show2: true
    });
  },
  onClose2() {
    this.setData({
      show2: false
    });
  },
  //
  /**时间选择器 */
  onInput(event) {
    this.setData({
      currentDate: event.detail
    })
  },
  onSubmitClose() {
    var t = time.formatDate(this.data.currentDate);
    this.setData({
      showDate: t,
      show1: false
    })
  },
  //
  /**地址选择器方法 */
  // 点击所在地区弹出选择框
  select: function (e) {
    // 如果已经显示，不在执行显示动画
    if (this.data.addressMenuIsShow) {
      return false
    } else {
      // 执行显示动画
      this.startAddressAnimation(true)
    }
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    if (isShow) {
      // vh是用来表示尺寸的单位，高度全屏是100vh
      this.animation.translateY(0 + 'vh').step()
    } else {
      this.animation.translateY(40 + 'vh').step()
    }
    this.setData({
      animationAddressMenu: this.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var street = that.data.street
    var value = that.data.value
    this.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.areas[value[0]].name + ' ' + that.data.streets[value[1]].name + ' ' + that.data.villages[value[2]].name
    that.setData({
      areaInfo: areaInfo,
    })
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    var areas = this.data.areas
    var streets = this.data.streets
    var villages = this.data.villages
    var areaNum = value[0]
    var streetNum = value[1]
    var villageNum = value[2]
    // 如果地区选择项和之前不一样，表示滑动了地区，此时街道默认是地区的第一组数据，
    if (this.data.value[0] != areaNum) {
      var id = areas[areaNum].id
      this.setData({
        value: [areaNum, 0, 0],
        streets: address.streets[id],
        villages: address.villages[address.strees[id][0].id],
      })
    } else if (this.data.value[1] != streetNum) {
      // 滑动选择了第二项数据，即街道，此时村显示区-街道对应的第一组数据
      var id = streets[streetNum].id
      this.setData({
        value: [areaNum, streetNum, 0],
        villages: address.villages[streets[streetNum].id],
      })
    } else {
      // 滑动选择了区
      this.setData({
        value: [areaNum, streetNum, villageNum]
      })
    }
  },
  /**进行筛选 */
  submit() {
    var that = this;
    var value = this.data.value
    var Token = app.getToken();
    var link = app.globalData.http +'/api/transferStation/getDTOrder';
    if (this.data.areaInfo != '' && this.data.showDate == '') {
      var data = {
        addressVo: {
          village: this.data.villages[value[2]].name
        },
        col: "a"
      }
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
          if (res.data.code == 200) {
            console.log("successful");
            console.log(res.data.data);
            that.setData({
              show2: false,
             order: res.data.data,
              showDate: '',
              areaInfo: ''
            })
          }
        }
      })
    }
    if (this.data.areaInfo == '' && this.data.showDate != '') {
      var data = {
        col: "t",
        startTime: this.data.showDate + " 00:00:00",
        endTime: this.data.showDate + " 23:59:59",
      }
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
          if (res.data.code == 200) {
            console.log("successful");
            console.log(res.data.data);
            that.setData({
              show2: false,
              order: res.data.data,
              showDate: '',
              areaInfo: ''
            })
          }
        }
      })
    }
    if (this.data.areaInfo != '' && this.data.showDate != '') {
      var data = {
        col: "t_a",
        startTime: this.data.showDate + " 00:00:00",
        endTime: this.data.showDate + " 23:59:59",
        addressVo: {
          village: this.data.villages[value[2]].name
        },
      }
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
          if (res.data.code == 200) {
            console.log("successful");
            console.log(res.data.data);
            that.setData({
              show2: false,
              order: res.data.data,
              showDate: '',
              areaInfo: ''
            })
          }
        }

      })
    }

  },
  //

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var link = app.globalData.http + '/api/transferStation/getDTOrder';
        var token = app.getToken();
        var data = {
            col: "none"
          }
        wx.request({
            url: link,
            header: {
                'content-type': 'application/json', // 默认值
                'Authorization': token
            },
            method: 'POST',
            data: data,
            success(res) {
                console.log(res.data.data);
                if (res.data.code == 200) {
                    for(var i=0;i<res.data.data.length;i++){
                         var time = res.data.data[i].insertTime;
                        time = time.replace("T", " ");
                        res.data.data[i].insertTime = time;
                    }
                    that.setData({
                        order: res.data.data
                    })
                }
            }
        })
        /**地址选择器设置默认值 */
    var id = address.areas[0].id
    this.setData({
      areas: address.areas,
      streets: address.streets[id],
      villages: address.villages[address.streets[id][0].id],
    })
    //
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
 /**时间选择器需要 */
 var animation = wx.createAnimation({
    duration: 500,
    timingFunction: 'linear',
  })
  this.animation = animation
  //
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