import {
  post,
  get,
  request,
  getStorageOpenid
} from "../../request/index";
// pages/addaddress/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [{
      name: "guji",
      moblie: "15308319753",
      address: "绵羊",
      is_default: "ture",
      address_detail: "桃子陆"
    }],
    openId: "",
    objData:{}
  },
  backLast() {
    wx.navigateBack({
      delta: 1
    })
  },
  async wxaddress() {
    var that=this;
    console.log(that.data.openId)
    await wx.chooseAddress({
      success: function (res) {
        //console.log("你好")
        var result = encodeURIComponent(JSON.stringify(res));
        //console.log(res);
        that.setData({
          userName: res.userName,
          telNumber: res.telNumber,
          address: res.cityName+res.countyName,
          detailaddress: res.detailInfo,
          checked: 'true',
          openId: that.data.openId,
          addressId: 1
        });
        post('/address/saveAction',{userName:res.userName,telNumber: res.telNumber,
          address: res.cityName+res.countyName,
          detailaddress: res.detailInfo,
          checked: 'true',
          openId: that.data.openId,
          addressId: 0
        })
      },
      fail: function () {
        console.log("你好你是什么垃圾")
      }
    });
  },
  async getAddressList() {
    console.log("我调用了！")
    let _this = this;
    const res = await get("/address/getListAction", {
      openId: _this.data.openId
    });
    console.log(res.data);
    this.setData({
      listData : res.data
    })
  },
  selAddress(event) {
    console.log(event.currentTarget.id)
    wx.setStorageSync('addressId', event.currentTarget.id)
    wx.navigateBack({
      delta: -1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openId: getStorageOpenid()
    })

    this.getAddressList();
    wx.startPullDownRefresh()
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