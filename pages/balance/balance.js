// pages/balance/balance.js
var app = getApp();
var mkList = app.marketList.getAllMarkList()
var diff = [];
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

    // var mkList = app.marketList.getAllMarkList().marketBase
    this.loopPromise(0);

  }
  ,

  loopPromise: function (x) {
    var url = app.globalData.exbaseBaseUrl + "GetTicker?base=" + mkList.marketBase[x] + "&market=MCOETH";
    var data = {}

    app.utils.get(url, data).then(res => {

      if (x < mkList.marketBase.length) {
        if (!res.error) {
          diff.push(Number(res.last_price))
        }
        x++
        this.loopPromise(x);
        if (x === mkList.marketBase.length) {
          console.log(diff)
          console.log(Math.max.apply(Math, diff))
          console.log(Math.min.apply(Math, diff))
          var diff_price = Math.max.apply(Math, diff) - Math.min.apply(Math, diff)
          this.setData({
            
          })

        }
      }
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
  onShareAppMessage: function () {

  }
})