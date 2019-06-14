import commonFun from '../../utils/utils.js'
import networkRequest from "../../utils/networkTool.js"
const date = new Date();
var year = date.getFullYear(); //获取完整的年份(4位,1970-????)
var maxEndDate =  year +'- 12';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxEndDate: maxEndDate,
    showDialog:true,
    salaryNull:false,
    employeeName:"",
    departmentName:"",
    date:"",
    scrollDate:"",
    sendParams:{},
    salaryDetail:{
      year: '',
      month: '',
      dept: '',
      name: '',
      pretaxIncome:"",//税前收入
      pensionInsurance:"",//养老保险
      medicalInsurance: "",//医疗保险
      unemploymentInsurance:"",//失业保险
      housingFunds:"",//住房公积金
      totalAmount:"",//合计
      spChildrenEdu:"",//子女教育
      spContinueEdu:"", //继续教育
      spSupportParents:"",// 赡养老人
      spHousingRent:"",// 住房支出
      spSum:"",// 专项扣除合计
      // specificAdded:"",//专项附加扣除
      curMonthTaxIncome:"",//本月纳税所得额
      personalTax:"",//本月个税
      actualIncome:"" //本月实发金额
    }
  },

  bindDateChange(e){
    this.data.date = e.detail.value;
    this.setData({
      date: commonFun.formatTimeStr(e.detail.value)
    })
    
    this.data.sendParams.startPeriod = commonFun.timeConvertNum(e.detail.value);
    this.data.sendParams.endPeriod = commonFun.timeConvertNum(e.detail.value);
    this.getSalaryData(this.data.sendParams);
  },
  //获取薪资函数
  getSalaryData(sendParams){
    var that = this;
    networkRequest.POSTRequest("fudai/api/interface/pay-roll", sendParams, true).then(function (res) {
      console.log('res', res);
      if (res.data.success) {
        var userData = res.data.data;
        console.log(userData)
        var payrollInfo = userData?  userData.payrollInfo[0]:null ;
        console.log(payrollInfo)
        if (payrollInfo){
          that.setData({
            salaryNull: false,//是否查询到薪资
            // date: sendParams.startPeriod,
            employeeName: userData && userData.name ? userData.name:"",
            departmentName: userData && userData.department && userData.department.name ? userData.department.name:"",
            salaryDetail: {
              year: payrollInfo.year ? payrollInfo.year: '',
              month: payrollInfo.month ? payrollInfo.month : '',
              dept: payrollInfo.dept ? payrollInfo.dept: '',
              name: payrollInfo.name ? payrollInfo.name : '',
              pretaxIncome: payrollInfo.salaryIncome ? commonFun.toFixed2(payrollInfo.salaryIncome) : '0.00',
              pensionInsurance: payrollInfo.persPension ? commonFun.toFixed2(payrollInfo.persPension) : '0.00',
              medicalInsurance: payrollInfo.persHeathcareIns ? commonFun.toFixed2(payrollInfo.persHeathcareIns) : '0.00',
              unemploymentInsurance: payrollInfo.persUnemplIns ? commonFun.toFixed2(payrollInfo.persUnemplIns) : '0.00',
              housingFunds: payrollInfo.persHousingFund ? commonFun.toFixed2(payrollInfo.persHousingFund) : '0.00',
              totalAmount: payrollInfo.perSum ? commonFun.toFixed2(payrollInfo.perSum) : '0.00',
              spChildrenEdu: payrollInfo.spChildrenEdu ? commonFun.toFixed2(payrollInfo.spChildrenEdu) : '0.00',//子女教育
              spContinueEdu: payrollInfo.spContinueEdu ? commonFun.toFixed2(payrollInfo.spContinueEdu) : '0.00', //继续教育
              spSupportParents: payrollInfo.spSupportParents ? commonFun.toFixed2(payrollInfo.spSupportParents) : '0.00',// 赡养老人
              spHousingRent: payrollInfo.spHousingRent ? commonFun.toFixed2(payrollInfo.spHousingRent) : '0.00',// 住房支出
              spSum: payrollInfo.spSum ? commonFun.toFixed2(payrollInfo.spSum) : '0.00',// 专项扣除合计
              curMonthTaxIncome: payrollInfo.netTaxableIncome ? commonFun.toFixed2(payrollInfo.netTaxableIncome) : '0.00',
              personalTax: payrollInfo.persIncomeTax ? commonFun.toFixed2(payrollInfo.persIncomeTax) : '0.00',
              actualIncome: payrollInfo.actualIncome ? commonFun.toFixed2(payrollInfo.actualIncome) : '0.00'
            }
          })
        } else {
          that.setData({
            salaryNull: true,//是否查询到薪资
            // date: sendParams.startPeriod,
            employeeName: userData && userData.name ? userData.name:'',
            departmentName: userData && userData.department && userData.department.name ? userData.department.name:''
          })
        }
        
      }else{
        wx.navigateTo({
          url: "../errorFeedBack/errorFeedBack?success=" + res.data.success
        })
      }
    })
    
  },
  // 专项附加扣除弹窗
  showSpecialAddedDialog(){
    this.setData({ showDialog:false})
  },
  hideDialogFn(){
    this.setData({ showDialog: true })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 上个月工资
    var sendParams = JSON.parse(options.sendParams);
    this.data.sendParams = sendParams;
    this.setData({
      sendParams:sendParams
    })
    var userData = JSON.parse(options.userData);
    var payrollInfo = userData ? userData.data.payrollInfo[0]:null ;
 
    this.data.date = commonFun.getCurrentMonth();
    this.data.scrollDate = commonFun.formatTimeStr2(this.data.date);
   
    if (payrollInfo){
      this.setData({
        salaryNull: false,//是否查询到薪资
        date: this.data.date,
        scrollDate: this.data.scrollDate,
        employeeName: userData && userData.name ? userData.name : '',
        departmentName: userData && userData.department && userData.department.name ? userData.department.name : '',
        salaryDetail: {
          year: payrollInfo.year ? payrollInfo.year : '',
          month: payrollInfo.month ? payrollInfo.month : '',
          dept: payrollInfo.dept ? payrollInfo.dept : '',
          name: payrollInfo.name ? payrollInfo.name : '',
          pretaxIncome: payrollInfo.salaryIncome ? commonFun.toFixed2(payrollInfo.salaryIncome) : '0.00',
          pensionInsurance: payrollInfo.persPension ? commonFun.toFixed2(payrollInfo.persPension) : '0.00',
          medicalInsurance: payrollInfo.persHeathcareIns ? commonFun.toFixed2(payrollInfo.persHeathcareIns) : '0.00',
          unemploymentInsurance: payrollInfo.persUnemplIns ? commonFun.toFixed2(payrollInfo.persUnemplIns) : '0.00',
          housingFunds: payrollInfo.persHousingFund ? commonFun.toFixed2(payrollInfo.persHousingFund) : '0.00',
          totalAmount: payrollInfo.perSum ? commonFun.toFixed2(payrollInfo.perSum) : '0.00',
          spChildrenEdu: payrollInfo.spChildrenEdu ? commonFun.toFixed2(payrollInfo.spChildrenEdu) : '0.00',//子女教育
          spContinueEdu: payrollInfo.spContinueEdu ? commonFun.toFixed2(payrollInfo.spContinueEdu) : '0.00', //继续教育
          spSupportParents: payrollInfo.spSupportParents ? commonFun.toFixed2(payrollInfo.spSupportParents) : '0.00',// 赡养老人
          spHousingRent: payrollInfo.spHousingRent ? commonFun.toFixed2(payrollInfo.spHousingRent) : '0.00',// 住房支出
          spSum: payrollInfo.spSum ? commonFun.toFixed2(payrollInfo.spSum) : '0.00',// 专项扣除合计
          curMonthTaxIncome: payrollInfo.netTaxableIncome ? commonFun.toFixed2(payrollInfo.netTaxableIncome) : '0.00',
          personalTax: payrollInfo.persIncomeTax ? commonFun.toFixed2(payrollInfo.persIncomeTax) : '0.00',
          actualIncome: payrollInfo.actualIncome ? commonFun.toFixed2(payrollInfo.actualIncome) : '0.00'
        }
      })
    }else{
      this.setData({
        salaryNull: true,//是否查询到薪资
        date: this.data.date,
        scrollDate: this.data.scrollDate,
        employeeName: userData && userData.name ? userData.name : '',
        departmentName: userData && userData.department && userData.department.name ? userData.department.name : ''
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