// pages/search/index.js
import {
  request,
  get,
  post,
  getStorageOpenid
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    words: '',
    openid: '',
    hotData: [],
    historyData: [],
    tipsData: [],
    order: '',
    listData: [],
    nowIndex: 0
  },
  clearInput() {
    this.setData({
      words: '',
      listData: []
    })
  },
  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },
  async clearHistory() {
    const data = await post('/search/clearhistoryAction', {
      openId: this.data.openid
    })
    if (data) {
      this.setData({
        historyData: []
      })
    }
  },
  async searchWordsElse(e) {
    // 商品清空
    console.log(e)
    let value = e.currentTarget.id
    this.setData({
     words: value,
     listData: []
   })

   // 展示搜索提示信息
   const res = await get('/search/helperaction', {
     keyword: this.data.words
   })
   this.setData({
     tipsData: res.keywords
   })
  

   this.setData({

   })
   const data = await post('/search/addhistoryaction', {
     openId: this.data.openid,
     keyword: value || this.data.words
   })
   // console.log(data)
   // 获取历史数据
   this.getHotData()
   this.getlistData()
 },
  async searchWords(e) {
     // 商品清空
     let value = e.detail.value
     this.setData({
      words: value,
      listData: []
    })

    // 展示搜索提示信息
    const res = await get('/search/helperaction', {
      keyword: this.data.words
    })
    this.setData({
      tipsData: res.keywords
    })
   

    this.setData({

    })
    const data = await post('/search/addhistoryaction', {
      openId: this.data.openid,
      keyword: value || this.data.words
    })
    // console.log(data)
    // 获取历史数据
    this.getHotData()
    this.getlistData()
  },
  async getHotData() {
    const res = await get('/search/indexaction?openId=' + this.data.openid)
    this.setData({
      historyData: res.historyData,
      hotData: res.hotKeywordList
    })
    // console.log(data)
  },
  async getlistData() {
    // 获取商品列表
    const data = await get('/search/helperaction', {
      keyword: this.data.words,
      order: this.data.order
    })
    this.setData({
      listData: data.keywords,
      tipsData: []
    })

    console.log(data)
  },
  changeTab(e) {
    let index = e.currentTarget.id;
    this.setData({
      nowIndex: index
    })
    if (index === 1) {
      this.setData({
        order: this.data.order == 'asc' ? 'desc' : 'asc'
      })

    } else {
      this.setData({
        order: ''
      })
    }
    this.getlistData()
  },
  goodsDetail(e) {
    console.log(e)
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/goods_detail/index?id=' + id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: getStorageOpenid()
    })
    this.getHotData()
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