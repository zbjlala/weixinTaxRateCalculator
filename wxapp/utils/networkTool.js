import Promise from 'es6-promise.js'
import config from 'config.js'

function GETRequest(url,params,isLoading){
  return this.request(url,"GET",params,isLoading)
}

function POSTRequest(url, params, isLoading) {
  return this.request(url, "POST", params, isLoading)
}

function request(url, method, params,isLoading) {
  
  var fullURL = config.config.HOST + url;
  if (isLoading) {
    wx.showLoading({
      title: '加载中',
    })
  }

  return new Promise(function (resolve, reject) {
  wx.request({
    url: fullURL ,
    data: params,
    method: method,
    success: function(res) {
      wx.hideLoading()
      resolve(res);
    },
    fail: function(res) {
      wx.hideLoading()
      wx.showToast({
          title: '系统错误',
          icon: 'none',
          duration: 3000
      })
    },
    complete: function(res) {},
  });
  })
}

module.exports = {
  request:request,
  GETRequest: GETRequest,
  POSTRequest: POSTRequest
}