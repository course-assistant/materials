/**
 * 把常用函数封装为插件
 */

const MyUtil = {};

MyUtil.install = (Vue) => {

  Vue.prototype.$$$$$ = () => {

  }

  // async/await 结果处理
  Vue.prototype.$awaitWrap = (promise) => {
    return promise
      .then(data => [data, null])
      .catch(err => [null, err]);
  }


  // 自定义错误处理
  Vue.prototype.$catch = (err) => {
    wx.showToast({
      title: err,
      icon: 'none',
      duration: 3000,
      mask: true
    });
  }


  // toast
  Vue.prototype.$toast = (msg, mask) => {
    let showMask = true;
    if (mask == true) {
      showMask = true;
    } else {
      showMask = false;
    }
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500,
      mask: showMask
    });
  }


  // loading
  Vue.prototype.$loading = (msg) => {
    if (!msg) {
      msg = 'Loading...';
    }
    wx.showLoading({
      title: msg,
      mask: true,
    });
  }


  // 扫码
  Vue.prototype.$scanQR = () => {
    return new Promise((resolve, reject) => {
      wx.scanCode({
        onlyFromCamera: false,
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject('扫描失败');
        }
      });
    });
  }


  // 退出登录
  Vue.prototype.$logout = () => {
    // 清空本地的缓存，并跳转到登录页面
    try {
      wx.removeStorageSync('hncj_assistant_wx_user_token');
      wx.removeStorageSync('hncj_assistant_wx_user_type');
      wx.removeStorageSync('hncj_assistant_wx_user_id');
      wx.removeStorageSync('hncj_assistant_wx_user_name');
      wx.removeStorageSync('hncj_assistant_wx_user_avatar');
    } catch (e) {
      wx.showToast({
        title: '清除缓存失败',
        icon: 'none'
      });
    }
    wx.redirectTo({
      url: '/pages/login/main'
    });
  }


  // 换行符替换为<br>
  Vue.prototype.convertHtml = (str) => {
    return str.replace(/\n/g, '<br>');
  };

};

export default MyUtil
