<template>
  <div class="period-detail">
    <van-tabs :active="active" color="#4396f7" animated swipeable sticky>
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
          >
            <img
              src="https://mooc1-api.chaoxing.com/images/work/phone/task-work-gray.png"
              alt=""
            />
            <p class="test-name">{{ test.period_test_name }}</p>
            <p
              v-if="test.period_test_status == 2"
              class="test-status"
              @click="issueTest(test.period_test_id)"
            >
              未发布
            </p>
            <p v-else class="test-status">已发布</p>
          </div>
        </div>
      </van-tab>

      <van-tab title="课堂讨论">
        <div class="discussions">
          <div
            class="discussion-item"
            v-for="(discussion, index) in discussions"
            :key="index"
          >
            <van-tag plain type="primary" style="margin: 0 20rpx">讨论</van-tag>
            <span>{{ discussion.discussion_title }}</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 对话框 -->
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Dialog from '@/../static/vant/dialog/dialog';

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
    issueTest(test_id) {
      console.log(test_id);
      Dialog.confirm({
        title: '提示',
        message: '确定发布该测试',
      }).then(async () => {
        console.log('发布');
        let [data, err] = await this.$awaitWrap(this.$post('periodtest/issue', {
          id: test_id
        }));
        // 刷新
        wx.showLoading({
          title: '刷新...',
          mask: true,
        });
        this.refreshTests();
        wx.hideLoading();
      }).catch(() => {
        // 操作取消
      });
    }
  },

  // 加载数据
  async beforeMount() {
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
    wx.hideLoading()
  },

  onLoad(option) {
    this.period.period_id = option.period_id;
  }

}
</script>


<style lang="scss" scoped>
.period-detail {
  height: 100%;
  background: #fff;

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
