const request = require('./utils/request.js')
// var data=require('./data/data.js')

App({
  request:request,

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
    var storageData = wx.getStorageSync('marketList');
    if (!storageData) {
   
      this.getMarketBase();

    }


  }, 
  getMarketBase:function (){
    var url = this.globalData.exbaseBaseUrl+"/GetExbaseInfo";
    wx.request({
      url: url,
      success: function (res) {
        var dataObj = require("data/data.js")
        dataObj.marketList.marketBase = res.data.base;
        wx.clearStorageSync();
        console.log(dataObj);
        wx.setStorageSync('marketList', dataObj.marketList);
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },
  
  globalData: {
    exbaseBaseUrl: "http://45.77.25.254/api_v1/"
  }
})

  


