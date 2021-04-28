// pages/pay/index.js
import {
  get,
  post,
  getStorageOpenid
} from "../../request/index"
import {
  showModal
} from "../../utils/util"
const app = getApp()
Page({

  data: {
    openId: '',
    listData: [],
    Listids: [],
    allcheck: false,
    CheckedNumber: 0,
    allPrice: 0
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
  clcAllPrice() {
    let arr = [];
    for (let i = 0; i < this.data.listData.length; i++) {
      let element = this.data.listData[i]
      if (element.checked) {
        arr.push(element.goods_id)
      }
    }
    this.setData({
      Listids: arr,
      CheckedNumber: arr.length
    })
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
        allcheck: false,
        CheckedNumber: 0
      })
      let arr = [];
      let arrCont = [];
      for (let i = 0; i < this.data.listData.length; i++) {

        const element = this.data.listData[i]
        element.checked = false;
        arrCont.push(element)
      }
      this.setData({
        Listids: arr,
        listData: arrCont,
      })
      this.clcAllPrice();

    } else {
      this.setData({
        allcheck: true
      })
      // 全部选择
      let arr = [];
      let arrCont = [];
      for (let i = 0; i < this.data.listData.length; i++) {

        const element = this.data.listData[i]
        element.checked = true;
        arr.push(element.goods_id)
        arrCont.push(element)
      }
      this.setData({
        Listids: arr,
        listData: arrCont,
        CheckedNumber: this.data.listData.length
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
  handeItemChange(e) {
    // 1 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    // 2 获取购物车数组 
    let {
      listData
    } = this.data;
    // 3 找到被修改的商品对象
    let index = listData.findIndex(v => v.goods_id === goods_id);
    // 4 选中状态取反
    listData[index].checked = !listData[index].checked;

    let arr = [];
    let count = 0;
    let temp = false;
    for (let i = 0; i < this.data.listData.length; i++) {
      let element = this.data.listData[i]
      if (element.checked) {
        count++;
      }
    }
    if (count == this.data.listData.length) {
      temp = true
    } else {
      temp = false
    }
    this.setData({
      listData: listData,
      allcheck: temp
    });
    this.clcAllPrice()
  },
  async handleItemNumEdit(e) {
    // 1 获取传递过来的参数 
    const {
      operation,
      id
    } = e.currentTarget.dataset;
    // 2 获取购物车数组
    let {
      listData
    } = this.data;
    // 3 找到需要修改的商品的索引
    const index = listData.findIndex(v => v.goods_id === id);
    // 4 判断是否要执行删除
    if (listData[index].number === 1 && operation === -1) {
      // 4.1 弹窗提示
      let that = this
      wx.showModal({
        title: '提示',
        content: '你真的要删掉这个商品吗',
        success(res) {
          if (res.confirm) {
            listData.splice(index, 1);
            that.setData({
              listData: listData
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    } else {
      // 4  进行修改数量
      //console.log(listData[index])
      //console.log(operation)
      listData[index].number += operation;
      // 5 设置回缓存和data中
      this.setData({
        listData: listData
      });
    }
    this.clcAllPrice()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openId: app.globalData.userInfo.openid || '',
    })
    this.getListData();
    this.setData({
      allcheck:false
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
      openId: app.globalData.userInfo.openid || '',
    })
    this.getListData()
    this.setData({
      allcheck:false
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
      openId: app.globalData.userInfo.openid || '',
    })
    this.getListData()
    this.setData({
      allcheck:false
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