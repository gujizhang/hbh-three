// pages/goods_detail/index.js
import {request, get, post } from '../../request/index'
const app = getApp() 
var WxParse = require('../../components/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gallery: [], // banner
    id: '1',
    openId: '',
    info: {},
    brand: {},
    showpop: false,
    number: 0,
    attribute: [],
    goods_desc: '',
    issueList: [], // 常见问题
    productList: [],
    collectFlag: false,
    goodsId: '',
    allnumber: 0,
    allPrice: ''
  },
  async goodsDetail () {
    var that = this;
    
    const data = await get('/goods/detailaction', {
      id: this.data.id,
      openId:this.data.openId
    })
    await get('/goods/detailaction', {
      id: this.data.id,
      openId: this.data.openId
    }).then(data => {
       //console.log(data)
        WxParse.wxParse('article', 'html', data.info.goods_desc, this)
    })

    //console.log(data)
    this.setData({
      info : data.info,
      gallery : data.gallery,
      attribute : data.attribute,
      goods_desc : data.info.goods_desc,
      issueList : data.issue,
      productList : data.productList,
      goodsId : data.info.id,
      collectFlag : data.collected,
      allnumber : data.allnumber,
      allPrice : data.info.retail_price,
      brand:data.brand[0]
    });
      
  },
  showType () {
    console.log(this.data.showpop)
    this.setData({
      showpop : !this.data.showpop
    })
  },
  add () {
    this.setData({
      number : 1+this.data.number
    })
    //console.log(this.data.number)
  },
  reduce () {
    if (this.data.number >= 1) {
      this.setData({
        number : -1+this.data.number
      })
    } else {
      return false
    }
  },
  async collect () {
    this.setData({
      collectFlag : !this.data.collectFlag
    })

    const data = await post('/collect/addcollect', {
      goodsId: this.data.goodsId,
      openId:this.data.openId
    })
    console.log(data)
  },
  toCart () {
    wx.switchTab({
      url: '/pages/cart/index'
    });  
  },
  async buy () {
    if (this.data.showpop) {
      if (this.data.number === 0) {
        this.wx.showToast({
          title: '请选择商品数量',
          duration: 2000,
          icon: 'none',
          mask: true,
          success: res => {}
        })
        return false
      }
      //console.log("立即购买进来了1");
      console.log(this.data.number*this.data.allPrice)
      const data = await post('/order/submitAction', {
        goodsId: this.data.goodsId,
        openId: this.data.openId,
        allPrice: this.data.number*this.data.allPrice
      })
      //console.log(data)
      //console.log("立即购买进来了2");
      if (data) {
        wx.navigateTo({
          url: '/pages/order/index'
        });
          
      }
    } else {
      //console.log("立即购买进来了3");
      //console.log()
      this.setData({
        showpop : true
      })
    }
  },
  async addCart () {
   
    if (this.data.showpop) {
      //console.log("加入购物车");
      if (this.data.number == 0) {
        wx.showToast({
          title: '请选择商品数量',
          duration: 2000,
          icon: 'none',
          mask: true,
          success: res => {}
        })
        return false
      }
      //console.log(this.data.goodsId)
      //console.log(this.data.number)
      const result = await post('/cart/addCart', {
        openId: this.data.openId,
        goodsId: this.data.goodsId,
        number: this.data.number
      })
      //.log(result)
      if (result) {
        this.setData({
          allnumber : this.data.allnumber + this.data.number
        })
        wx.showToast({
          title: '添加购物车成功',
          icon: 'success',
          duration: 1500
        })
      }
    } else {
      this.setData({
        showpop : true
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.id)
    this.setData({
      openId :  app.globalData.userInfo.openid || '',
      id : options.id
    })

   
    this.goodsDetail()
    
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
    this.setData({
      openId :  app.globalData.userInfo.openid || '',
      id : options.id
    })

   
    this.goodsDetail()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ()  {
    //console.log(this.info.name)
    return {
      title: this.info.name,
      path: '/pages/goods/index?id=' + this.info.id,
      imageUrl: this.gallery[0].img_url
    }
  },
})