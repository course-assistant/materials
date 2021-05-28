<template>
  <div class="teacher-course-periods">
    <van-collapse :value="activeNames" @change="onChange">
      <!-- 折叠菜单 -->
      <van-collapse-item
        v-for="(week, week_i) in week_period"
        :key="week_i"
        :title="week.week_name"
        :name="week.week_id"
        style="margin: 10px"
      >
        <!-- 菜单项 -->
        <div
          class="period-item"
          v-for="(period, period_i) in week.periods"
          :key="period_i"
          @click="toPeriodDetail(period.period_id)"
        >
          <p class="period-name">{{ period.period_name }}</p>
          <p class="period-type" v-if="period.period_type == 1">理论课</p>
          <p class="period-type" v-if="period.period_type == 2">实验课</p>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {

  data() {
    return {
      activeNames: ["1"],
      week_period: [{
        week_id: 0,
      }]
    }
  },

  props: ['course_id'],

  methods: {
    // 刷新页面的数据，给父组件调用
    async refresh() {
      // 获取数据
      console.log('刷新子组件');
      this.$loading('刷新中...');

      let [data, err] = await this.$awaitWrap(this.$get('weekperiod/select', {
        id: this.course_id
      }));
      console.log('获取周和学时');
      console.log(data);
      this.week_period = data.data;

      // 关闭所有展开的菜单
      this.activeNames = [];
      wx.hideLoading();
    },

    toPeriodDetail(id) {
      console.log('to period ' + id);
      wx.navigateTo({
        url: `/pages/teacher-period-detail/main?period_id=${id}`
      });
    },

    // 折叠框展开、折叠
    onChange(event) {
      this.activeNames = event.mp.detail;
    },
  },

}
</script>

<style lang="scss" scoped>
.teacher-course-periods {
  background: #f5f6f8;
  .period-item {
    height: 80rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background: #f5f6f8;
    // background: palegoldenrod;
    // border-top: solid 1px #f5f6f7;
    border-bottom: solid 1px #f5f6f7;
    color: #000;
    // background: #eeeff3;

    .period-name {
      height: 80rpx;
      line-height: 80rpx;
    }
    .period-type {
      height: 80rpx;
      line-height: 80rpx;
    }
  }
}
</style>