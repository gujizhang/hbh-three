// pages/topic/index.js
import {
  get
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    topicList: [],
    total: ''
  },
  async getListData(first) {
    const res = await get('/topic/listaction', {
      page: this.data.page
    })
    console.log(res)
    this.setData({
      total : res.total
    })
    if (first) {
      this.setData({
        topicList :res.data
      })
    } else {
      this.setData({
        topicList : this.data.topicList.concat(res.data)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData(true)
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
  onPullDownRefresh() {
    this.page = 1
    this.getListData()
    wx.stopPullDownRefresh()
  },
  onReachBottom() {
    this.page = this.page + 1
    if (this.page > this.total) {
      return false
    }
    this.getListData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})