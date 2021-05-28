<template>
  <div class="container">
    <div class="login-div">
      <div class="left">
        <form>
          <p class="title">教师登录</p>
          <input
            type="text"
            class="input"
            v-model="formData.username"
            placeholder="请输入工号"
          />
          <input
            type="password"
            class="input"
            v-model="formData.password"
            placeholder="请输入密码"
          />
          <el-checkbox
            v-model="rememberMe"
            style="float: left; margin: 10px 0 0 30px"
          >
            下次直接登录
          </el-checkbox>
          <el-button
            @click="handleLogin"
            class="btn-login"
            type="primary"
            style="width: 308px; margin-top: 16px"
            round
            >登录
          </el-button>

          <div class="options">
            <p style="float: left; margin-left: 40px">注册</p>
            <p style="float: right; margin-right: 40px">验证</p>
          </div>
        </form>
      </div>

      <div class="right">
        <div class="qr-div">
          <img src="../assets/img/qr.png" alt="" />
        </div>

        <p>微信扫一扫使用小程序端</p>
      </div>
    </div>
  </div>
</template>

<script>
import MD5Util from '@/util/MD5Util';

export default {
  data() {
    return {
      rememberMe: false,
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin() {
      // 空字符串判断
      if (this.formData.username.trim() === '' || this.formData.password.trim() === '') {
        this.$message.warning('用户名和密码不能为空 ！');
        return;
      }

      // 验证用户名和密码
      let [data, err] = await this.$awaitWrap(this.$post('login', {
        username: this.formData.username,
        password: MD5Util(this.formData.password),
        type: 2
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      // 登录成功，将token存入本地存储
      localStorage.setItem('hncj_management_teacher_token', data.data.token);
      localStorage.setItem('hncj_management_teacher_id', data.data.id);
      this.$router.push('/');
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f2f4f7;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-div {
    width: 900px;
    height: 584px;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;

    .left {
      width: 540px;
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;

      form {
        width: 360px;
        height: 465px;
        margin: 68px auto 0;
        // background: pink;

        text-align: center;

        .title {
          width: fit-content;
          margin: 0 auto 16px;
          padding: 0 0 10px 0;
          font-size: 24px;
          border-bottom: solid 2px #3a8bff;
        }

        .input {
          width: 280px;
          height: 46px;
          padding-left: 28px;
          border-radius: 22px;
          margin: 12px 0;
          border: solid 1px #e3e8f0;
          outline: none;
          font-size: 17px;
          &:hover {
            border: solid 1px #3a8bff;
          }

          .btn-login {
            margin-top: 20px;
          }
        }

        .options {
          position: relative;
          p {
            margin-top: 22px;
            color: #3a8bff;
            cursor: pointer;
          }
        }
      }
    }

    .right {
      width: 360px;
      border-left: 1px dashed #f2f2f2;
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;

      text-align: center;

      color: #646873;

      .qr-div {
        margin: 135px auto 0;
        width: 230px;
        height: 230px;
        border-radius: 13px;
        // background: pink;
        border: solid 1px #f2f2f2;
        img {
          width: 190px;
          height: 190px;
          margin-top: 20px;
        }
      }

      p {
        margin-top: 18px;
      }
    }
  }
}
</style>