<template>
  <div class="container">
    <div class="period-detail">
      <el-button
        class="btn-edit"
        type="primary"
        round
        @click="
          editMissionForm.content = period.period_content;
          editMissionDialogVisible = true;
        "
      >
        编辑任务
      </el-button>
      <div class="content" v-html="content"></div>
    </div>

    <!-- 对话框 -->
    <!-- 编辑任务的对话框 -->
    <el-dialog
      title="编辑任务"
      :visible.sync="editMissionDialogVisible"
      width="45%"
    >
      <el-form label-position="left">
        <el-form-item>
          <el-input
            type="textarea"
            :rows="12"
            placeholder="请输入内容"
            v-model="editMissionForm.content"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editMissionDialogVisible = false"> 取 消 </el-button>
        <el-button type="primary" @click="onEditMission"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {

  data() {
    return {
      period: {
        period_id: 0,
        period_content: ''
      },


      editMissionDialogVisible: false,
      editMissionForm: {
        content: ''
      }

    }
  },


  computed: {
    content() {
      let content = this.period.period_content.replace(/\n/g, '<br>');
      return content;
    },
  },

  methods: {
    // 刷新学时数据
    async refreshPeriod() {
      let [data, err] = await this.$awaitWrap(this.$get('weekperiod/selectperiodbyperiodid', {
        id: this.period.period_id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.period = data.data;
    },


    // 点击确定编辑
    async onEditMission() {
      let [data, err] = await this.$awaitWrap(this.$post('weekperiod/updateperiod', {
        id: this.period.period_id,
        content: this.editMissionForm.content
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.$message.success(data.msg);
      await this.refreshPeriod();
      this.editMissionDialogVisible = false;
    }
  },


  // 检有没有携带参数
  beforeCreate() {
    if (!this.$route.query.periodid) {
      this.$router.replace('/');
    }
  },


  // 加载数据
  async beforeMount() {
    this.period.period_id = this.$route.query.periodid;

    await this.refreshPeriod();
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

  .period-detail {
    height: calc(100% - 60px);
    width: 100%;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    // padding: 20px;

    .btn-edit {
      margin: 20px;
    }

    .content {
      margin-left: 20px;
    }
  }
}
</style>