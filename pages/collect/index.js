// pages/collect/index.js
import { get } from '../../request/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    collect:[],
    tabs: [
      {
        id: 0,
        value: "商品收藏",
        isActive: true
      },
      {
        id: 1,
        value: "浏览器足迹",
        isActive: false
      },
    ],
    openId:''
  },
  async getCollect(){
    console.log(this.data.openId)
    const res = await get('/collect/getCollectList',{
      openId:this.data.openId
    })
    this.setData({
      collect:res
    })
  },
  onShow(){
    this.setData({
      collect:wx.getStorageSync("collect")||[],
      openId:wx.getStorageSync("openId")||''
    });
    this.getCollect();
  },
  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const { index } = e.detail;
    // 2 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  }
})