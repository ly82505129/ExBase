import { DB } from "../../db/DB.js";
const num = require('../../utils/num.js');
var app = getApp();
var marketList = new DB();
var market = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    marketInfo: {},
    market: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */

  /**
 * 接口调用成功处理
 */
  successFun: function (res, selfObj) {
    var a = res.change_percent * 100;
    res.change_percent = num.toDecimal(a) + "%";
    res.market = mkList.market[i]
    console.log(res);
    market.push(res);
    console.log("这里是打印successFUn函数内的market值" + market);
    selfObj.setData({
      marketInfo: market,
    })
  },
  /**
   * 接口调用失败处理
   */
  failFun: function (res, selfObj) {
    console.log('failFun', res)
  },

  onLoad: function (options) {

    var mkList = marketList.getAllMarkList();
    var url = app.globalData.exbaseBaseUrl + "GetTicker";

    for (var i = 0; i < marketList.getAllMarkList().market.length; i++) {
      var params = {
        market: mkList.market[i],
        base: mkList.marketBase
      }
      var marketUrl = app.globalData.exbaseBaseUrl + "GetTicker?market=" + mkList.market[i] + "&base=" + mkList.marketBase;
      this.getMarketList(marketUrl, params, i);
      // app.request.requestGetApi(url, params, this, this.successFun, this.failFun)
    }

    this.setData({
      market: marketList.getAllMarkList().market
    })


  },

  getMarketList: function (url, params, i) {

    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "content-type": "json"
      }
      ,
      success: function (res) {
        that.loadMarketData(res.data, params, i);
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },

  loadMarketData: function (res, params, i) {
    // console.log("这里打印markinfo"+marketInfo);
    res.market = params.market;
    var key = "marketInfo[" + i + "]";
    this.setData({
      [key]: res
    });
    // console.log(this.data)
    // return res;
    // var length=market.length
    // this.market[length]=res;
    // market.push(res);


    console.log("这里是在loadmarketdata里打印的market" + market);



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