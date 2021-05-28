<template>
  <div class="teacher-course-more">
    <van-cell title="班级" icon="orders-o" is-link @click="toCourseClass" />
    <van-cell
      title="统计"
      icon="bar-chart-o"
      is-link
      @click="toCourseStatistics"
    />
    <van-cell
      title="管理课程"
      icon="contact"
      is-link
      @click="toCourseSetting"
    />
  </div>
</template>

<script>
export default {

  props: ['course_id'],

  methods: {
    toCourseClass() {

    },

    toCourseStatistics() {

    },

    toCourseSetting() {

    },
  },

  beforeMount() {
    console.log('mount more');
  },
}
</script>

<style lang="scss" scoped>
.teacher-course-more {
  padding: 20rpx 0;
}
</style>