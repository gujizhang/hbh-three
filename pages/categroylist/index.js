// pages/categroylist/index.js
import {get} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: [],
    categoryId: '',
    currentNav: {},
    nowIndex: 0,
    goodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async getAllData () {
    const res = await get('/category/categoryNav', {
      id: this.data.categoryId
    })
    // console.log(data)
    this.setData({
      navData : res.navData,
      currentNav:res.currentNav
    })
    for (let i = 0; i < this.data.navData.length; i++) {
      const id = this.data.navData[i].id
      if (id == this.data.currentNav.id) {
        this.data.nowIndex = i
      }
    }


    // 获取商品
    const listData = await get('/goods/goodsList', {
      categoryId: this.data.categoryId
    })
    //console.log(listData.data)
    this.setData({
      goodsList : listData.data
    })

  },
  async changeTab (event) {
    //console.log(event)
    let id = event.currentTarget.id;
    this.setData({
      nowIndex:event.currentTarget.id
    })
    const listData = await get('/goods/goodsList', {
      categoryId: id
    })
    //console.log(listData)
    this.setData({
      goodsList:listData.data,
      currentNav:listData.currentNav
    })
    // 让导航栏滚动到可见区域
    if (this.data.nowIndex > 4) {
      this.data.scrollLeft = this.data.nowIndex * 60
    } else {
      this.data.scrollLeft = 0
    }
  },
  goodsDetail (event) {
    //console.log(event.currentTarget.id)
    wx.navigateTo({
      url: '/pages/goods_detail/index?id=' + event.currentTarget.id
    })
  },
  onLoad: function (options) {
    this.setData({
      categoryId : options.id
    })
    this.getAllData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.setData({
      categoryId : options.id
    })
    this.getAllData()
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
  onPullDownRefresh: function (options) {
    this.setData({
      categoryId : options.id
    })
    this.getAllData()
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