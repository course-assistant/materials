<template>
  <div class="login">
    <img class="logo" src="https://cn.vuejs.org/images/logo.png" alt="" />

    <div class="form">
      <van-cell-group>
        <van-field
          @change="usernameChange"
          clearable
          label="用户名"
          placeholder="请输入账号"
          value="888888888"
        />
        <van-field
          @change="passwordChange"
          clearable
          type="password"
          label="密码"
          placeholder="请输入密码"
          value="000000"
        />
        <van-dropdown-menu>
          <van-dropdown-item
            :value="loginForm.type"
            :options="types"
            @change="typeChange"
          />
        </van-dropdown-menu>
      </van-cell-group>
    </div>

    <van-button class="btn-login" type="primary" block @click="handleLogin">
      登录
    </van-button>

    <van-divider contentPosition="center">其他登录</van-divider>
    <div class="other-login">
      <i
        class="iconfont icon-qq"
        style="color: #0e90d2"
        @click="handleOtherLogin"
      ></i>
      <i
        class="iconfont icon-weibo"
        style="color: #dd514c"
        @click="handleOtherLogin"
      ></i>
      <i
        class="iconfont icon-weixin"
        style="color: #5eb95e"
        @click="handleOtherLogin"
      ></i>
    </div>

    <van-notify id="van-notify" />
  </div>
</template>

<script>
import Notify from '../../../static/vant/notify/notify';
import MD5 from '../../util/MD5Util.js';

export default {
  data() {
    return {
      loginForm: {
        username: '888888888',
        password: '000000',
        type: 2,
      },

      types: [
        { text: '教师', value: 2 },
        { text: '学生', value: 3 },
      ],
    }
  },
  methods: {


    async handleLogin() {
      // 显示加载框
      this.$loading('登录中...');

      // 判断登录
      let [data, err] = await this.$awaitWrap(this.$post('login', {
        username: this.loginForm.username,
        password: MD5(this.loginForm.password),
        type: this.loginForm.type
      }));
      if (err) {
        Notify({ type: 'danger', message: err });
        toast.clear();
        return;
      }
      // 登录成功，获取token
      wx.setStorageSync('hncj_assistant_wx_user_token', data.data.token);
      wx.setStorageSync('hncj_assistant_wx_user_type', this.loginForm.type);
      wx.setStorageSync('hncj_assistant_wx_user_id', data.data.id);

      // 获取详细信息，然后存到storage里
      let id = await wx.getStorageSync('hncj_assistant_wx_user_id');
      if (this.loginForm.type === 2) {
        [data, err] = await this.$awaitWrap(this.$get('teacher/selectbyid', {
          id
        }));
      } else {
        [data, err] = await this.$awaitWrap(this.$get('student/selectbyid', {
          id
        }));
      }
      // console.log(data);
      // 存储用户的姓名、头像
      if (this.loginForm.type === 2) {
        wx.setStorageSync('hncj_assistant_wx_user_name', data.data.teacher_name);
        wx.setStorageSync('hncj_assistant_wx_user_avatar', data.data.teacher_avatar);
      } else {
        wx.setStorageSync('hncj_assistant_wx_user_name', data.data.student_name);
        wx.setStorageSync('hncj_assistant_wx_user_avatar', data.data.student_avatar);
      }
      // 清除加载框
      wx.hideLoading();

      Notify({ type: 'success', message: '登录成功' });
      setTimeout(() => {
        // 根据type跳转到对应页面
        if (this.loginForm.type === 2) {
          // 教师
          wx.redirectTo({ url: '/pages/teacher-main/main' });
          return;
        }
        // 学生
        wx.redirectTo({ url: '/pages/student-main/main' });
      }, 800);
    },


    // 点击其他登录
    handleOtherLogin() {
      Toast('暂时没用此功能');
    },

    // 监听数据变化并赋值的函数
    usernameChange(event) {
      this.loginForm.username = event.mp.detail;
    },
    passwordChange(event) {
      this.loginForm.password = event.mp.detail;
    },
    typeChange(event) {
      this.loginForm.type = event.mp.detail;
    }

  },
}
</script>

<style lang="scss" scoped>
.login {
  text-align: center;

  .logo {
    width: 250rpx;
    height: 250rpx;
    margin: 80rpx 0;
  }

  .form {
    margin-bottom: 10rpx;

    .select-type {
      width: 50%;
    }
  }

  .other-login {
    display: flex;
    justify-content: center;

    i {
      margin: 0 36rpx;
      font-size: 80rpx;
    }
  }
}
</style>