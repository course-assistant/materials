<template>
  <div class="evaluation-item">
    <!-- 头像部分 -->
    <div class="info">
      <img class="avatar" :src="evaluation.student_avatar" alt="" />
      <div style="margin-left: 18rpx; margin-top: 10rpx">
        <p class="name">{{ evaluation.student_name }}</p>
        <p class="date">{{ evaluation.period_evaluate_date }}</p>
      </div>
    </div>
    
    <!-- 内容 -->
    <p class="content">{{ evaluation.period_evaluate_content }}</p>
    <van-divider />
  </div>
</template>

<script>
export default {
  props: ['evaluation'],


  beforeMount() {
    console.log('evaluation');
    console.log(this.evaluation);
  },
}
</script>

<style lang="scss" scoped>
.evaluation-item {
  width: 100%;
  //   background: palegreen;

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