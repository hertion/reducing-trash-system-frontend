// miniprogram/pages/Admin/garbageManage/recycleManage/update/update.js
var categorys = {
  可回收垃圾: ['纸张类', '塑料类', '玻璃类', '金属类', '纺织类'],
  不可回收垃圾: ['金属类', '农药包装'],
  自利用垃圾: ['自利用']
}
var app = getApp();
var units = ['斤', '个', '节', '升']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1: false, //垃圾类别弹出层开关
    show2: false, //单位弹出层开关
    value: [], //类别选择器选中项的组成的数组，value[0]是垃圾类别，value[1]是细分类别
    id:'',
    category1: '',
    category2: '',
    name: '',
    picture:'',
    unit: '',
    score: '',
    suggestPrice: '',
    recyclePrice: '',
    myUnits: units,
    myCategorys: [{
        values: Object.keys(categorys),
        className: 'column1',
      },
      {
        values: categorys['可回收垃圾'],
        className: 'column2',
        defaultIndex: 2,
      },
    ],
  },
  //单位选择器
  onUnitConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      unit: value,
      show2: false
    });
  },
  onUnitCancel() {
    this.setData({
      show2: false
    });
  },
  showPopup2() {
    this.setData({
      show1: false,
      show2: true,
    });
  },
  //类别选择器
  onCategoryChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    picker.setColumnValues(1, categorys[value[0]]);
  },
  onCategoryConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    if (value[0] != '可回收垃圾') {
      this.setData({
        suggestPrice: '',
        recyclePrice: ''
      })
    }
    this.setData({
      category1: value[0],
      category2: value[1],
      show1: false
    });
  },
  onCategoryCancel() {
    this.setData({
      show1: false
    });
  },
  showPopup1() {
    this.setData({
      show1: true,
      show2: false
    });
  },
  //其他输入框
  onNameChange(event) {
    this.setData({
      name: event.detail
    })
  },
  onScoreChange(event) {
    this.setData({
      score: event.detail
    })
  },
  onScoreCheck(event) {
    var ret = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    if ((event.detail.value).match(ret)) {
      this.setData({
        score: (parseFloat(event.detail.value)).toFixed(2)
      })
    } else {
      wx.showToast({
        title: '请输入正确的整数或小数',
        icon: "none",
        duration: 1000,
      })
      this.setData({
        score: 0
      })
    }
  },
  onSuggestPriceChange(event) {
    this.setData({
      suggestPrice: event.detail
    })
  },
  onSuggestPriceCheck(event) {
    var ret = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    if ((event.detail.value).match(ret)) {
      this.setData({
        suggestPrice: (parseFloat(event.detail.value)).toFixed(2),
        recyclePrice: parseFloat(((parseFloat(event.detail.value)).toFixed(2)) * 1.5).toFixed(2)
      })
    } else {
      wx.showToast({
        title: '请输入正确的整数或小数',
        icon: "none",
        duration: 1000,
      })
      this.setData({
        suggestPrice: 0,
        recyclePrice: 0
      })
    }
  },
  onRecyclePriceChange(event) {
    this.setData({
      recyclePrice: event.detail
    })
  },
  onRecyclePriceCheck(event) {
    var ret = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    if ((event.detail.value).match(ret)) {
      this.setData({
        recyclePrice: (parseFloat(event.detail.value)).toFixed(2)
      })
    } else {
      wx.showToast({
        title: '请输入正确的整数或小数',
        icon: "none",
        duration: 1000,
      })
      this.setData({
        recyclePrice: 0
      })
    }
  },
  submit() {
    var that = this;
    var Token = app.getToken();
    var link = app.globalData.http + '/api/admin/record/garbage';
    var data = {
      id:this.data.id,
      category: this.data.category1,
      type: this.data.category2,
      name: this.data.name,
      unit: this.data.unit,
      picture:this.data.picture,
      showAble: true,
      score: this.data.score,
      recyclePrice: this.data.recyclePrice,
      suggestPrice: this.data.suggestPrice
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
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 1000,
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../garbageManage',
            })
          }, 1000);
        } else {
          wx.showToast({
            title: '操作失败',
            icon: "none",
            duration: 1000,
          })
        }
      },
      fail(res) {
        wx.hideLoading();
        wx.showToast({
          title: '操作失败',
          icon: "none",
          duration: 2000,
        })
      }
    })
  },
  delete() {
    var that = this;
    var Token = app.getToken();
    var link = app.globalData.http + '/api/admin/record/garbage';
    var data = {
      id:this.data.id,
      category: this.data.category1,
      type: this.data.category2,
      name: this.data.name,
      unit: this.data.unit,
      showAble: false,
      score: this.data.score,
      picture:this.data.picture,
      recyclePrice: this.data.recyclePrice,
      suggestPrice: this.data.suggestPrice
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
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 1000,
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../garbageManage',
            })
          }, 1000);
        } else {
          wx.showToast({
            title: '操作失败',
            icon: "none",
            duration: 1000,
          })
        }
      },
      fail(res) {
        wx.hideLoading();
        wx.showToast({
          title: '操作失败',
          icon: "none",
          duration: 2000,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id:id
    })
    console.log(id);
    var that = this;
    var link = app.globalData.http + '/api/user/show/garbage?id='+this.data.id;
    var Token = app.getToken();
    wx.request({
      url: link,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': Token
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {
          var t = res.data.data;
          that.setData({
            category1: t.category,
            category2: t.type,
            name:t.name,
            unit: t.unit,
            score: t.score,
            suggestPrice:t.suggestPrice,
            recyclePrice:t.recyclePrice,
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