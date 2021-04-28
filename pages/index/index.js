// pages/goods_list/index.js
import { request,get,post } from "../../request/index"
const app = getApp() 
Page({
  data: {
    swiperlist: [],
    channel:[],
    brandList:[],
    newGoods:[],
    hotGoods:[],
    topicList:[],
    newCategoryList:[],
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var reqTask = wx.request({
    //   url: 'http://localhost:5757/lm/index/index',
    //   success: (result) => {
    //     this.setData({
    //       swiperlist:result.data.banner
    //     })
    //   },
    //   fail: () => {
    //     console.log("fail");
    //   },
    //   complete: () => {}
    // });
    this.getDataIndex();
    this.setData({
      openId :  app.globalData.userInfo.openid || '',
      userInfo:  app.globalData.userInfo||''
    })

  },
  onShow: function () {
    this.getDataIndex();
    this.setData({
      openId :  app.globalData.userInfo.openid || '',
      userInfo:  app.globalData.userInfo||''
    })
  },
  onPullDownRefresh: function () {
    this.getDataIndex();
    this.setData({
      openId :  app.globalData.userInfo.openid || '',
      userInfo:  app.globalData.userInfo||''
    })
  },

  async getDataIndex(){
    const data = await get('/index/index') // http://localhost:5757/lm/index/index
    console.log(data)
    this.setData({
      swiperlist:data.banner,
      channel:data.channel,
      brandList:data.brandList,
      newGoods:data.newGoods,
      hotGoods:data.hotGoods,
      topicList:data.topicList,
      newCategoryList:data.newCategoryList,
    })
  },
  // jumpto(){
  //   console.log("click")
  //   wx.redirectTo({
  //     url:"/pages/goods_detail/index?id="+id
  //   })
  // }
})
  