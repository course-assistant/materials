<template>
  <div class="container">
    <div class="teacher-home" v-loading.fullscreen.lock="loading">
      <div class="head">
        <p>账号管理</p>
      </div>

      <div class="form">
        <el-form label-position="left" label-width="80px" :model="formData">
          <el-form-item label="工号">
            <el-input
              v-model="formData.teacher_id"
              disabled
              style="width: 320px; margin-right: 20px"
            ></el-input>
            <el-button
              type="info"
              size="mini"
              @click="cancelAccountDialogVisible = true"
              >注销账户</el-button
            >
          </el-form-item>

          <el-form-item label="头像">
            <el-avatar :size="50" :src="formData.teacher_avatar"></el-avatar>
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="formData.teacher_phone" clearable></el-input>
          </el-form-item>

          <el-form-item label="邮箱">
            <el-input v-model="formData.teacher_email" clearable></el-input>
          </el-form-item>

          <el-form-item label="密码管理">
            <el-button
              type="primary"
              size="mini"
              @click="changePasswordDialogVisible = true"
              >修改密码</el-button
            >
          </el-form-item>
        </el-form>

        <div>
          <el-button type="primary" round @click="onSave">保存</el-button>
        </div>
      </div>
    </div>

    <!-- 对话框 -->
    <!-- 注销对话框 -->
    <el-dialog
      title="注销账户"
      :visible.sync="cancelAccountDialogVisible"
      width="45%"
    >
      <el-form :model="cancelAccountForm" label-position="left">
        <el-form-item label="密 码" label-width="50px">
          <el-input
            v-model="cancelAccountForm.password"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAccountDialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="onCancelAccount"> 确 定 </el-button>
      </div>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="changePasswordDialogVisible"
      width="45%"
    >
      <el-form :model="changePasswordForm" label-position="left">
        <el-form-item label="原 密 码" label-width="90px">
          <el-input
            v-model="changePasswordForm.oldPassword"
            type="password"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="新 密 码" label-width="90px">
          <el-input
            v-model="changePasswordForm.newPassword"
            type="password"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="确认新密码" label-width="90px">
          <el-input
            v-model="changePasswordForm.newPasswordRepeat"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="changePasswordDialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="onChangePassword"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import jwtDecode from '@/util/jwt-decode.js';

export default {
  data() {
    return {
      loading: false,

      formData: {
        teacher_id: '',
        teacher_avatar: '',
        teacher_phone: '',
        teacher_email: ''
      },

      cancelAccountDialogVisible: false,
      cancelAccountForm: {
        password: ''
      },

      changePasswordDialogVisible: false,
      changePasswordForm: {
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: ''
      },
    }
  },

  methods: {
    // 点击保存
    onSave() {
      this.$confirm('是否保存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.loading = true;
        let [data, err] = await this.$awaitWrap(this.$post('teacher/update', {
          id: this.formData.teacher_id,
          phone: this.formData.teacher_phone,
          email: this.formData.teacher_email
        }));
        if (err) {
          this.$message.warning(err);
          return;
        }
        this.loading = false;
        this.$message.success(data.msg);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },


    // 点击确定注销账号
    async onCancelAccount() {
      if (confirm('确定注销账户？此操作将永久删除你的账号、课程等所有记录，并且不能撤销！')) {
        if (confirm('确定？')) {
          // 注销
          let [data, err] = await this.$awaitWrap(this.$post('teacher/cancel', {
            id: this.formData.teacher_id,
            password: this.cancelAccountForm.password
          }));
          if (err) {
            this.$message.warning(err);
            return;
          }
          this.$message.success(data.msg);
          this.$router.replace('/login');
        }
      }
    },
    

    // 点击确定修改密码
    async onChangePassword() {
      // 判断有没有输入
      if (this.changePasswordForm.oldPassword.trim() === ''
        || this.changePasswordForm.newPassword.trim() === ''
        || this.changePasswordForm.newPasswordRepeat.trim() === '') {
        this.$message.warning('请输入');
      }
      // 判断输入是否一致
      if (this.changePasswordForm.newPassword.trim() !== this.changePasswordForm.newPasswordRepeat.trim()) {
        this.$message.warning('两次密码输入不一致');
      }
      // 提交表单
      let [data, err] = await this.$awaitWrap(this.$post('teacher/changepwd', {
        id: this.formData.teacher_id,
        oldpwd: this.changePasswordForm.oldPassword.trim(),
        newpwd: this.changePasswordForm.newPassword.trim()
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.$message.success(data.msg);
      this.changePasswordDialogVisible = false;
    }
  },

  // 加载数据
  async beforeMount() {
    this.loading = true;
    // 获取教师id
    let jwt = localStorage.getItem('hncj_management_teacher_token');
    this.formData.teacher_id = jwtDecode(jwt).id;
    // 查询教师信息
    let [data, err] = await this.$awaitWrap(this.$get('teacher/selectbyid', {
      id: this.formData.teacher_id
    }));
    if (err) {
      this.$message.warning(err);
      return;
    }
    this.formData.teacher_name = data.data.teacher_name;
    this.formData.teacher_avatar = data.data.teacher_avatar;
    this.formData.teacher_phone = data.data.teacher_phone;
    this.formData.teacher_email = data.data.teacher_email;
    this.loading = false;
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f2f4f7;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  .teacher-home {
    height: calc(100% - 60px);
    width: 100%;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .head {
      p {
        margin: 20px 0 20px 30px;
        font-size: 22px;
      }
    }

    .form {
      width: 600px;
      margin-left: 50px;
    }
  }
}
</style>