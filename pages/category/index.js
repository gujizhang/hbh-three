// pages/category/index.js
import {
  get
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    nowIndex: 0,
    id: '1005000',
    detailData: {}
  },
  tosearch() {
    wx.navigateTo({
      url: '/pages/search/index'
    });
  },
  async begin(){
    await this.getListData()
    await this.selectItem({
      currentTarget: {
        id: 0
      }
    })
  },
  async getListData() {
    const res = await get('/category/indexaction')
    .then((res) =>{    
      this.setData({
      listData: res.categoryList
    }) 
    //console.log(this.data.listData)
  })
    // console.log(data)
  },
  async selectItem(event) {
    // 获取右边商品的数据
    //console.log(event)
    this.setData({
      nowIndex: Number(event.currentTarget.id)
    })
    //console.log(this.data.listData)
    const res = await get('/category/currentaction', {
      id: this.data.listData[Number(event.currentTarget.id)].id
    })
    //console.log(res)
    this.setData({
      detailData: res.data.currentOne
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.begin()
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