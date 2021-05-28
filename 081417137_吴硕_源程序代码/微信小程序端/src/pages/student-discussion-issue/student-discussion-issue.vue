<template>
  <div class="student-discussion-issue">
    <!-- 评价 -->
    <div class="discussion">
      <textarea class="text" placeholder="请输入评论" @input="onTextInput" />
    </div>

    <!-- 评价按钮 -->
    <van-button class="btn-discussion" round color="#4396f7" @click="issue">
      发布评论
    </van-button>

    <!-- 确认弹框 -->
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Dialog from '@/../static/vant/dialog/dialog';

export default {
  data() {
    return {
      discussion_id: 0,

      content: ''
    }
  },

  methods: {
    // 点击发布评论
    issue() {
      if (this.content.trim() === '') {
        this.$toast('请输入内容！');
        return;
      }

      // 发布
      Dialog.confirm({
        title: '提示',
        message: '评论发布后将不可修改，确定发布？',
      }).then(async () => {
        let [data, err] = await this.$awaitWrap(this.$post('discussioncomment/issuecomment', {
          discussion_id: this.discussion_id,
          student_id: wx.getStorageSync('hncj_assistant_wx_user_id'),
          content: this.content
        }));
        if (err) {
          this.$catch(err);
          return;
        }
        // 成功，返回上一页
        this.$toast(data.msg);
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1000);
      }).catch(() => {
      });
    },


    onTextInput(e) {
      this.content = e.mp.detail.value;
    },
  },

  onLoad(option) {
    this.discussion_id = option.discussion_id;
  }

}
</script>


<style lang="scss" scoped>
.student-discussion-issue {
  overflow: auto;

  // 评论按钮
  .btn-discussion {
    float: right;
  }

  .discussion {
    .text {
      width: calc(100% - 70rpx);
      height: 300rpx;
      margin: 20rpx;
      padding: 15rpx;
      background: #f3f3f3;
      border-radius: 10rpx;
    }
  }

  .btn-discussion {
    float: right;
    margin-right: 20rpx;
  }
}
</style>
