import networkRequest from "../../utils/networkTool.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taxDectionDetail:{
      spChildrenEdu: "0.00", // 子女教育
      spContinueEdu: "0.00", // 继续教育
      spHousingInterest: "0.00", // 房贷利息
      spHousingRent: "0.00", // 住房租金
      spSupportParents: "0.00" // 赡养老人
    },//上个页面传来的参数
    showDetailBtnText:"查看详情",
    isShowDetail:true,
    sharePop:false,
    showDialog:true,//专项扣除弹框隐藏
    curPageTaxData:{
      actualAnnualIncomeDiff:"",//全年增加
      taxDiff:"",//每月少缴个税
      income:"",//收入,税改前后一样
      newDeductionAmount:"",//税改前专项扣除
      oldDeductionAmount:"",//税改后专项扣除
      welfare: "",//五险一金 税改前后一样
      oldTaxableIncome: "",//应纳税所得额--税改前
      newTaxableIncome: "",//应纳税所得额--税改后
      taxOld: "",//税改前纳税
      taxNew: "",//税改后纳税
      oldActualSalary:"",// 实发工资月薪--税改前
      newActualSalary: "",// 实发工资月薪--税改后
      oldActualAnnualIncome: "",// 实发年薪--税改前
      newActualAnnualIncome: ""// 实发年薪--税改后
    },
    rankInfo:{
      rank: "",
      count: "",
      rate1: "",
      rate2: ""
    }
  },

// 查看详情展开收起
  showDetailFn(){
      this.setData({
        isShowDetail: !this.data.isShowDetail,
        showDetailBtnText: this.data.showDetailBtnText == "收起详情" ? "查看详情" :"收起详情"
      })
  },
  // 分享
  shareFn(){
    this.setData({
      sharePop:true
    })
  },
  // 提交专项扣除信息
  submitTaxInfoFn(){
    wx.navigateTo({
      url: '../taxTelLogin/taxTelLogin?taxDectionDetail='+ JSON.stringify(this.data.taxDectionDetail),
    })
  },
// 打开专项扣除详情弹框
  openDialog(){
    this.setData({
      showDialog: false
    })
  },
  hideDialogFn(){
    this.setData({
      showDialog: true
    })
  },
  hideSharPop(){
    this.setData({
      sharePop: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.taxCalResultObj = JSON.parse(options.taxCalResultObj);
    this.data.taxDectionDetail = JSON.parse(options.taxDectionDetail);
    this.setData({
      curPageTaxData: {
        actualAnnualIncomeDiff: this.data.taxCalResultObj.actualAnnualIncomeDiff,
        taxDiff: this.data.taxCalResultObj.taxDiff,
        income: this.data.taxCalResultObj.income,
        newDeductionAmount: this.data.taxCalResultObj.deductionAmount,
        oldDeductionAmount: "0.00",
        welfare: this.data.taxCalResultObj.welfare,
        oldTaxableIncome: this.data.taxCalResultObj.oldTaxableIncome,
        newTaxableIncome: this.data.taxCalResultObj.newTaxableIncome,
        taxOld: this.data.taxCalResultObj.taxOld,
        taxNew: this.data.taxCalResultObj.taxNew,
        oldActualSalary: this.data.taxCalResultObj.oldActualSalary,
        newActualSalary: this.data.taxCalResultObj.newActualSalary, 
        oldActualAnnualIncome: this.data.taxCalResultObj.oldActualAnnualIncome,
        newActualAnnualIncome: this.data.taxCalResultObj.newActualAnnualIncome
      },
      taxDectionDetail: this.data.taxDectionDetail
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
  onShareAppMessage: function (res) {
    var that=this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    if (getApp().globalData.hasFubao) {//福宝
      var path = 'pages/index/index?scene=fubao$' + getApp().globalData.fubaoId
    } else {
      var path = 'pages/index/index?scene=' + getApp().globalData.orgId + "$" + getApp().globalData.bookId
    }
    return {
      title: '全民减税,看你一年能省多少钱',
      path: path ,
      imageUrl:'../../images/shareImg.png',
      success: function (res) {
        console.log("转发成功")
        that.setData({
          sharePop: false
        })
      },
      complete:function(){
        console.log("转发完成")
        that.setData({
          sharePop: false
        })
      }
        
       }

  }
})