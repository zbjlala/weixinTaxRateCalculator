Page({

  /**
   * 页面的初始数据
   */
  data: {
    success:"false",
    dataInfo:{
      name: '', // 员工姓名
      orgName: '', // 企业名称
      identificationNo: '' // 证件号码
    }
  },
  callPhoneFn(){
    wx.makePhoneCall({
      phoneNumber: '400-6600-566' // 仅为示例，并非真实的电话号码
    })
  },
  gobackFn(){
    if (getApp().globalData.hasFubao){//福宝
      wx.reLaunch({
        url: "../index/index?scene=fubao$" + getApp().globalData.fubaoId
      })
    }else{
      wx.reLaunch({
        url: "../index/index?scene=" + getApp().globalData.orgId + "$" + getApp().globalData.bookId
      })
    }
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options",options)
    this.data.success = options.success;
    console.log("this.data.success",this.data.success)
    if( this.data.success =="true"){
      this.data.dataInfo =JSON.parse( options.data);
      this.setData({
        dataInfo:this.data.dataInfo,
        success:this.data.success
      })
    }else{
      this.setData({
        success:this.data.success
      })
    }
    
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