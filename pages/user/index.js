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
        url: "/pages/my_buy_list/index"
      },
      {
        title: "我的收藏",
        icon: "icon-xihuan",
        url: "/pages/collect/index"
      },
      {
        title: "地址管理",
        icon: "icon-lishi",
        url: "/pages/addaddress/index"
      },
      {
        title: "联系客服",
        icon: "icon-xiaoxi",
        url: "/pages/customer/index"
      },
      {
        title: "帮助中心",
        icon: "icon-anquan",
        url: "/pages/help_center/index"
      },
      {
        title: "意见反馈",
        icon: "icon-shezhi",
        url: "/pages/feedback/index"
      }
    ],
    avator: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png',
    allcheck: false,
    userInfo: {},
    Listids: []
  },
  goTo (event) {
    console.log(event)
    wx.navigateTo({
      url: this.data.listData[event.currentTarget.id].url
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
    this.setData({
      openId :  app.globalData.userInfo.openid || '',
      avator:app.globalData.userInfo.avatarUrl || '',
      userInfo:app.globalData.userInfo
    })
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
    this.setData({
      openId :  app.globalData.userInfo.openid || '',
      avator:app.globalData.userInfo.avatarUrl || '',
      userInfo:app.globalData.userInfo
    })
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