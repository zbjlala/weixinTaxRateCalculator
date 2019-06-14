var app = getApp();
import networkRequest from "../../utils/networkTool.js"
import commonFun from "../../utils/utils.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:'',
    dataType:0,
    selectedChild:"",
    selectedBrother:"",
    dialognum:"",
    popHide:true,
    popDialog:"",
    taxObj:{
      income:"",
      fiveInsurancePayment:"",
      deductionMethod: "",//夫妻双方抵扣方式
      childrenCount:"",
      educationType:"",
      brotherCount:"",
      housing:"",
      startTaxMoney:5000
    },
    taxDectionDetail:{
      spChildrenEdu: "0.00", // 子女教育
      spContinueEdu: "0.00", // 继续教育
      spHousingInterest: "0.00", // 房贷利息
      spHousingRent: "0.00", // 住房租金
      spSupportParents: "0.00" // 赡养老人
    },
    /**
   * 税率表
   */
    oldTaxRateTable: [
      { min: 0, max: 1500, rate: 0.03, deduction: 0 },
      { min: 1500, max: 4500, rate: 0.10, deduction: 105 },
      { min: 4500, max: 9000, rate: 0.20, deduction: 555 },
      { min: 9000, max: 35000, rate: 0.25, deduction: 1005 },
      { min: 35000, max: 55000, rate: 0.30, deduction: 2755 },
      { min: 55000, max: 80000, rate: 0.35, deduction: 5505 },
      { min: 80000, rate: 0.45, deduction: 13505 }
    ],
    newTaxRateTable : [
      { min: 0, max: 3000, rate: 0.03, deduction: 0 },
      { min: 3000, max: 12000, rate: 0.10, deduction: 210 },
      { min: 12000, max: 25000, rate: 0.20, deduction: 1410 },
      { min: 25000, max: 35000, rate: 0.25, deduction: 2660 },
      { min: 35000, max: 55000, rate: 0.30, deduction: 4410 },
      { min: 55000, max: 80000, rate: 0.35, deduction: 7160 },
      { min: 80000, rate: 0.45, deduction: 15160 }
    ],
    // 工资表数据
    codeV: "",
    user: {
      telphone: "",
      code: ""
    },
    telphoneFocus: false,
    isTelPhoneNull: true,//输入框是否是空
    telphoneValid: false,//手机号是否满足11位
    getCodeText: "获取验证码",
    isValidate: false//手机号验证码是否都有效  
  },
  
  /**
   * 点击tab切换
   */
  swichNav: function (e) {
   
    if (this.data.dataType === e.target.dataset.datatype) {
      return false;
    } else {   
      this.setData({
        dataType: e.currentTarget.dataset.datatype
      })
      if (this.data.dataType == 1){//工资条
        clearInterval(this.data.codeV);
        this.setData({
          codeV: "",
          dataType: 1,
          user: {
            telphone: "",
            code: ""
          },
          telphoneFocus: false,
          isTelPhoneNull: true,//输入框是否是空
          telphoneValid: false,//手机号是否满足11位
          getCodeText: "获取验证码",
          isValidate: false//手机号验证码是否都有效
        })
      }
    }
  },

// 月收入
  incomeFn(e){
    this.data.taxObj.income = e.detail.value;
    var income = "taxObj.income";
    this.setData({
      income:e.detail.value
    })
  },
  // 五险一金
  fiveInsurancePaymentFn(e){
    this.data.taxObj.fiveInsurancePayment = e.detail.value;
    var fiveInsurancePayment = "taxObj.fiveInsurancePayment";
    this.setData({
      fiveInsurancePayment: e.detail.value
    })
  },

// 夫妻双方抵扣方式
  deductionMethodFn(e){
    if (this.data.taxObj.deductionMethod == e.target.dataset.method){
      this.data.taxObj.deductionMethod = ""
    }else{
      this.data.taxObj.deductionMethod = e.target.dataset.method;
    }
    var deductionMethod = "taxObj.deductionMethod"
    this.setData({
      [deductionMethod]: this.data.taxObj.deductionMethod
    })
  },
  // 子女数
  childrenCountFn(e){
    if (this.data.selectedChild == e.target.dataset.selectedchild) {
      this.data.selectedChild = ""
    }else{
      this.data.selectedChild = e.target.dataset.selectedchild;
    } 
    var childrenCount = "taxObj.childrenCount";
    this.setData({
      selectedChild: this.data.selectedChild,
      [childrenCount]: this.data.selectedChild !=3 ?this.data.selectedChild :0
    })
  },
  childrenChangeFn(e){
    var childrenCount = "taxObj.childrenCount";
    this.setData({
      selectedChild:3,
      [childrenCount]: e.detail.value
    })
  },

  // 教育类型
  educationTypeFn(e){
    if (this.data.taxObj.educationType == e.target.dataset.educationtype) {
      this.data.taxObj.educationType = ""
    } else {
      this.data.taxObj.educationType = e.target.dataset.educationtype;
    }
    var educationType = "taxObj.educationType"
    this.setData({
      [educationType]: this.data.taxObj.educationType
    }) 
  },

  // 兄妹数
  brotherCountFn(e) {
    console.log(e);
    if (this.data.selectedBrother == e.target.dataset.selectedbrother) {
      this.data.selectedBrother = ""
    } else {
      this.data.selectedBrother = e.target.dataset.selectedbrother;
    }
    var brotherCount = "taxObj.brotherCount";
    this.setData({
      selectedBrother: this.data.selectedBrother,
      [brotherCount]: this.data.selectedBrother
    })
  },
  brotherChangeFn(e) {
    var brotherCount = "taxObj.brotherCount";
    this.setData({
      selectedBrother : 3,
      [brotherCount]: e.detail.value
    })
  },

// 住房支出
  housingFn(e){
    if (this.data.taxObj.housing == e.target.dataset.housing) {
      this.data.taxObj.housing = ""
    } else {
      this.data.taxObj.housing = e.target.dataset.housing;
    }
    var housing = "taxObj.housing";
    this.setData({
      [housing]: this.data.taxObj.housing
    })
  },

  // 开始计算个税函数
  calcFn(){
    this.validateFn();
  },
/**
 * 数据校验
 */
validateFn(){
  // 收入
  this.data.taxObj.income = parseFloat(this.data.taxObj.income || 0);
  if (!this.data.taxObj.income) {
    this.toast("请输入收入 !");
    return;
  }

  // 收入不能低于无险一金
  this.data.taxObj.fiveInsurancePayment = parseFloat(this.data.taxObj.fiveInsurancePayment || 0);
  if(this.data.taxObj.income < this.data.taxObj.fiveInsurancePayment){
    this.toast("收入不能比五险一金少!");
    return;
  }

  this.data.taxObj.childrenCount = parseFloat(this.data.taxObj.childrenCount || 0);
  if (this.data.taxObj.deductionMethod) {
    // 没选中子女输入框 或者已选中输入框,子女个数为0
    if (!this.data.selectedChild ||(this.data.selectedChild && !this.data.taxObj.childrenCount )) {
      this.toast("请输入子女个数!");
      return;
    }
  }
  if (this.data.selectedChild && this.data.taxObj.childrenCount) {
    if (!this.data.taxObj.deductionMethod) {
      this.toast("请选择夫妻抵扣方式!");
      return;
    }
  }
  var taxCalResultObj = this.calculate().taxCalResultObj;//专项附加控扣除费用
  var taxDectionDetail = this.calculate().taxDectionDetail;//专项附加控扣除费用

  wx.navigateTo({
    url: '../salaryCalResult/salaryCalResult?taxCalResultObj=' + JSON.stringify(taxCalResultObj) +"&taxDectionDetail="+JSON.stringify(taxDectionDetail),
  })

},
/**
 * 开始计算处理函数
 */
  calculate(){
  // 专项附加扣除费用项目
   var deductionAmount = 0;
      // 子女教育费
  if (this.data.taxObj.deductionMethod == 2){//夫妻共同使用
      deductionAmount += this.data.taxObj.childrenCount *1000/2;
    this.data.taxDectionDetail.spChildrenEdu = parseFloat(this.data.taxObj.childrenCount * 1000 / 2).toFixed(2);
    } else if (this.data.taxObj.deductionMethod == 1){
      deductionAmount += this.data.taxObj.childrenCount * 1000 ;
    this.data.taxDectionDetail.spChildrenEdu = parseFloat(this.data.taxObj.childrenCount * 1000).toFixed(2) ;
  }

    // 继续教育
    if (this.data.taxObj.educationType == 1){//学历学位
      deductionAmount += 400;
      this.data.taxDectionDetail.spContinueEdu = '400.00' ;
    } else if (this.data.taxObj.educationType == 2){
      deductionAmount += 3600/12;
      this.data.taxDectionDetail.spContinueEdu = '300.00' ;
    }
    // 赡养老人
    if (parseFloat(this.data.taxObj.brotherCount) && parseFloat(this.data.taxObj.brotherCount)>0){
      deductionAmount += 2000 / parseFloat(this.data.taxObj.brotherCount);
      this.data.taxDectionDetail.spSupportParents =parseFloat(2000 / parseFloat(this.data.taxObj.brotherCount)).toFixed(2);
    }
    // 住房支出
    switch (this.data.taxObj.housing){
      case "1": deductionAmount += 1000; this.data.taxDectionDetail.spHousingInterest ="1000.00"; break;
      case "2": deductionAmount += 1500;  this.data.taxDectionDetail.spHousingRent="1500.00"; break;
      case "3": deductionAmount += 1100;  this.data.taxDectionDetail.spHousingRent="1100.00";break;
      case "4": deductionAmount += 800;   this.data.taxDectionDetail.spHousingRent="800.00"; break;
      default:break;
    }
    deductionAmount = deductionAmount.toFixed(2);
    // 收入
    var income = parseFloat(this.data.taxObj.income).toFixed(2);//收入
    //五险一金
    var welfare = parseFloat(this.data.taxObj.fiveInsurancePayment || 0).toFixed(2);
    var taxableIncome = income - welfare;//减掉五险一金后的月收入
    // 税改前
    var taxOld = this.calculateTax(this.data.oldTaxRateTable, taxableIncome, 3500).toFixed(2);
    // 税改后
    var taxNew = this.calculateTax(this.data.newTaxRateTable, taxableIncome - deductionAmount, 5000).toFixed(2);
    // 应纳税所得额--税改前
    var oldTaxableIncome = taxableIncome - 3500;
    // 应纳税所得额--税改后
    var newTaxableIncome = (taxableIncome - deductionAmount - 5000).toFixed(2);
    // 实发工资月薪--税改前
    var oldActualSalary = (income - welfare - taxOld).toFixed(2);
    // 实发工资月薪--税改后
    var newActualSalary = (income - welfare - taxNew).toFixed(2);
    // 实发年薪--税改前
    var oldActualAnnualIncome = (oldActualSalary * 12).toFixed(2);
    // 实发年薪--税改后
    var newActualAnnualIncome = (newActualSalary * 12).toFixed(2);
    // 每月少缴税额
    var taxDiff = (taxOld - taxNew).toFixed(2);
    // 每年到手增加
    var actualAnnualIncomeDiff = (newActualAnnualIncome - oldActualAnnualIncome).toFixed(2);

    var taxAllInfo = {
      taxDectionDetail:this.data.taxDectionDetail,
      taxCalResultObj:{
        income: income,//收入
        welfare: welfare,//五险一金
        taxOld: taxOld,//税改前纳税
        taxNew: taxNew,//税改后纳税
        oldTaxableIncome: Math.max(oldTaxableIncome, 0),//应纳税所得额--税改前
        newTaxableIncome: Math.max(newTaxableIncome, 0),//应纳税所得额--税改后
        oldActualSalary: oldActualSalary, // 实发工资月薪--税改前
        newActualSalary: newActualSalary,// 实发工资月薪--税改后
        oldActualAnnualIncome: oldActualAnnualIncome,// 实发年薪--税改前
        newActualAnnualIncome: newActualAnnualIncome,// 实发年薪--税改后
        taxDiff: taxDiff,// 每月少缴税额
        actualAnnualIncomeDiff: actualAnnualIncomeDiff,// 每年到手增加
        deductionAmount: deductionAmount// 专项附加扣除费
      }
    }
    return taxAllInfo
  },
  /**
   * 计算个税
   * @param {*} taxRateTable 税率表
   * @param {*} income 收入
   * @param {*} base 基数
   */
  calculateTax (taxRateTable, income, base) {
    income -= base;
    if (income <= 0) {
      return 0;
    }
    for (var i = 0; i < taxRateTable.length; i++) {
      var item = taxRateTable[i];
      if (item.min < income) {
        if (item.max) {
          if (item.max >= income) {
            return income * item.rate - item.deduction;
          }
        } else {
          return income * item.rate - item.deduction;
        }
      }
    }
    return 0;
  },

  // 打开弹框
  openDialog(e){
    console.log("e",e)
    this.setData({
      dialognum:e.target.dataset.dialognum,
      popHide: false,
      popDialog: e.target.dataset.dialognum
    })
    var app = getApp();
    console.log("app", app)
    // Page({}).style.overflow="hidden"
  },

  // 关闭弹框
  closeDialog(){
    this.setData({
      dialognum:"",
      popHide:true,
      popDialog:""
    })
  },

  // 提示框
  toast(message){
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    })
  },


// 工资条
  /**
    * 手机号输入事件
    */
  phoneChangeFn(e) {
    var phoneStr = this.data.user.telphone;
    this.data.user.telphone = e.detail.value;
    if (this.data.user.telphone != "") {
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
    this.data.telphoneFocus = false;
    var phoneStr = 'user.telphone';
    this.data.user.telphone = "";
    this.setData({
      telphoneFocus: false,
      telphoneValid: false,
      [phoneStr]: "",
      isTelPhoneNull: true
    })
    if (this.data.telphoneValid && this.data.user.code) {
      this.data.isValidate = true;
      this.setData({ isValidate: true })
    } else {
      this.setData({ isValidate: false })
    }
  },
  getTelphoneCodeFn() {
    var that = this, times = 120;   // 定义120秒的倒计时
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
  
    this.data.codeV = setInterval(function () {
      that.setData({
        getCodeText: --times + 's',
        isTelPhoneNull: false
      })
      if (times <= 0) {
        clearInterval(that.data.codeV);
        that.setData({
          getCodeText: '获取验证码',
          isTelPhoneNull: false
        })
      }
    }, 1000)  //  1000是1秒
    var sendParams = {
      source: getApp().globalData.hasFubao ? 'service' : 1,
      orgId: getApp().globalData.orgId ? getApp().globalData.orgId : '',
      bookId: getApp().globalData.bookId ? getApp().globalData.bookId : '',
      mobile: this.data.user.telphone
    }
    if (this.data.getCodeText !="获取验证码"){
      return;
    }
    networkRequest.POSTRequest("fudai/api/interface/mobile-message", sendParams, true).then(function (res) {
      console.log('res', res);
      if (res.data.success) {
        console.log("验证码发送成功");
      } else {
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
    var lastMonth = commonFun.getCurrentMonthNum();
    // console.log("上一个月份", lastMonth);
    var sendParams = {
      source: getApp().globalData.hasFubao?'service':'1',// service：服宝 其他值：好会计
      orgId: getApp().globalData.orgId?getApp().globalData.orgId:'',
      bookId: getApp().globalData.bookId? getApp().globalData.bookId:'',
      mobile: this.data.user.telphone,
      code: this.data.user.code,
      releasedStatusEnum: 'RELEASED',
      startPeriod: lastMonth,
      endPeriod: lastMonth,
      id: getApp().globalData.hasFubao?getApp().globalData.fubaoId:''
    }
    networkRequest.POSTRequest("fudai/api/interface/pay-roll", sendParams, true).then(function (res) {
      console.log('res', res);
      // if (getApp().globalData.hasFubao){//服宝暂时未开通工资条,给个提示信息
      //   wx.showToast({
      //     title: '尚未下发工资条,暂时不能能查询工资',
      //     icon: 'none',
      //     duration: 2000
      //   })
      //   return;
      // }
      if (res.data.success) {
        var userData = res.data.data;
        wx.navigateTo({
          url: "../salaryResult/salaryResult?sendParams=" + JSON.stringify(sendParams) + "&userData=" + JSON.stringify(userData)
        })
      } else {
          //console.log("系统异常");
          wx.showToast({
              title: res.data.message.message,
              icon: 'none',
              duration: 2000
          })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    /*获取屏幕高度*/
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
    console.log("query",query);
    const options = decodeURIComponent(query.scene)
  
    console.log("首页indexoptions",options);

    if(typeof options == 'string') {
        var newData = options.split('$');
        if (options.indexOf("fubao") == -1){
          app.globalData.bookId = newData[1];
          app.globalData.orgId = newData[0];
          wx.setStorageSync('orgId', newData[0])
          wx.setStorageSync('bookId', newData[1])         
        }else{  
          app.globalData.hasFubao = true;
          app.globalData.fubaoId = newData[1];
          wx.setStorageSync('hasFubao',true)
          wx.setStorageSync('fubaoId', newData[1])
        }
    }else{
      if (options.indexOf("fubao") == -1){
        let bookId = wx.getStorageSync('bookId');
        let orgId = wx.getStorageSync('orgId');
        app.globalData.bookId = bookId;
        app.globalData.orgId = orgId;
      }else{  
        let hasFubao = wx.getStorageSync('hasFubao');
        let fubaoId = wx.getStorageSync('fubaoId');
        app.globalData.hasFubao = true;
        app.globalData.fubaoId = fubaoId;
      }

    }
    console.log("orgId="+app.globalData.orgId,"  bookId="+app.globalData.bookId);
    console.log("hasFubao,fubaoId", app.globalData.hasFubao,app.globalData.fubaoId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("show",this.data.dataType);
    if (this.data.dataType == 1){//工资条
    // this.onLoad();
    clearInterval(this.data.codeV)
    this.setData({
      codeV: "",
      dataType: 1,
      user: {
        telphone: "",
        code: ""
      },
      telphoneFocus: false,
      isTelPhoneNull: true,//输入框是否是空
      telphoneValid: false,//手机号是否满足11位
      getCodeText: "获取验证码",
      isValidate: false//手机号验证码是否都有效
    })
    }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("hide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")
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
      var path = 'pages/index/index?$scene=fubao$' + getApp().globalData.fubaoId
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