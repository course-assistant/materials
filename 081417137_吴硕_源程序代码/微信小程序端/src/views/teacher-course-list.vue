<template>
  <div class="teacher-course">
    <!-- 顶部搜索框 -->
    <van-search placeholder="输入查找课程" @search="onSearch" />

    <div class="course-list">
      <CourseItem
        v-for="(course, index) in courses"
        :key="index"
        :course="course"
        @jump="jump"
      />
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
    // 点击搜索
    onSearch(event) {
      let word = event.mp.detail;
    },

    // 跳转到教师的课程详情
    jump(id) {
      wx.navigateTo({
        url: `/pages/user-course-detail/main?course_id=${id}`
      });
    },
  },

  async mounted() {
    this.$loading('刷新中...');
    let [data, err] = await this.$awaitWrap(this.$get('course/findbyteacherid', {
      id: wx.getStorageSync('hncj_assistant_wx_user_id'),
      page: 0,
      size: 1000,
      status: 1
    }));
    if (err) {
      return;
    }

    console.log(data);
    this.courses = data.data;
    wx.hideLoading();
  },
}
</script>

<style lang="scss" scoped>
.teacher-course {
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
