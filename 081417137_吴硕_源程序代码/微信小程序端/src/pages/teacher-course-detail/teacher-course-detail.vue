<template>
  <div class="teacher-course-detail">
    <van-tabs
      :active="active"
      @change="onTabChange"
      color="#4396f7"
      animated
      swipeable
      sticky
    >
      <van-tab title="学时任务">
        <Period :course_id="course_data.course_id" ref="period" />
      </van-tab>

      <van-tab title="周任务">
        <WeekMission :course_id="course_data.course_id" ref="weekMission" />
      </van-tab>

      <van-tab title="更多">
        <CourseMore :course_id="course_data.course_id" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Period from '@/views/teacher-course-periods.vue';
import WeekMission from '@/views/teacher-course-weekmissions.vue';
import CourseMore from '@/views/teacher-course-more.vue';

export default {

  data() {
    return {
      active: 0,

      course_data: {
        course_id: 0
      }

    }
  },

  components: {
    Period,
    WeekMission,
    CourseMore
  },

  methods: {
    onTabChange(event) {
    }
  },

  async beforeMount() {
    // 加载数据
    let [data, err] = await this.$awaitWrap(this.$get('course/findbyid', {
      id: this.course_data.course_id
    }));
    console.log('获取课程详情');
    console.log(data);
    this.course_data = data.data;

    // 更新标题
    wx.setNavigationBarTitle({
      title: this.course_data.course_name
    })

    // 刷新子组件
    this.$refs.period.refresh();
    this.$refs.weekMission.refresh();
  },

  onLoad(option) {
    this.course_data.course_id = option.course_id;
  }

}
</script>


<style lang="scss" scoped>
.teacher-course-detail {
  height: 100%;

  background: #f5f6f8;
}
</style>
