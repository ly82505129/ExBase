import { DB } from "../../db/DB.js";
const num = require('../../utils/num.js');
var app = getApp();
var marketList = new DB();
var market = [];
var mkList = marketList.getAllMarkList();
var timer=null;
// var marketUrl = app.globalData.exbaseBaseUrl + "GetTicker?base=" + mkList.marketBase[0].marketBase;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    marketInfo: [],
    market: {},
    listShow: [
      { show: true },
    ],
    marketBaseTab: 0

    // marketBase:[]

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


    // for (var i = 0; i < mkList.marketBase.length;i++){
    //   mkList.marketBase[i].selected=true
    //   console.log('这里打印marketbase' + kList.marketBase[i])
    // }

    mkList.marketBase.forEach(
      function (i, b) {

        var mlist = {};
        mlist.marketBase = i;
        mlist.selected = true;
        mlist.mk_id = b;
        mkList.marketBase[b] = mlist;
      }
    )


    this.setData({
      marketBase: mkList.marketBase,
    })
    // var params = {
    //   market: mkList.market[i],
    //   base: mkList.marketBase
    // }
    var marketUrl = app.globalData.exbaseBaseUrl + "GetTicker?base=" + mkList.marketBase[0].marketBase;
    this.getMarket(marketUrl);


    // this.setData({
    //   market: marketList.getAllMarkList().market
    // })
  },

  getMarket: function (url) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: 'json',
      success: function (res) {
        that.loadMarketData(res.data);
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },

  loadMarketData: function (res) {
    // console.log("这里打印markinfo"+marketInfo);
    console.log('这里打印marketinfo的长度' + this.data.marketInfo.length)

    // var key = "marketInfo[" + i + "]";
    /*1.修改res中的对象，将change_percent换成百分比并保留两位小叔，
      2.往res中增加对象，将market交易对放入到res中
    */
    // var  market=[res];
    // console.log(market.length)
    for (var i in res) {
      var btcUsdt = res["BTC_USDT"].last_price
      var ethUsdt = res["ETH_USDT"].last_price
      res[i].change_percent = num.toDecimal(res[i].change_percent);
      res[i].market = i.replace('_', '/');

      var base = i.split("_");
      if (base[1] === "BTC") {
        res[i].price_cny = num.toDecimal(res[i].last_price * btcUsdt * mkList.finance)
      } else if (base[1] === "ETH") {
        res[i].price_cny = num.toDecimal(res[i].last_price * ethUsdt * mkList.finance)
      } else {
        res[i].price_cny = num.toDecimal(res[i].last_price * mkList.finance)
      }
      // res[i].price_cny=
    }
    // res.change_percent = num.toDecimal(res.change_percent * 100) + "%";
    // res.market = params.market;

    this.setData({
      marketInfo: res
    });
    // console.log(this.data)
    // return res;
    // var length=market.length
    // this.market[length]=res;
    // market.push(res);

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
    var marketUrl = app.globalData.exbaseBaseUrl + "GetTicker?base=" + mkList.marketBase[0].marketBase;
    var that=this;
    timer=setInterval(function(){
      that.getMarket(marketUrl)
    },2000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(timer)
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

  },

  showContent: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var key = "listShow[" + index + "].show";
    var val = this.data.listShow[index].show;
    console.log(val);
    this.setData({
      [key]: !val
    })

  },    // 切换当前选择的分类
  changeMarketBase(event) {
    var chid = event.target.dataset.id
    // 获取ccurrentTab.没有切换分类
    if (this.data.marketBaseTab === chid) {
      return false
    }
    this.setData({ marketBaseTab: chid })
    console.log(this.data.marketBase[chid])
    var marketUrl = app.globalData.exbaseBaseUrl + "GetTicker?&base=" + this.data.marketBase[chid].marketBase;
    this.getMarket(marketUrl);
  }

})