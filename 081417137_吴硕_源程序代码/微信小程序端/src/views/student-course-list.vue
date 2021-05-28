<template>
  <div class="student-course-list">
    <!-- 顶部搜索框 -->
    <van-search placeholder="输入查找课程" @search="onSearch" />

    <div class="course-list">
      <CourseItem
        v-for="(course, index) in courses"
        :key="index"
        :course="course"
        @jump="jump"
      />

      <!-- 课程为空时提示 -->
      <div v-if="courses == null || courses.length == 0">
        <van-empty description="暂无课程，请在账户页面进行添加" />
      </div>
    </div>
  </div>
</template>

<script>
import CourseItem from '@/components/CourseItem.vue';

export default {
  data() {
    return {
      courses: [
        // {
        //   course_id: 0,
        //   teacher_name: '教师名',
        //   course_cover: 'https://cn.vuejs.org/images/logo.png',
        //   course_name: "课程名"
        // }
      ]
    }
  },

  components: { CourseItem },

  methods: {
    jump(course_id) {
      wx.navigateTo({
        url: `/pages/student-message-main/main`
      });
    }
  },

  async beforeMount() {
    this.$loading();
    // 加载学生的课程
    let [data, err] = await this.$awaitWrap(this.$get('course/findbystudentid', {
      id: wx.getStorageSync('hncj_assistant_wx_user_id'),
      page: 0,
      size: 1000,
      status: 1
    }));
    if (err) {
      this.$catch(err);
      wx.hideLoading();
      return;
    }
    this.courses = data.data;
    wx.hideLoading();
  },

}
</script>

<style lang="scss" scoped>
.student-course-list {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  .course-list {
    flex: 1;
    overflow: auto;
    background: #eeeff3;
    padding: 0;
  }
}
</style>
