<template>
  <div class="period-detail">
    <van-tabs
      :active="active"
      color="#4396f7"
      animated
      swipeable
      sticky
      @change="changeTab"
    >
      <van-tab title="任务">
        <div class="mission">
          <p>{{ period.period_name }}</p>
          <p>{{ period.period_content }}</p>
        </div>
      </van-tab>

      <van-tab title="随堂测试">
        <div class="tests">
          <div
            class="test-item"
            v-for="(test, index) in periodtests"
            :key="index"
            v-if="test.period_test_status == 1"
            @click="totestDetail(test.period_test_id)"
          >
            <img
              src="https://mooc1-api.chaoxing.com/images/work/phone/task-work-gray.png"
              alt=""
            />
            <p class="test-name">{{ test.period_test_name }}</p>
            <p class="test-status">已发布</p>
          </div>
        </div>

        <!-- 空提示 -->
        <div v-if="periodtests == null || periodtests.length == 0">
          <van-empty description="暂无随堂测试" />
        </div>
      </van-tab>

      <van-tab title="课堂讨论">
        <div class="discussions">
          <div
            class="discussion-item"
            v-for="(discussion, index) in discussions"
            :key="index"
            @click="toDiscussionDetail(discussion.discussion_id)"
          >
            <van-tag plain type="primary" style="margin: 0 20rpx">讨论</van-tag>
            <span>{{ discussion.discussion_title }}</span>
          </div>
        </div>
        <!-- 空提示 -->
        <div v-if="discussions == null || discussions.length == 0">
          <van-empty image="search" description="暂无课堂讨论" />
        </div>
      </van-tab>

      <van-tab title="评价">
        <PeriodEvalation
          ref="periodEvalationView"
          :periodid="period.period_id"
        />
      </van-tab>
    </van-tabs>

    <!-- 发布评价按钮 -->
    <van-button
      v-if="active == 3"
      class="btn-evaluate"
      round
      color="#ffd21e"
      size="small"
      icon="star-o"
      @click="toIssueEvaluation"
    >
      写评价
    </van-button>

    <!-- 对话框 -->
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import PeriodEvalation from '@/views/user-period-evaluation.vue';

export default {

  data() {
    return {
      active: 1,

      period: {
        period_id: 0
      },

      periodtests: [],

      discussions: []
    }
  },

  components: { PeriodEvalation },

  methods: {
    // 刷新随堂测试
    async refreshTests() {
      // 获取随堂测试
      let [testData, testErr] = await this.$awaitWrap(this.$get('periodtest/selecttestbyperiodid', {
        id: this.period.period_id
      }));
      console.log('获取随堂测试');
      console.log(testData);
      this.periodtests = testData.data;
    },

    // 刷新课堂讨论
    async refreshDiscussions() {
      // 获取课堂讨论
      let [discussionData, discussionErr] = await this.$awaitWrap(this.$get('discussioncomment/selectdissbyperiodid', {
        id: this.period.period_id
      }));
      console.log('获取课堂讨论');
      console.log(discussionData);
      this.discussions = discussionData.data;
    },


    // 点击发布随堂测试
    totestDetail(test_id) {
      console.log('to test detail ' + test_id);
      wx.navigateTo({
        url: `/pages/student-test-detail/main?test_id=${test_id}`
      });
    },


    // 切换tab
    changeTab(e) {
      this.active = e.mp.detail.index;
    },

    // 跳转到讨论详情
    toDiscussionDetail(id) {
      wx.navigateTo({
        url: `/pages/user-discussion-detail/main?discussion_id=${id}`
      });
    },

    // 点击发布评价
    toIssueEvaluation() {
      wx.navigateTo({
        url: `/pages/student-evaluate/main?period_id=${this.period.period_id}`
      });
    },

  },


  async onPullDownRefresh() {
    this.$loading('刷新中...');
    // 刷新随堂测试
    await this.refreshTests();
    // 刷新课堂讨论
    await this.refreshDiscussions();
    // 刷新学时评价
    await this.$refs.periodEvalationView.refreshEvaluations();
    wx.hideLoading();
    wx.stopPullDownRefresh();
  },

  // 加载数据
  async beforeMount() {
    this.active = 1;

    // 获取学时详情
    let [data, err] = await this.$awaitWrap(this.$get('weekperiod/selectperiodbyperiodid', {
      id: this.period.period_id
    }));
    console.log('获取学时详情');
    console.log(data);
    this.period = data.data;
    // 修改标题
    wx.setNavigationBarTitle({
      title: data.data.period_name
    })

    wx.showLoading({
      title: '刷新...',
      mask: true,
    });
    // 刷新随堂测试
    await this.refreshTests();
    // 刷新课堂讨论
    await this.refreshDiscussions();
    // 刷新学时评价
    await this.$refs.periodEvalationView.refreshEvaluations();

    wx.hideLoading()
  },

  onLoad(option) {
    this.period.period_id = option.period_id;
  }

}
</script>


<style lang="scss" scoped>
.period-detail {
  position: relative;
  height: 100%;
  background: #fff;

  .btn-evaluate {
    position: fixed;
    bottom: 30rpx;
    right: 20rpx;
    z-index: 99;
  }

  .mission {
    height: 100%;
    padding: 20rpx;
  }

  .tests {
    .test-item {
      position: relative;
      height: 120rpx;
      border-bottom: solid 1px #f2f2f2;
      display: flex;
      align-items: center;

      img {
        width: 80rpx;
        height: 80rpx;
        margin: 0 20rpx;
        border-radius: 10rpx;
      }

      .test-status {
        position: absolute;
        right: 40rpx;
      }
    }
  }

  .discussions {
    .discussion-item {
      height: 90rpx;
      border-bottom: solid 1px #f2f2f2;
      display: flex;
      align-items: center;
    }
  }
}
</style>
