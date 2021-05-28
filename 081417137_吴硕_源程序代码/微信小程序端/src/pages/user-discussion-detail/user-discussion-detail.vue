<template>
  <!-- 讨论详情页面 -->

  <div class="user-discussion-detail">
    <!-- 讨论部分 -->
    <div class="discussion">
      <!-- 头像部分 -->
      <div class="teacher-info">
        <img class="avatar" :src="discussion.teacher_avatar" alt="" />
        <div style="margin-left: 18rpx; margin-top: 10rpx">
          <p class="name">{{ discussion.teacher_name }}</p>
          <p class="date">{{ discussion.discussion_date }}</p>
        </div>
      </div>

      <!-- 讨论标题和内容 -->
      <p class="title">{{ discussion.discussion_title }}</p>
      <p class="content">{{ discussion.discussion_content }}</p>

      <van-divider contentPosition="center">全部评论</van-divider>
    </div>

    <!-- 评论部分 -->
    <div class="comments">
      <Comment
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
      />
    </div>

    <!-- 评论按钮 -->
    <!-- 只有学生端才显示 -->
    <van-button
      v-if="showDuscussBtn"
      class="btn-discuss"
      round
      color="#4396f7"
      size="small"
      icon="comment-o"
      @click="toIssueDiscussion"
    >
      我要评论
    </van-button>

    <!-- 评论为空时显示 -->
    <van-empty
      v-if="comments == null || comments.length == 0"
      description="来发评论吧"
    />
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue';

export default {
  data() {
    return {
      showDuscussBtn: false,

      discussion: {
        discussion_id: 0,
        // discussion_title: '讨论谓词公式与子句集',
        // discussion_content: '谓词公式与子句集等价吗？在基于谓词逻辑的推理中，你觉得有必要把谓词公式转化为子句集吗？',
        // discussion_date: '2020-11-22',
        // teacher_name: '张妍琰',
        // teacher_avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },

      comments: [
        // {
        //   comment_id: 0,
        //   student_name: '张三',
        //   student_avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        //   comment_date: '2021-01-02',
        //   comment_content: '不等价',
        // },
        // {
        //   comment_id: 0,
        //   student_name: '张四',
        //   student_avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        //   comment_date: '2021-01-03',
        //   comment_content: '谓词公式与子句集不等价',
        // },
      ]
    }
  },

  components: { Comment },

  async beforeMount() {
    // 加载数据
    this.$loading();
    await this.refreshDiscussion(this.discussion.discussion_id);
    await this.refreshComments(this.discussion.discussion_id);
    wx.hideLoading();

    // 判断是否显示评论按钮
    let type = wx.getStorageSync('hncj_assistant_wx_user_type');
    this.showDuscussBtn = type === 3;
  },

  // onHide() {
  //   console.log('onHide');
  // },

  // onShow() {
  //   console.log('onShow');
  // },

  onUnload() {
    this.discussion = {};
    this.comments = [];
  },


  methods: {
    // 刷新讨论
    async refreshDiscussion(id) {
      let [data, err] = await this.$awaitWrap(this.$get('discussioncomment/selectbyid', { id }));
      // let [data, err] = await this.$awaitWrap(this.$get('discussioncomment/selectdissbydisscussionid', { id }));
      if (err) {
        this.$catch(err);
        return;
      }
      this.discussion = data.data;
    },

    // 刷新评论
    async refreshComments(id) {
      let [data, err] = await this.$awaitWrap(this.$get('discussioncomment/selectcommentsbydisscussionid', { id }));
      // let [data, err] = await this.$awaitWrap(this.$get('discussioncomment/selectcommentsbydisscussionid', { id }));
      if (err) {
        this.$catch(err);
        return;
      }
      this.comments = data.data;
    },


    // 跳转到发布评论页面
    toIssueDiscussion() {
      wx.navigateTo({
        url: `/pages/student-discussion-issue/main?discussion_id=${this.discussion.discussion_id}`
      });
    },
  },

  // 下拉刷新
  async onPullDownRefresh() {
    console.log("我正在下拉刷新");

    this.$loading();
    await this.refreshDiscussion(this.discussion.discussion_id);
    await this.refreshComments(this.discussion.discussion_id);
    wx.hideLoading();

    wx.stopPullDownRefresh();
  },

  onLoad(option) {
    this.discussion.discussion_id = option.discussion_id;
  }

}
</script>

<style lang="scss" scoped>
.user-discussion-detail {
  position: relative;
  background: #fff;
  overflow: auto;

  // 评论按钮
  .btn-discuss {
    position: fixed;
    bottom: 30rpx;
    right: 20rpx;
    z-index: 99;
  }

  // 评论详情
  .discussion {
    background: #fefefe;
    .teacher-info {
      margin: 10rpx;
      margin-left: 20rpx;
      display: flex;
      .avatar {
        width: 86rpx;
        height: 86rpx;
        border-radius: 12rpx;
      }
      .name {
        height: 43rpx;
        line-height: 43rpx;
        font-size: 30rpx;
      }
      .date {
        height: 43rpx;
        line-height: 43rpx;
        font-size: 26rpx;
      }
    }

    .title {
      margin: 10rpx 20rpx;
      font-size: 32rpx;
    }

    .content {
      margin: 0 20rpx;
    }
  }
}
</style>