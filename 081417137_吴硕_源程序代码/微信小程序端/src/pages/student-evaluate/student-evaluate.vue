<template>
  <div class="student-evaluate">
    <!-- 评分 -->
    <div class="rate">
      <p>教师教学质量</p>
      <van-rate
        :value="rate"
        size="55rpx"
        icon="star"
        void-icon="star-o"
        @change="onQualityChange"
      />
    </div>
    <div class="rate">
      <p>自己掌握程度</p>
      <van-rate
        :value="rate"
        size="55rpx"
        icon="star"
        void-icon="star-o"
        @change="onDegreeChange"
      />
    </div>

    <!-- 评价 -->
    <div class="evaluate">
      <textarea class="text" placeholder="请输入评价" @input="onTextInput" />
    </div>

    <!-- 评价按钮 -->
    <van-button
      class="btn-evaluate"
      round
      color="#feb11d"
      icon="star-o"
      @click="issue"
    >
      匿名评价
    </van-button>

    <!-- 确认弹框 -->
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Dialog from '@/../static/vant/dialog/dialog';

export default {
  data() {
    return {
      degree: 0,
      quality: 0,
      content: ''
    }
  },

  methods: {
    issue() {
      Dialog.confirm({
        title: '请确保评价真实有效！',
        message: '评价发布后将不可修改，确定发布？',
      }).then(async () => {
        let [data, err] = await this.$awaitWrap(this.$post('evaluation/issue', {
          lesson_id: this.lesson_id,
          student_id: wx.getStorageSync('hncj_assistant_wx_user_id'),
          content: this.content,
          degree: this.degree,
          quality: this.quality
        }));
        if (err) {
          this.$catch(err);
          return;
        }
        this.$toast(data.msg);
        // 返回上一页
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1000);
      }).catch(() => {
      });
    },

    onQualityChange(e) {
      this.quality = e.mp.detail;
    },

    onDegreeChange(e) {
      this.degree = e.mp.detail;
    },

    onTextInput(e) {
      this.content = e.mp.detail.value;
    }
  },

  onLoad(option) {
    this.lesson_id = option.lesson_id;
  },
}
</script>

<style lang="scss" scoped>
.student-evaluate {
  overflow: auto;
  .rate {
    margin: 20rpx 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    // background: sandybrown;

    p {
      margin-right: 10rpx;
    }
  }

  .evaluate {
    .text {
      width: calc(100% - 70rpx);
      height: 300rpx;
      margin: 20rpx;
      padding: 15rpx;
      background: #f3f3f3;
      border-radius: 10rpx;
    }
  }

  .btn-evaluate {
    float: right;
    margin-right: 20rpx;
  }
}
</style>