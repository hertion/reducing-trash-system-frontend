// pages/Driver/driverAppointment/driverAppointment.js
var app = getApp();
var address = require("../../../data/mock2");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',//保洁员ID
    name: '',
    phoneNumber: '',
    area:'',
    village:'',
    street:'',
    address: '',
    areaInfo:'',
    bucketCapacity:'',
    bucketNumber:'',
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
  verify(){
    var that = this;
    var link = app.globalData.http+'/api/driver/show/cleaner/shortInfo?phone='+this.data.phoneNumber;
    var Token = app.getToken();
    wx.request({
      url: link,
      header: {
        'Authorization': Token,
        'content-type': 'application/json' // 默认值
      },
      success(res){
        if(res.data.code==200){
          var t = res.data.data;
          var a = res.data.data.addressVo;
          that.setData({
            id:t.id,
            name:t.name,
            area:a.area,
            street:a.street,
            village:a.village,
            areaInfo:a.province+' '+a.city+' '+a.area+" "+a.street+" "+a.village
          })
        }
        else{
          wx.showToast({
            title: '未找到该保洁员',
            icon:'none',
            duration:1000
          })
        }
      }
    })
  },
  //表单变化
  onNameChange(event){
    this.setData({
      name:event.detail
    })
  }, 
  onTeleChange(event){
    this.setData({
      phoneNumber:event.detail
    })
  },
  onBucketCapacityChange(event){
    this.setData({
      bucketCapacity:event.detail
    })
  },
  onBucketNumberChange(event){
      this.setData({
        bucketNumber:event.detail
      })
  },
  /**地址选择器方法 */
  // 点击所在地区弹出选择框
  select: function (e) {
    // 如果已经显示，不在执行显示动画
    if (this.data.addressMenuIsShow) {
      return false
    } else {
      // 执行显示动画
      if(this.data.name!=''){   //做了改动，重用时请注意！
        this.startAddressAnimation(true)
      }
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
      area:that.data.areas[value[0]].name,
      street:that.data.streets[value[1]].name,
      village:that.data.villages[value[2]].name,
      areaInfo: "黑龙江省 哈尔滨市 " + areaInfo,
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
        villages: address.villages[address.streets[id][0].id],
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
  submit(){
    if(this.data.id!=''&&this.data.name!=''&&this.data.village!=''&&this.data.bucketCapacity!=''&&this.data.bucketNumber!=''){
      var myAmout = this.data.bucketNumber*this.data.bucketCapacity;
      var myGarbageChooses=[{
        garbage:{id:18},
        amount:myAmout
      }];
      var data = {
        name: this.data.name,
        phoneNumber: this.data.phoneNumber,
        province: '黑龙江省',
        city: '哈尔滨市',
        area: this.data.area,
        street: this.data.street,
        village: this.data.village,
        remark: this.data.remark,
        garbageChooses: myGarbageChooses,
      }
      var link = app.globalData.http+'/api/driver/record/CDOrder?id='+this.data.id;
      var Token = app.getToken();
      console.log(data);
      wx.request({
        url: link,
        method: 'POST',
        data: data,
        header: {
          'Authorization': Token,
          'content-type': 'application/json' // 默认值
        },
        success(res){
          if(res.data.code==200){
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
            })
            setTimeout(function () {
              wx.switchTab({
                url: '../../Common/homePage/homePage',
              })
            }, 1500);
          }
        },
        fail(res){
          console.log("失败")
          console.log(res.data);
        }
      })

    }
    else{
      wx.showToast({
        title: '请完善发起人信息',
        icon: 'none',
        duration: 1000,
      })
    }
  },
  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
/**地址选择器需要 */
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