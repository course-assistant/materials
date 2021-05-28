import Fly from 'flyio/dist/npm/wx'
import qs from 'qs';


const fly = new Fly;
const MyHttp = {};

//设置超时
fly.config.timeout = 30000;

//设置请求基地址
fly.config.baseURL = "http://127.0.0.1:8686/"
// fly.config.baseURL = "https://tanyiqu.top:8686/"


MyHttp.install = (Vue) => {

  // 封装get请求
  Vue.prototype.$get = (path, params) => {
    // 获取token
    let token = wx.getStorageSync('hncj_assistant_wx_user_token');
    // 设置headers，每次请求获取一次
    fly.config.headers = {
      token: token
    }
    // 发送请求
    return new Promise((resolve, reject) => {
      fly.get(path, params).then(res => {
        if (res.data.code === 200) {
          resolve(res.data);
        } else if (res.data.code === 300) {
          resolve(res.data.msg);
        } else if (res.data.code === 400) {
          reject(res.data.msg);
        }
      }).catch(err => {
        reject('服务器异常');
      });
    });
  }


  // 封装post请求
  Vue.prototype.$post = (path, params) => {
    // 获取token
    let token = wx.getStorageSync('hncj_assistant_wx_user_token');
    // 设置headers，每次请求获取一次
    fly.config.headers = {
      token: token
    }
    // 发送请求
    return new Promise((resolve, reject) => {
      fly.post(path, qs.stringify(params)).then(res => {
        if (res.data.code === 200) {
          resolve(res.data);
        } else if (res.data.code === 400) {
          reject(res.data.msg);
        }
      }).catch(err => {
        reject('服务器异常');
      });
    });
  }
};

export default MyHttp
