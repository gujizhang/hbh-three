import { get } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ],
    openId:""
  },

  onShow(options) {
    this.setData({
      openId:wx.getStorageSync("openId")||''
    });
    this.getOrders();
  },
  // 获取订单列表的方法
  async getOrders(type) {
    const res=await get('/order/allListGoods',{openId:this.data.openId})
    console.log(res)
    this.setData({
      orders:res.detailList.map((v,i)=>({...v,create_time_cn:(new Date().toLocaleString()),order_price:res.arrpr[i]}))
    })
    console.log(this.data.orders)
  },
  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex(index) {
    // 2 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const { index } = e.detail;
    this.changeTitleByIndex(index);
    // 2 重新发送请求 type=1 index=0
    this.getOrders(index+1);
  }
})