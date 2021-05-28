<template>
  <div class="comment-item">
    <!-- 头像部分 -->
    <div class="info">
      <img class="avatar" :src="comment.student_avatar" alt="" />
      <div style="margin-left: 18rpx; margin-top: 10rpx">
        <p class="name">{{ comment.student_name }}</p>
        <p class="date">{{ comment.comment_date }}</p>
      </div>
    </div>

    <!-- 内容 -->
    <p class="content">
      {{ comment.comment_content }}
    </p>
    <van-divider />
  </div>
</template>

<script>
export default {
  props: ['comment'],
}
</script>

<style lang="scss" scoped>
.comment-item {
  width: 100%;
  background: #fff;

  .info {
    margin: 0 20rpx;
    display: flex;
    .avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 12rpx;
    }
    .name {
      height: 40rpx;
      line-height: 40rpx;
      font-size: 28rpx;
    }
    .date {
      height: 40rpx;
      line-height: 40rpx;
      font-size: 24rpx;
    }
  }

  .content {
    margin: 0 20rpx;
    margin-left: 117rpx;
  }
}
</style>