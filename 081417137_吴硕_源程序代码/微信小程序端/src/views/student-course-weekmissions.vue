<template>
  <div class="student-course-weekmissions">



    <div v-for="(week_mission, index) in week_missions" :key="index">
      <MyCell
        :text="week_mission.week_mission_name"
        @click="toWeekMissionDetail(week_mission.week_id)"
      />
      <div class="margin"></div>
    </div>
  </div>
</template>

<script>
import MyCell from '@/components/MyCell.vue';

export default {

  data() {
    return {
      week_missions: []
    }
  },

  props: ['course_id'],

  components: { MyCell },

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
        url: `/pages/user-weekmission-detail/main?week_id=${id}`
      });
    }
  },

}
</script>

<style lang="scss" scoped>
.student-course-weekmissions {
  background: #f5f6f8;
  padding: 10px 0;

  .margin {
    width: 100%;
    height: 20rpx;
    background: #f5f6f8;
  }
}
</style>
