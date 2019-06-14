import networkRequest from "../../utils/networkTool.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataType: 1,
    user: {
      telphone: "",
      code: ""
    },
    telphoneFocus: false,
    isTelPhoneNull:true,//输入框是否是空
    telphoneValid: false,//手机号是否满足11位
    getCodeText: "获取验证码",
    isValidate: false,//手机号验证码是否都有效
    taxCalResultObj:{
      spChildrenEdu: 0, // 子女教育
      spContinueEdu: 0, // 继续教育
      spHousingInterest: 0, // 房贷利息
      spHousingRent: 0, // 住房租金
      spSupportParents: 0 // 赡养老人
    }
  },

  /**
   * 头部tab切换事件
   */
  tabFn(e) {
    this.setData({
      dataType: e.currentTarget.dataset.datatype
    })
    if (this.data.dataType == 0) {
      wx.navigateTo({
        url: "../index/index"
      })
    }
  },
  
  /**
   * 手机号输入事件
   */
  phoneChangeFn(e) {
    var phoneStr = this.data.user.telphone;
    this.data.user.telphone = e.detail.value;
    if (this.data.user.telphone !=""){  
      this.setData({
        isTelPhoneNull: false,
        telphoneFocus: true
      })
    }
    this.data.telphoneValid = this.data.user.telphone.length == 11 ? true : false;
    this.setData({
      phoneStr: e.detail.value,
      telphoneValid: this.data.telphoneValid
    })
    if (this.data.telphoneValid && this.data.user.code) {
      this.data.isValidate = true;
      this.setData({ isValidate: true })
    } else {
      this.setData({ isValidate: false })
    }

  },
  clearTelphoneFn(e) {
    console.log("==", this.data.user)
    this.data.telphoneFocus = false;
    var phoneStr = 'user.telphone';
    this.data.user.telphone = "";
    this.setData({
      telphoneFocus: false,
      telphoneValid: false,
      [phoneStr]: "",
      isTelPhoneNull:true
    })
    if (this.data.telphoneValid && this.data.user.code) {
      this.data.isValidate = true;
      this.setData({ isValidate: true })
    } else {
      this.setData({ isValidate: false })
    }
  },
  getTelphoneCodeFn() {
    if (!this.data.telphoneValid) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.showToast({
      title: '验证码已发送',
      icon: 'none',
      duration: 2000
    })
    this.setData({ telphoneFocus: true })
    var that = this, times = 120;   // 定义120秒的倒计时
    var codeV = setInterval(function () {
      that.setData({
        getCodeText: --times + 's',
        isTelPhoneNull: false
      })
      if (times == 0) {
        clearInterval(codeV)
        that.setData({
          getCodeText: '获取验证码',
          isTelPhoneNull:false
        })
      }
    }, 1000)  //  1000是1秒

    var sendParams = {
      source: getApp().globalData.hasFubao?'service':1,
      orgId: getApp().globalData.orgId ? getApp().globalData.orgId:'',
      bookId: getApp().globalData.bookId ? getApp().globalData.bookId:'',
      mobile: this.data.user.telphone
    }
    networkRequest.POSTRequest("fudai/api/interface/mobile-message",sendParams,true).then(function(res){
      console.log('res',res);
     if(res.data.success){
      console.log("验证码发送成功");
      }else{
       console.log("验证码发送失败");
      }

    })
  },

  /**
   * 验证码输入框事件
   */
  codeValideFn(e) {
    this.data.user.code = e.detail.value;
    var codeStr = 'user.code';
    this.setData({
      [codeStr]: e.detail.value
    })
    if (this.data.telphoneValid && this.data.user.code) {
      this.data.isValidate = true;
      this.setData({ isValidate: true })
    } else {
      this.setData({ isValidate: false })
    }
  },
  /**
   * 查询工资事件
   */
  querySalaryFn() {
    console.log("sendParams", sendParams)
    var sendParams = {
      source: getApp().globalData.hasFubao ? 'service' : '1',// service：服宝 其他值：好会计
      orgId: getApp().globalData.orgId ? getApp().globalData.orgId:'',
      bookId: getApp().globalData.bookId ? getApp().globalData.bookId:'',
      taxData: JSON.stringify({
          mobile: this.data.user.telphone,
          code: this.data.user.code,
          id: getApp().globalData.hasFubao ? getApp().globalData.fubaoId : '',
          spChildrenEdu: this.data.taxDectionDetail.spChildrenEdu,
          spContinueEdu:this.data.taxDectionDetail.spContinueEdu, // 继续教育
          spHousingInterest:this.data.taxDectionDetail.spHousingInterest == 1000 ? 1000 : 0, // 房贷利息
          spHousingRent: this.data.taxDectionDetail.spHousingRent != 1000 ? this.data.taxDectionDetail.spHousingRent : 0, // 住房租金
          spSupportParents: this.data.taxDectionDetail.spSupportParents // 赡养老人
      })
 
    }
    networkRequest.POSTRequest("fudai/api/interface/save-hkj-data",sendParams,true).then(function(res){
      console.log('res TaxDeduction',res);
      if(res.data.success){
        wx.navigateTo({
          url: "../errorFeedBack/errorFeedBack?success="+res.data.success +"&data="+JSON.stringify(res.data.data)
        })
      }else{
          wx.showToast({
                  title: res.data.message.message,
                  icon: 'none',
                  duration: 2000
          })
        // if (res.data.message && res.data.message.errorCode == "saas.accounting.e8001"){
        //   wx.showToast({
        //     title: '请输入正确的验证码',
        //     icon: 'none',
        //     duration: 2000
        //   })
        // } else if (res.data.message && res.data.message.errorCode == "saas.accounting.e8002") {
        //   wx.navigateTo({
        //     url: "../errorFeedBack/errorFeedBack?success=" + res.data.success
        //   })
        // }else{
        //   wx.showToast({
        //     title: '系统异常',
        //     icon: 'none',
        //     duration: 2000
        //   })
        // }

      }
     
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.data.taxDectionDetail = JSON.parse(options.taxDectionDetail);
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
    if (getApp().globalData.hasFubao) {//福宝
      var path = 'pages/index/index?scene=fubao$' + getApp().globalData.fubaoId
    } else {
      var path = 'pages/index/index?scene=' + getApp().globalData.orgId + "$" + getApp().globalData.bookId
    }
    return {
      title: '全民减税,看你一年能省多少钱',
      path: path,
      imageUrl: '../../images/shareImg.png',
      success: function (res) {
        console.log("转发成功")
      }
    }

  }

  
})