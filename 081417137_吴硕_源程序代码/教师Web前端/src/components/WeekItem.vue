<template>
  <div class="week-item" @click="toWeekMissionList">
    <p>{{ week.week_name }}</p>

    <el-tag
      v-if="week.week_status === 1"
      class="tag"
      size="medium"
      type="primary"
    >
      开放中
    </el-tag>

    <el-tag v-else class="tag" size="medium" type="info">未开放</el-tag>
  </div>
</template>

<script>
export default {
  props: ['week'],
  methods: {
    // 跳转到周的任务列表
    toWeekMissionList() {
      this.$router.push({
        path: `/course/${this.$route.params.course_id}/week-mission/week-mission-list/${this.week.week_id}`
      });
    }
  },
}
</script>

<style lang="less" scoped>
.week-item {
  width: 100%;
  height: 95px;
  background: #fff;
  border-bottom: solid 1px #f2f2f2;

  display: flex;
  align-items: center;
  color: #181e33;

  .tag {
    margin: 0 20px;
    cursor: pointer;
  }

  &:hover {
    background: #f7fafc;
  }

  p {
    margin-left: 40px;
  }
}
</style>