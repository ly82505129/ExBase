import { DB } from "../../db/DB.js";
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var marketList=new DB();
    this.marketList = marketList.getAllMarkList()[0];
    var marketUrl = app.globalData.exbaseBaseUrl + "GetTicker?market=" + this.marketList.market[0] + "&base=" + this.marketList.marketBase;
    // console.log("打印日志"+marketList.getAllMarkList().market+"打印日志");
    this.getMarketList(marketUrl);

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
    
  },

  getMarketList:function(url){
    var that=this;
    wx.request({
      url: url,
      method:'GET',
      header:{
        "content-type":"json"
      }
      ,
      success:function(res){
        console.log(res.data);
        that.loadMarketData(res);
        
       },
      fail:function(error){
        console.log(error);
      }
    })
  },

  loadMarketData:function(res){
    this.setData(res);
    console.log(this.data)
  }

})