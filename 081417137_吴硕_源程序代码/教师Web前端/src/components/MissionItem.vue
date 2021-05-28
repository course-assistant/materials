<template>
  <div class="lesson-mission-item">
    <el-checkbox class="checked" v-model="mission.checked"></el-checkbox>

    <div class="head">
      <b style="margin-right: 20px">{{ mission.week_mission_name }}</b>

      <div style="margin-right: 20px">
        <el-tag
          v-if="mission.week_mission_type == 1"
          class="tag"
          size="medium"
          type="primary"
        >
          理论
        </el-tag>
        <el-tag v-else class="tag" size="medium" type="info">实验</el-tag>
      </div>

      <div>
        <el-tag
          v-if="mission.week_mission_status == 1"
          class="tag"
          size="medium"
          type="primary"
        >
          已发布
        </el-tag>
        <el-tag v-else class="tag" size="medium" type="info">未发布</el-tag>
      </div>
      <span style="margin-left: 20px; color: #999">
        {{ mission.views }}人已查看
      </span>
    </div>

    <div class="info">
      <div class="main-content">
        <div class="title">
          <div style="margin-bottom: 5px">
            <b>主要内容</b>
          </div>
        </div>
        <p
          style="margin-bottom: 5px"
          class="content"
          v-html="convertHtml(mission.week_mission_content)"
        />
      </div>

      <!-- 周任务主要目标 -->
      <div class="main-goal">
        <div class="title">
          <div style="margin-bottom: 3px">
            <b> 主要目标 </b>
          </div>
        </div>

        <!-- 空状态 -->
        <p
          v-if="mission.week_goals == null || mission.week_goals.length == 0"
          style="margin-bottom: 3px"
        >
          暂无
        </p>

        <div class="goal" v-for="(g, index) in mission.week_goals" :key="index">
          <p style="margin-bottom: 3px" class="goal-title">
            {{ g.week_goal_title }}：
          </p>
          <p
            style="margin-bottom: 3px"
            class="content"
            v-html="convertHtml(g.week_goal_content)"
          />
        </div>
      </div>
    </div>
    <div class="opts">
      <el-link type="primary" :underline="false" @click.stop="onEdit">
        编辑
      </el-link>
      <el-link
        type="primary"
        :underline="false"
        style="margin-left: 20px"
        @click.stop="onDelete"
      >
        删除
      </el-link>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {


    }
  },

  props: ['mission'],

  methods: {
    // 跳转到详情
    toMissionDetail() {
      this.$router.push({
        path: `/course/${this.$route.params.course_id}/week-mission/week-mission-list/${this.$route.params.week_id}/week-mission-detail/${this.mission.week_mission_id}`
      });
    },

    // 点击自己的编辑按钮
    onEdit() {
      this.toMissionDetail();
    },

    // 点击删除
    onDelete() {
      this.$emit('delete', this.mission.week_mission_id);
    },

    // 状态切换
    onChange() {
      console.log('切换');
    }
  },

  beforeMount() {
    console.log(this.mission);
  },
}
</script>

<style lang="less" scoped>
.lesson-mission-item {
  position: relative;
  //   width: 910px;
  width: 100%;
  /*height: 200px;*/
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .checked {
    position: absolute;
    top: 20px;
    left: 30px;
  }

  .head {
    /*position: absolute;*/
    display: flex;
    align-items: center;
    padding-top: 12px;
    margin-left: 60px;
    /*top: 12px;*/
    /*left: 60px;*/
    color: #333333;
    font-size: 16px;
  }

  .info {
    /*position: absolute;*/
    /*top: 50px;*/
    /*left: 60px;*/
    margin-top: 15px;
    margin-left: 60px;
    font-size: 10px;
    color: #333;
    padding-bottom: 20px;
  }

  .main-goal {
    .goal {
      display: flex;

      .goal-title {
        min-width: 60px;
      }
    }
  }

  .opts {
    position: absolute;
    right: 30px;
    bottom: 30px;
  }
}
</style>