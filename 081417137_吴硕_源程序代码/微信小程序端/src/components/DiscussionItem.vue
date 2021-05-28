<template>
  <div class="discussion-item">
    <div
      class="discussion"
      @click="toDiscussionDetail(discussion.discussion_id)"
    >
      <van-tag plain type="primary" style="margin: 0 20rpx">讨论</van-tag>
      <span>{{ discussion.discussion_title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['discussion'],


  methods: {
    // 跳转到讨论详情
    toDiscussionDetail(id) {
      wx.navigateTo({
        url: `/pages/user-discussion-detail/main?discussion_id=${id}`
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.discussion-item {
  width: 100%;
  background: #fff;

  .discussion {
    height: 90rpx;
    border-bottom: solid 1px #f2f2f2;
    display: flex;
    align-items: center;
  }
}
</style>