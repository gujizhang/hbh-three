const computedBehavior = require('miniprogram-computed').behavior
 // 引入自定义 behavior
const app = getApp()

Component({
  behaviors: [computedBehavior],
  data: {
    Listids:[],
    listData:[]
  },

  computed: {
    isCheckedNumber (data) {
      Listids=data.Listids
      listData=data.listData
      let number = 0
      for (let i = 0; i < data.Listids.length; i++) {
        if (data.Listids[i]) {
          number++
        }
      }
      if (number == data.listData.length && number !== 0) {
        data.allcheck = true
      } else {
        data.allcheck = false
      }
      return number
    },
    allPrice (data) {
      Listids=data.Listids
      listData=data.listData
      let Price = 0
      for (let i = 0; i < data.Listids.length; i++) {
        if (data.Listids[i]) {
          Price += data.listData[i].retail_price * data.listData[i].number
        }
      }
      return Price
    },
  },
  methods: {
    allCheck() {
      // 先清空选择
      this.data.Listids = []
      if (this.data.allcheck) {
        this.setData({
          allcheck : false
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
          Listids:arr
        })
        console.log("已经进入")
      }
    }
  }
})