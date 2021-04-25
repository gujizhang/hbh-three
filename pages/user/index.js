// pages/user/index.js
import { get, login, toLogin } from '../../request/index'
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      {
        title: "我的订单",
        icon: "icon-xiazai",
        url: ""
        
      },
      {
        title: "我的收藏",
        icon: "icon-xihuan",
        url: "/pages/collectlist/main"
      },
      {
        title: "地址管理",
        icon: "icon-lishi",
        url: "/pages/address/main"
      },
      {
        title: "联系客服",
        icon: "icon-xiaoxi",
        url: ""
      },
      {
        title: "帮助中心",
        icon: "icon-anquan",
        url: ""
      },
      {
        title: "意见反馈",
        icon: "icon-shezhi",
        url: "/pages/feedback/main"
      }
    ],
    avator: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png',
    allcheck: false,
    userInfo: {},
    Listids: []
  },
  goTo (url) {
    console.log(123)
    wx.navigateTo({
      url: url
    });
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openId :  app.globalData.userInfo.openid || '',
      avator:app.globalData.userInfo.avatarUrl || '',
      userInfo:app.globalData.userInfo
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