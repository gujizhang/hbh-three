// pages/order/index.js
import { get, post, getStorageOpenid } from '../../request/index'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    price: '',
    allprice: '',
    openId: '',
    addressId: '',
    listData: []
  },
  toAddressList () {
    wx.navigateTo({
      url: '/pages/addaddress/index'
    })
  },
  toAdd () {
    wx.navigateTo({
      url: '/pages/addaddress/index'
    })
  },
  async getDetail () {
    const result = await get('/order/detailAction', {
      openId: this.data.openId,
      addressId: this.data.addressId
    })
    console.log(result)
    if (result) {
      // this.allprice = data.price
      this.setData({
        listData :result.goodsList,
        address : result.address
      })
    }
    console.log(result)
    let temp=0;
    if(this.data.listData){
      this.data.listData.map((item) => {
        temp = Number(item.retail_price * item.number) +temp;
      })
      console.log(temp)
      this.setData({
        allprice:temp
      })
    }else{
      this.setData({
        allprice:result.allprice
      })
    }

  },
  pay () {
    wx.showToast({
      title: '支付功能暂未开发',
      icon: 'none',
      duration: 1500,
      mask: false,
      success: res => {}
    })
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
    if (wx.getStorageSync('addressId')) {
      console.log("我有缓存")
      this.setData({
        addressId : wx.getStorageSync('addressId')
      })
    }
    this.setData({
      openId : app.globalData.userInfo.openid || '',
    })
    console.log("到这了")
    this.getDetail()
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