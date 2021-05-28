<template>
  <div>
    <van-collapse :value="activeNames" @change="onChange">
      <!-- 教师 -->
      <van-collapse-item
        v-for="(week, i1) in cweeks"
        :name="week.week_id"
        :key="i1"
      >
        <!-- 周次 -->
        <div slot="title">
          <div style="display: flex">
            {{ week.week_name }}
            <div style="margin-left: 5px">
              <van-tag
                type="primary"
                v-if="week.week_status == 1"
                style="margin-left: 10rpx"
              >
                已发布
              </van-tag>
              <van-tag type="primary" v-else style="margin-left: 10rpx">
                未发布
              </van-tag>
            </div>
          </div>
        </div>

        <!-- 任务 -->
        <div v-for="(mission, i2) in week.missions" :key="i2">
          <van-cell-group>
            <van-cell
              :title="mission.week_mission_name"
              v-if="mission.week_mission_status == 1"
              @click="toMissionDetail(mission.week_mission_id)"
              value="已发布"
            />
            <van-cell
              :title="mission.week_mission_name"
              v-else
              @click="toMissionDetail(mission.week_mission_id)"
              value="未发布"
            />
          </van-cell-group>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: [],

      weeks: [{
        "week_id": 1,
        "week_name": "第01周",
        "week_status": 1,
        "missions": [
          {
            "week_mission_id": 1,
            "week_id": 1,
            "week_name": "第01周",
            "week_mission_name": "任务01",
            "week_mission_content": "与现实生活一致：与现实生活的流程、\n逻辑保持一致，遵循用户习惯的语言和概念；",
            "ok_num": 2,
            "week_goals": [
              {
                "week_goal_id": 1,
                "week_mission_id": 1,
                "week_goal_title": "记忆目标",
                "week_goal_content": "HTML、CSS、JavaScript"
              },
              {
                "week_goal_id": 2,
                "week_mission_id": 1,
                "week_goal_title": "理解目标",
                "week_goal_content": "JQuery等前端库"
              }
            ]
          },
          {
            "week_mission_id": 2,
            "week_id": 1,
            "week_name": "第01周",
            "week_mission_name": "任务02",
            "week_mission_content": "2与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；\n在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等",
            "ok_num": 1,
            "week_goals": [
              {
                "week_goal_id": 10,
                "week_mission_id": 2,
                "week_goal_title": "测试目标",
                "week_goal_content": "啦啦啦啦啦啦啦啦啦啦"
              }
            ]
          }
        ]
      }]
    }
  },


  props: ['course_id', 'teacher'],

  computed: {
    cweeks() {
      if (!this.teacher) {
        let w = [];
        this.weeks.forEach(week => {
          if (week.week_status == 1)
            w.push(week);
        })
        return w;
      }
      return this.weeks;
    }
  },

  methods: {
    async refresh() {
      console.log('refresh mission ' + this.course_id);
      let [data, err] = await this.$awaitWrap(this.$get('week/selectweek', {
        course_id: this.course_id
      }));
      console.log('mission');
      console.log(data);
      if (err) {
        wx.hideLoading();
        this.$toast(err);
        return;
      }
      this.weeks = data.data.weeks;
    },


    toMissionDetail(id) {
      console.log('to mission ' + id);
      wx.navigateTo({
        url: `/pages/user-weekmission-detail/main?mission_id=${id}&teacher=${this.teacher}`
      });
    },


    onChange(event) {
      this.activeNames = event.mp.detail;
    }
  }
}
</script>

<style lang="scss" scoped>
.discussion {
  height: 90rpx;
  border-bottom: solid 1px #f2f2f2;
  display: flex;
  align-items: center;
}
</style>