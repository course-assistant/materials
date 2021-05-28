<template>
  <div class="container">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <!-- 导航 -->
      <div class="nav">
        <!-- 一级 -->
        <div style="font-size: 26px;line-height: 45px">周任务</div>

        <!-- <p style="color:#444;margin-left: 50px;">
          共有 {{weekInfo.student_total_num}} 个周任务 已发布:
          {{weekInfo.student_ok_num}} 个 未发布
          {{weekInfo.student_total_num-weekInfo.student_ok_num}} 个
        </p> -->

        <!--        <p style="margin-left:auto;">-->
        <!--          0个学生完成  60个学生未完成-->
        <!--        </p>-->

        <div style="margin-left:auto;padding-right: 40px;line-height: 45px">
          <span style="font-size: 12px;color: #8a8b99">
            已完成
<!--            {{weekInfo.week_f.ok_num}}/{{weekInfo.week_f.total_num}}-->
          </span>
          <span style="color:#409EFF;cursor: pointer;">
            详情
          </span>
        </div>


        <!--        <el-breadcrumb class="f-size" separator-class="el-icon-arrow-right">-->
        <!--          <el-breadcrumb-item :to="'/course/' + course_id + '/week-mission/'">-->
        <!--            -->
        <!--          </el-breadcrumb-item>-->
        <!--        </el-breadcrumb>-->
      </div>

      <!-- 周的列表 -->
      <div class="week-mission-list" style="margin-right: 10px">


        <!--        <WeekItem v-for="(week, index) in weeks" :key="index" :week="week" />-->

        <!-- 空状态 -->
        <!--        <Empty v-if="weeks == null || weeks.length == 0" text="暂无周次" />-->

        <fold-dome :week="weekInfo.weeks"/>

      </div>
    </div>
  </div>
</template>

<script>
  import WeekItem from '@/components/WeekItem.vue';
  import FoldDome from "../../../components/FoldDome";

  export default {
    data() {
      return {
        loading: true,
        course_id: 0,
        weekInfo: {
          //总完成情况
          // week_f: {
          //   //完成人数
          //   ok_num: 0,
          //   //总人数
          //   total_num: 60
          // },
          // //发布情况
          // week_publish: {
          //   ok_num: 1,
          //   total_num: 3
          // },
          //
          // weeks: [
          //   {
          //     week_id: 1,
          //     week_name: "第01周",
          //     week_status: 1,
          //     week_f: {
          //       //完成人数
          //       ok_num: 22,
          //       //总人数
          //       total_num: 60
          //     },
          //     mission: [
          //       {
          //         week_mission_id: 1,
          //         week_id: 1,
          //         week_name: "第01周",
          //         week_mission_name: "任务01",
          //         week_mission_content: "与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；\n在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等",
          //         week_goals: [
          //           {
          //             week_goal_id: 1,
          //             week_goal_title: "记忆目标",
          //             week_goal_content: "HTML、CSS、JavaScriptweek_goal"
          //           },
          //           {
          //             week_goal_id: 2,
          //             week_goal_title: "理解目标",
          //             week_goal_content: "JQuery等前端库"
          //           }
          //         ]
          //       },
          //       {
          //         week_mission_id: 1,
          //         week_id: 1,
          //         week_name: "第01周",
          //         week_mission_name: "任务02",
          //         week_mission_content: "与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；\n在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等",
          //         week_goals: [
          //           {
          //             week_goal_id: 1,
          //             week_goal_title: "记忆目标",
          //             week_goal_content: "HTML、CSS、JavaScriptweek_goal"
          //           },
          //           {
          //             week_goal_id: 2,
          //             week_goal_title: "理解目标",
          //             week_goal_content: "JQuery等前端库"
          //           }
          //         ]
          //       }
          //     ]
          //   },
          //   {
          //     week_id: 2,
          //     week_name: "第02周",
          //     week_status: 2,
          //     week_f: {
          //       //完成人数
          //       ok_num: 0,
          //       //总人数
          //       total_num: 60
          //     },
          //     mission: [
          //       {
          //         week_mission_id: 1,
          //         week_id: 1,
          //         week_name: "第02周",
          //         week_mission_name: "任务01",
          //         week_mission_content: "与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；\n在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等",
          //         week_goals: [
          //           {
          //             week_goal_id: 1,
          //             week_goal_title: "记忆目标",
          //             week_goal_content: "HTML、CSS、JavaScriptweek_goal"
          //           },
          //           {
          //             week_goal_id: 2,
          //             week_goal_title: "理解目标",
          //             week_goal_content: "JQuery等前端库"
          //           }
          //         ]
          //       }
          //     ]
          //   },
          //   {
          //     week_id: 3,
          //     week_name: "第03周",
          //     week_status: 2,
          //     week_f: {
          //       //完成人数
          //       ok_num: 0,
          //       //总人数
          //       total_num: 60
          //     },
          //     mission: []
          //   }
          // ]

        }
      }
    },

    components: {WeekItem, FoldDome},

    methods: {
      // 加载课程的所有周
      async refreshWeeks() {
        // this.loading = true;
        let [data, err] = await this.$awaitWrap(this.$get('week/selectweek', {
          course_id: this.course_id
        }));
        if (err) {
          this.$message.warning(err);
          return;
        }
        this.weekInfo = data.data;
        console.log(this.weekInfo);
        this.loading = false;
      },
    },

    // 加载数据
    async beforeMount() {

      // console.log('课程id ' + this.$route.params.course_id);
      this.course_id = this.$route.params.course_id;
      await this.refreshWeeks();
    }
  }
</script>

<style lang="less" scoped>
  .f-size {
    font-size: 16px;
    margin-left: 12px;
  }


  .container {
    width: 100%;
    height: 100%;
    background: #f2f4f7;
    display: flex;
    justify-content: center;
    align-items: center;

    .round-div {
      width: 100%;
      min-width: 1000px;
      height: calc(100% - 60px);
      margin: 30px;
      margin-top: 30px;
      border-radius: 16px;
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      .nav {
        margin: 20px 30px;
        height: 45px;
        /*background-color: red;*/
        display: flex;
        /*font-size: 26px;*/

        p {
          line-height: 45px;

          font-size: 16px;
          color: #444;
        }
      }

      .week-mission-list {
        height: calc(100% - 60px);
        overflow: auto;
      }
    }
  }
</style>