<template>
  <div class="course-item" @click="jump">
<!--    <img class="cover" :src="course.course_cover" alt="" />-->
    <div class="cover">
      课程
    </div>

    <div class="desc">
      <p class="course-name">{{ course.course_name }}</p>
      <p class="teacher-name">{{ course.teacher_name }}</p>

      <span class="message-time">5-10</span>
    </div>

    <!-- <div class="symbol">
      <van-icon name="arrow" />
    </div> -->
  </div>
</template>

<script>
export default {

  props: ['course'],

  methods: {
    jump() {
      this.$emit('jump', this.course.course_id);
    }
  },

}
</script>

<style lang="scss" scoped>
.course-item {
  position: relative;
  width: 100%;
  height: 120rpx;
  /*margin-top: 20rpx;*/
  border-bottom: 1rpx #333333;
  /*border-radius: 16rpx;*/
  display: flex;
  align-items: center;
  background: #fff;

  .cover {
    width: 80rpx;
    height: 80rpx;
    margin-left: 20rpx;
    object-fit: cover;
    color: #ffffff;
    line-height: 80rpx;
    border-radius: 10rpx;
    padding: 5rpx;
    background-color: #0e90d2;
  }
  .desc {
    margin-left: 20rpx;
    .course-name {
      height: 55rpx;
      width: 400rpx;
      line-height: 55rpx;
      font-size: 32rpx;
    }

    .teacher-name {
      height: 60rpx;
      width: 400rpx;
      line-height: 60rpx;
      font-size: 24rpx;
      color: #999999;
    }
  }
  .symbol {
    position: absolute;
    right: 20rpx;
    color: #999999;
  }

  .message-time{
    position: absolute;
    top: 40rpx;
    right: 40rpx;
    font-size: 24rpx;
    color: #999999;
  }

}
</style>
