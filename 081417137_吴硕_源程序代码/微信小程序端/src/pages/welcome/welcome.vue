<template>
  <div class="container">
    <img class="logo" src="https://cn.vuejs.org/images/logo.png" alt="" />

    <van-notify id="van-notify" />
  </div>
</template>

<script>
import Notify from '../../../static/vant/notify/notify';

export default {
  // 在挂载前判断是否登录，没有登录信息就跳转至登录页面
  async beforeMount() {
    // 判断授权，跳转至对应页面
    let token = wx.getStorageSync('hncj_assistant_wx_user_token');
    let type = wx.getStorageSync('hncj_assistant_wx_user_type');
    // console.log(token);
    // console.log(type);
    // 没有token
    if (token === '' || type === '') {
      // 跳转登录页面
      wx.redirectTo({ url: '/pages/login/main' });
      return;
    }
    // 有token，进行验证
    let [data, err] = await this.$awaitWrap(this.$post('authentication', {
      token, type
    }));
    // 验证失败
    if (err) {
      Notify({ type: 'danger', message: err });
      setTimeout(() => {
        wx.redirectTo({ url: '/pages/login/main' });
      }, 800);
      return;
    }
    // 验证成功，根据type跳转到对应页面
    if (type === 2) {
      // 到教师页面
      wx.redirectTo({ url: '/pages/teacher-main/main' });
      return;
    }
    // 到学生页面
    wx.redirectTo({ url: '/pages/student-main/main' });
  },
}
</script>


<style lang="scss" scoped>
.container {
  text-align: center;

  .logo {
    width: 400rpx;
    height: 400rpx;
    margin-top: 30%;
  }
}
</style>
