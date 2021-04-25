// pages/pay/index.js
import { get, post, getStorageOpenid } from "../../request/index"
const app = getApp()
Page({

  data: {
    openId: '',
    listData: [],
    Listids: [],
    allcheck: false,
    CheckedNumber:0,
    allPrice:0
  },
  async getListData() {
    const res = await get('/cart/cartList', {
      openId: this.data.openId
    })
    console.log(res)
    this.setData({
      listData: res.data
    })
  },
  clcAllPrice () {
    let Price = 0
    for (let i = 0; i < this.data.Listids.length; i++) {
      if (this.data.Listids[i]) {
        Price += this.data.listData[i].retail_price * this.data.listData[i].number
      }
    }
    this.setData({
      allPrice: Price
    })
  },
  allCheck() {
    // 先清空选择
    this.data.Listids = [],
    this.setData({
      allPrice: 0
    })
    if (this.data.allcheck) {
      this.setData({
        allcheck : false,
        CheckedNumber:0
      })
    } else {

      this.setData({
        allcheck : true
      })
      // 全部选择
      let arr=[];
      for (let i = 0; i < this.data.listData.length; i++) {
        const element = this.data.listData[i]
        arr.push(element.goods_id)
      }
      this.setData({
        Listids:arr,
        CheckedNumber:this.data.listData.length
      })
      this.clcAllPrice();
      console.log("已经进入")
    }
  },
  async orderDown() {
    if (this.data.Listids.length === 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    // 去除数组中空的false
    let newgoodsid = []
    for (let i = 0; i < this.data.Listids.length; i++) {
      const element = this.data.Listids[i]
      if (element) {
        newgoodsid.push(element)
      }
    }
    let endgoodsId = newgoodsid.join(',')
    const data = await post('/order/submitAction', {
      goodsId: endgoodsId,
      openId: this.data.openId,
      allPrice: this.data.allPrice
    })
    console.log(data)
    if (data) {
      wx.navigateTo({
        url: '/pages/order/index'
      });
    }
  },   

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openId :  app.globalData.userInfo.openid || '',
    })
    this.getListData()
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