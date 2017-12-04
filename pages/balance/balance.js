// pages/balance/balance.js
var app = getApp();

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

    var mkList = app.marketList.getAllMarkList().marketBase
    for (var i = 0; i < mkList.length; i++) {
      var url = app.globalData.exbaseBaseUrl + "GetTicker?base=" + mkList[i] + "&market=MCOETH";
      var data = {}
      var diff = [];
      app.utils.get(url, data).then(res => {
         
        // diff.push()
        if (!res.error)
        { console.log(res) 
          diff.push(res.last_price)
          console.log(diff)
          console.log(Math.max(diff))
        }
        
        
      })


    }
  }
  ,





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