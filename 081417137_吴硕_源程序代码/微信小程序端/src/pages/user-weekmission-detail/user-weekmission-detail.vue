<template>
  <div class="weekmission-detail">
    <!-- 主要内容 -->
    <div style="font-weight: bold; font-size: 20px; margin-bottom: 20px">
      {{ week_mission.week_mission_name }}
    </div>

    <div>
      <div style="font-weight: bold; margin-bottom: 10px">主要内容</div>
      <div style="font-size: 14px; margin-bottom: 10px">
        {{ week_mission.week_mission_content }}
      </div>

      <div style="font-weight: bold; margin-bottom: 10px">主要目标</div>

      <div v-for="(goal, index) in week_mission.week_goals">
        <span style="font-size: 16px">{{ goal.week_goal_title }}：</span>
        <span style="font-size: 14px">{{ goal.week_goal_content }} </span>
      </div>
    </div>
  </div>
</template>

<script>


export default {

  data() {
    return {
      active: 0,

      teacher: false,

      // 周任务
      week_mission: {
        week_mission_id: 0,

        week_mission_name: '任务1',

        week_mission_content: `与现实生活一致：与现实生活的流程、
        逻辑保持一致，遵循用户习惯的语言和概念；`,

        week_goals: [
          {
            week_goal_id: 0,
            week_goal_title: '教学目标',
            week_goal_content: 'HTML'
          },
          {
            week_goal_id: 0,
            week_goal_title: '理解目标',
            week_goal_content: 'JQuery等前端库'
          }
        ],
      },

    }
  },

  computed: {
    missionContent() {
      let content = this.week_mission.week_mission_content.replace(/\n/g, '<br>');
      return content;
    }
  },

  async beforeMount() {
    await this.refresh();
  },


  // 如果是学生的话，进行查看任务
  async mounted() {
    if (this.teacher == "false") {
      console.log('查看任务');
      let [data, err] = await this.$awaitWrap(this.$post('week/viewmission', {
        student_id: wx.getStorageSync('hncj_assistant_wx_user_id'),
        mission_id: this.week_mission_id
      }))
    }
  },

  methods: {
    async refresh() {
      let [data, err] = await this.$awaitWrap(this.$get('week/selectmissionbyid', {
        id: this.week_mission_id
      }));
      if (err) {
        this.$toast(err);
        return;
      }
      this.week_mission = data.data;
      console.log(data);
    },

  },


  onLoad(options) {
    this.week_mission_id = options.mission_id;
    this.teacher = options.teacher;
  }
}
</script>


<style lang="scss" scoped>
.weekmission-detail {
  padding: 20rpx;
  background: #fff;
}
</style>
