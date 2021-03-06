function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}


// ------------------------请求的封装
//const host = "http://localhost:5757"
const host = "https://gujizhang.cn.utools.club"
export { host };

// 请求封装
function request (url, method, data, header = {}) {
  wx.showLoading({
    title: "加载中"
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: {
        "content-type": "application/json"
      },
      success (res) {
        wx.hideLoading();
        resolve(res.data)
      },
      fail (error) {
        wx.hideLoading();
        reject(false)
      },
      complete () {
        wx.hideLoading();
      }
    })
  })
}

export function get (url, data) {
  console.log(data)
  return request(url, 'GET', data)
}
export function post (url, data) {
  //console.log(data)
  return request(url, 'POST', data)
}

export function getStorageOpenid() {
  const openId = wx.getStorageSync('openId')
  console.log("我从缓存拿的openid")
  if (openId) {
    return openId
  } else {
    return '1111111'
  }
}

export function login(infoObj) {

  return get('/login/login',{code:infoObj.code,
    encryptedData:infoObj.encryptedData,
    iv:infoObj.iv
  });
}
export function toLogin() {
  const userInfo = wx.getStorageSync('userInfo')
  if (!userInfo) {
    wx.navigateTo({
      url: '/pages/login/main'
    });
  } else {
    return true
  }
}
  

export default {
  formatNumber,
  formatTime,
  getStorageOpenid
}
