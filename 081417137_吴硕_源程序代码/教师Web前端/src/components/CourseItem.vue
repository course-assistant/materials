<template>
  <div
    class="course-item"
    @click="toCourseIndex"
    @mouseover="over"
    @mouseout="out"
  >
    <div class="opts" v-show="showOpts">
      <span @click.stop="handleEnd">结课</span>
      <span @click.stop="handleDelete">删除</span>
    </div>

    <img class="cover" :src="courseData.course_cover" alt="" />
    <h4 class="course-name">{{ courseData.course_name }}</h4>
    <p class="teacher-name">{{ courseData.teacher_name }}</p>
  </div>
</template>

<script>
export default {

  data() {
    return {
      courseData: {
        // 课程的基本属性
        course_id: 1,
        course_name: '课程名',
        teacher_name: '教师名',
        course_cover: 'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/01.jpg'
      },

      showOpts: false,
    }
  },

  props: ['course'],

  methods: {
    over() {
      this.showOpts = true;
    },

    out() {
      this.showOpts = false;
    },

    handleEnd() {
      console.log('结课' + this.courseData.course_id);
    },

    handleDelete() {
      this.$emit('deletec', this.courseData.course_id);
    },

    // 跳转至课程主页
    toCourseIndex() {
      let routeUrl = this.$router.resolve({
        path: `/course/${this.courseData.course_id}`,
      });
      // let routeUrl = this.$router.resolve({
      //   path: '/course',
      //   query: { courseid: this.courseData.course_id }
      // });
      window.open(routeUrl.href, '_blank');
    }
  },

  // 接收父组件传来的数据
  beforeMount() {
    this.courseData = this.course;
  }
}
</script>

<style lang="less" scoped>
.course-item {
  position: relative;
  width: 240px;
  height: 200px;
  margin: 20px;
  cursor: pointer;

  // 操作按钮
  .opts {
    position: absolute;
    width: 120px;
    height: 32px;
    right: 0;
    background: rgba(255, 255, 255, 0.9);
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;

    display: flex;
    justify-content: space-around;
    align-items: center;

    span {
      color: #3a8bff;
      &:hover {
        color: #909399;
      }
    }
  }

  .cover {
    width: 240px;
    height: 130px;
    border-radius: 12px;
    object-fit: cover;
  }

  .course-name {
    margin: 0;
    margin-left: 5px;
    height: 35px;
    line-height: 35px;
  }
  .teacher-name {
    margin: 0;
    margin-left: 5px;
    height: 30px;
    line-height: 30px;
  }
}
</style>