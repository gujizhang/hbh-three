// pages/login/index.js
import {
  get,
  login,
  toLogin
} from '../../request/index'
const app = getApp()
Page({
  data: {
    openid: '',
    res: {},
    code: "",
    loginParams: {}
  },
  getinfo(e) {
    let code = '';
    wx.login({
      success: (res) => {
        code = res.code;
      },
    });
    // 获取用户信息
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '用于完善会员资料',
      success: (res) => {
        let loginParams = {
          code: code,
          encryptedData: res.encryptedData,
          iv: res.iv,
          rawData: res.rawData,
          signature: res.signature
        };

        //console.log(loginParams)
        if (wx.getStorageSync('userInfo')) {
          console.log("从缓存进入")
          app.globalData.userInfo = wx.getStorageSync('userInfo');
          wx.switchTab({
            url: '../index/index'
          })
        } else {
          console.log("从请求进入")
         
          login(loginParams).then(res => {
            console.log(res)
            app.globalData.userInfo = res;
            console.log(app.globalData.userInfo)
            wx.switchTab({
              url: '../index/index'
            })
            wx.setStorage({key: "userInfo",data: res})
            wx.setStorage({key: "openId",data: res.openid})
            // console.log(wx.getStorageSync('userInfo'))
            // console.log(app.globalData.userInfo)
          });

        }

      },
      // 失败回调
      fail: () => {
        // 弹出错误
        //App.showError('已拒绝小程序获取信息');
        console.log("错了")
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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