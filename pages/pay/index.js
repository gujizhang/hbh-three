// pages/pay/index.js
const app = getApp()
Page({

  data: {
    openId: '',
    listData: [],
    Listids: [],
    allcheck: false
  },
  async getListData() {
    const data = await get('/cart/cartList', {
      openId: this.openId
    })
    console.log(data)
    this.listData = data.data
  },
  changeColor(index, id) {
    if (this.Listids[index]) {
      this.$set(this.Listids, index, false)
    } else {
      this.$set(this.Listids, index, id)
    }
  },
  allCheck() {
    // 先清空选择
    this.Listids = []
    if (this.allcheck) {
      this.allcheck = false
    } else {
      this.allcheck = true
      // 全部选择
      for (let i = 0; i < this.listData.length; i++) {
        const element = this.listData[i]
        this.Listids.push(element.goods_id)
      }
    }
  },
  async orderDown() {
    if (this.Listids.length === 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    // 去除数组中空的false
    let newgoodsid = []
    for (let i = 0; i < this.Listids.length; i++) {
      const element = this.Listids[i]
      if (element) {
        newgoodsid.push(element)
      }
    }
    let goodsId = newgoodsid.join(',')
    const data = await post('/order/submitAction', {
      goodsId: goodsId,
      openId: this.openId,
      allPrice: this.allPrice
    })
    if (data) {
      wx.navigateTo({
        url: '/pages/order/main'
      });
    }
  },   isCheckedNumber () {
    let number = 0
    for (let i = 0; i < this.Listids.length; i++) {
      if (this.Listids[i]) {
        number++
      }
    }
    if (number == this.listData.length && number !== 0) {
      this.allcheck = true
    } else {
      this.allcheck = false
    }
    return number
  },
  allPrice () {
    let Price = 0
    for (let i = 0; i < this.Listids.length; i++) {
      if (this.Listids[i]) {
        Price += this.listData[i].retail_price * this.listData[i].number
      }
    }
    return Price
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openId :  app.globalData.userInfo.openid || '',
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