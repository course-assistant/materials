<template>
  <div class="teacher-course-weekmissions">
    <div
      class="week-mission-item"
      v-for="(week_mission, index) in week_missions"
      :key="index"
      @click="toWeekMissionDetail(week_mission.week_mission_id)"
    >
      <p>
        {{ week_mission.week_mission_name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      week_missions: []
    }
  },

  props: ['course_id'],

  methods: {
    // 刷新页面的数据，给父组件调用
    async refresh() {
      let [data, err] = await this.$awaitWrap(this.$get('weekmission/selectbycourseid', {
        id: this.course_id
      }));

      console.log('刷新周任务');
      console.log(data);
      this.week_missions = data.data;
      // toast.clear()
    },

    // 跳转到周任务详情
    toWeekMissionDetail(id) {
      wx.navigateTo({
        url: `/pages/user-weekmission-detail/main?week_mission_id=${id}`
      });
    }
  },

}
</script>

<style lang="scss" scoped>
.teacher-course-weekmissions {
  background: #f5f6f8;
  padding: 10px 0;

  .week-mission-item {
    height: 78rpx;
    background: #fff;
    margin: 10px 0;
    padding-left: 40rpx;

    display: flex;
    align-items: center;
  }
}
</style>