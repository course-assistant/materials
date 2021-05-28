<template>
  <div class="container">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >
      <!-- 讨论 -->
      <div class="discusstion-list">
        <el-button
          type="primary"
          round
          @click="addDiscussionDialogVisible = true"
          >添加讨论</el-button
        >
        <p style="margin: 20px 8px">全部话题</p>
        <el-divider />

        <div class="discussions">
          <DiscussionItem
            v-for="(discussion, index) in discussions"
            :key="index"
            :discussion="discussion"
            @delete="deleteDiscussion"
          />
        </div>

        <!-- 为空时显示 -->
        <Empty
          v-if="discussions == null || discussions.length == 0"
          text="暂无课堂讨论"
        />
      </div>
    </div>

    <!-- 对话框 -->
    <el-dialog
      title="添加讨论"
      :visible.sync="addDiscussionDialogVisible"
      width="50%"
    >
      <el-form :model="addDiscussionForm" label-position="left">
        <el-form-item>
          <el-input
            v-model="addDiscussionForm.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            type="textarea"
            :rows="7"
            placeholder="请输入内容"
            v-model="addDiscussionForm.content"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-form>

      <p style="color: #a8a8b3; font-size: 14px">
        发表该话题即表示您已阅读并接受<a href="" target="_blank">《用户协议》</a
        >, 请勿发布色情，反动等违法内容
      </p>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addDiscussionDialogVisible = false" clearable>
          取 消
        </el-button>
        <el-button type="primary" @click="onAddDiscussion"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DiscussionItem from '@/components/DiscussionItem.vue';

export default {

  data() {
    return {
      loading: false,

      courseId: 0,

      discussions: [
        // {
        //   discussion_id: 1,
        //   discussion_title: '关于小程序的看法',
        //   discussion_content: '对于小程序开发，哪些服务是可以接入，哪些又是不可以接入的呢？分享几款令你印象深刻的小程序吧，说说自己的使用体验。',
        //   discussion_date: '2021-4-4 12:34:56'
        // },
      ],

      addDiscussionDialogVisible: false,
      addDiscussionForm: {
        title: '',
        content: ''
      }
    }
  },

  components: { DiscussionItem },


  // 加载数据
  async beforeMount() {
    this.courseId = this.$route.params.course_id;
    await this.refresh();
  },

  methods: {
    // 加载数据
    async refresh() {
      this.loading = true;
      console.log('加载讨论 ' + this.courseId);
      let [data, err] = await this.$awaitWrap(this.$get('discussioncomment/selectbycourse', {
        id: this.courseId
      }));
      this.loading = false;
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.discussions = data.data;
    },


    // 点击确定添加讨论
    async onAddDiscussion() {
      console.log(this.addDiscussionForm);

      let [data, err] = await this.$awaitWrap(this.$post('discussioncomment/issuediscussion', {
        id: this.courseId,
        title: this.addDiscussionForm.title,
        content: this.addDiscussionForm.content
      }));
      if (err) {
        this.$$message.warning(err);
        return;
      }
      this.addDiscussionDialogVisible = false;
      await this.refresh();
      this.$message.success(data.msg);
    },


    // 点击删除讨论
    deleteDiscussion(id) {
      this.$cfm('确定删除？', async () => {
        console.log(id);
        let [data, err] = await this.$awaitWrap(this.$post('discussioncomment/deletediscussion', {
          id
        }));
        if (err) {
          this.$$message.warning(err);
          return;
        }
        await this.refresh();
        this.$message.success(data.msg);
      });
    },
  },

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

  .round-div {
    width: 100%;
    min-width: 1000px;
    height: calc(100% - 60px);
    margin: 30px;
    margin-top: 30px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;

    .discusstion-list {
      flex: 1;
      margin: 20px;
      overflow: auto;

      p {
        color: #a8a8b3;
        font-size: 12px;
      }
    }
  }
}
</style>