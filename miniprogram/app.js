//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    const db = wx.cloud.database();
    var that  = this;
    db.collection('http').where({
      _id:"85ff8afa5fe4a087008ea8ff32048305"
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data[0].ip)
        that.globalData.http=res.data[0].ip
        console.log(that.globalData.http)
      }
    })
       // 通过获取token有无判断登录状态
    wx.getStorage({
      key: 'token',
      success(res) {
        console.log("登录成功")
        console.log(res)
      },
      fail(res) {
        console.log("登录过期，请重新登录")
      }
    })
  },
  globalData: {
    http: '',
    userInfo: null,
    token: "",
    user:{
      id:'',
      name:'',
      phoneNumber:'',
      address:'',
      sex:'',
      role:'',
      province:'',
      city:'',
      area:'',
      street:'',
      village:''
    },
    remark: '',
    recycleGarbage:[],
    unRecycleGarbage:[],
    soil:[],
    garbageChooses:[],
    fcOrder:{
      name:'',
      tele:'',
      address:'',
      remark:'',
      garbageChooses:[],
    },
    score:0.0,
    price:0.0,
    driverName:'',
    driverId:'',
    firmName:'',
    firmId:'',
    updateFlag:0,//控制订单审核界面订单的初始化，值为0时订单对象从后端取，值为1时订单对象从前端全局变量取
    cdGarbageChooses:[],
    //可回收公司需要
    crOrder:{},
    order:{
      name:'',
      tele:'',
      province:'',
      city:'',
      area:'',
      street:'',
      village:'',
      address:'',
      areaInfo:'',
      id:'',
    },
    //中转站需要
    data: {
      name: '',
      phoneNumber: '',
      remark: '',
      address: "",
      garbageChooses: [{
        id: 0,
        amount: 1.0,
        garbage: {
          id: 0
        }
      }]
    },
    //管理员需要
    categorys:'',
    
  },
  getToken: function () {
    try {
      var value = wx.getStorageSync('token')
      if (value) {
        return value;
      } else {
        // 返回登录页面
        wx.navigateTo({
          url: 'login2/login2',
        })
      }
    } catch (e) {
      // 获取缓存失败，手机的问题
    }
  },
  getUser:function(){
    try{
      var value = wx.getStorageSync('user')
      if(value){
        return value;
      }else{
        wx.navigateTo({
          url: 'login2/login2',
        })
      }
    }catch(e){
       // 获取缓存失败，手机的问题
    }
  },
})