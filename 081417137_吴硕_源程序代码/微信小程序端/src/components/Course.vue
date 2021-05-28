<template>
  <div class="course-item" @click="jump">
    <img class="cover" :src="course.course_cover" alt="" />

    <div class="desc">
      <p class="course-name">{{ course.course_name }}</p>
      <p class="teacher-name">{{ course.teacher_name }}</p>
    </div>

    <div class="symbol">
      <van-icon name="arrow" />
    </div>
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
  height: 140rpx;
  margin-top: 20rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  background: #fff;

  .cover {
    width: 90rpx;
    height: 90rpx;
    border-radius: 12rpx;
    margin-left: 20rpx;
  }
  .desc {
    margin-left: 20rpx;
    .course-name {
      height: 55rpx;
      line-height: 55rpx;
      font-size: 32rpx;
    }

    .teacher-name {
      height: 60rpx;
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
}
</style>