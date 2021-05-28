<template>
  <div class="user-lesson-detail">
    <!-- 课时内容 -->
    <div class="lesson-detail">
      <p class="title">主讲内容</p>
      <p class="content" v-html="lesson.lesson_content"></p>
    </div>

    <van-button
      class="btn-evaluate"
      round
      type="info"
      icon="comment-o"
      color="#ffd21e"
      size="small"
      @click="toEvaluate"
    >
      课时评价
    </van-button>

    <!-- 空提示 -->
    <div v-if="infos.evaluation_count == null || infos.evaluation_count == 0">
      <van-empty image="search" description="暂无评价" />
    </div>

    <div v-else>
      <!-- 总分 -->
      <div class="rate">
        <div class="item">
          <span>
            教师教学质量 <span class="score">{{ infos.avg_quality }}</span> 分
          </span>
          <van-rate
            class="stars"
            :value="infos.avg_quality"
            size="42rpx"
            icon="star"
            void-icon="star-o"
            allow-half
            readonly
          />
          <span class="num">{{ infos.evaluation_count }} 人</span>
        </div>

        <div class="item">
          <span>
            学生掌握程度 <span class="score">{{ infos.avg_degree }}</span> 分
          </span>
          <van-rate
            class="stars"
            :value="infos.avg_degree"
            size="42rpx"
            icon="star"
            void-icon="star-o"
            allow-half
            readonly
          />
          <span class="num">{{ infos.evaluation_count }} 人</span>
        </div>
      </div>

      <!-- 学时评价 -->
      <div
        class="evaluation-item"
        v-for="(evaluation, index) in evaluations"
        :key="index"
      >
        <!-- 头像部分 -->
        <div class="info">
          <img
            class="avatar"
            src="https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/avatar/avatar-anonymous.png"
            alt=""
          />

          <div class="rates">
            <div>
              <van-rate
                :value="evaluation.evaluation_quality"
                size="24rpx"
                icon="star"
                void-icon="star-o"
                allow-half
                readonly
              />
            </div>
            <div>
              <van-rate
                :value="evaluation.evaluation_degree"
                size="24rpx"
                icon="star"
                void-icon="star-o"
                allow-half
                readonly
              />
            </div>
          </div>

          <div style="margin-left: 18rpx; margin-top: 5rpx">
            <p class="date">{{ evaluation.evaluation_date }}</p>
          </div>
        </div>

        <!-- 内容 -->
        <p class="content">{{ evaluation.evaluation_content }}</p>
        <van-divider />
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      lesson: {
        lesson_id: 0,
        lesson_name: '课时01',
        lesson_content: '（1）Android简介（了解）\n（2）Android Studio的安装与调试（掌握）。'
      },

      infos: {
        // 平均评分
        avg_quality: '0',
        avg_degree: '0',
        // 评价人数
        evaluation_count: 10,
      },

      // 评价
      evaluations: [
        {
          evaluation_content: '老师教的很好！',
          evaluation_date: '2021-3-4',
          evaluation_degree: 4,
          evaluation_quality: 5
        },
      ],

    }
  },

  async beforeMount() {
    console.log(this.lesson.lesson_id);
    await this.refresh();
  },


  methods: {
    async refresh() {

      // 加载课时内容
      let [d1, e1] = await this.$awaitWrap(this.$get('lesson/selectbylessonid', {
        id: this.lesson.lesson_id
      }));
      console.log('lesson');
      console.log(d1);
      this.lesson = d1.data;

      // 加载评价
      let [d2, e2] = await this.$awaitWrap(this.$get('evaluation/selectbyid', {
        id: this.lesson.lesson_id
      }));
      console.log('evaluation');
      console.log(d2);
      this.evaluations = d2.data;

      // 计算平均
      this.calc();

      // 处理换行
      this.lesson.lesson_content = this.convertHtml(this.lesson.lesson_content);
    },


    calc() {
      console.log('计算');
      this.infos.evaluation_count = this.evaluations.length;
      let d = 0;
      let q = 0;
      this.evaluations.forEach(e => {
        d += e.evaluation_degree;
        q += e.evaluation_quality;
      });
      console.log(d);
      console.log(q);
      this.infos.avg_degree = (d / this.infos.evaluation_count).toFixed(1) + "";
      this.infos.avg_quality = (q / this.infos.evaluation_count).toFixed(1) + "";
    },

    toEvaluate() {
      if (wx.getStorageSync('hncj_assistant_wx_user_type') == 2) {
        this.$toast('教师不能评价自己的课时');
        return;
      }
      wx.navigateTo({
        url: `/pages/student-evaluate/main?lesson_id=${this.lesson.lesson_id}`
      });
    },

  },

  onLoad(option) {
    this.lesson.lesson_id = option.lesson_id;
  }


}
</script>

<style lang="scss" scoped>
.user-lesson-detail {
  position: relative;

  .lesson-detail {
    .title {
      margin-left: 10rpx;
      font-weight: bold;
    }

    .content {
      // margin-top: 10rpx;
      margin-left: 10rpx;
    }
  }

  .rate {
    width: calc(100% - 30rpx);
    margin: 15rpx;
    margin-bottom: 25rpx;
    border-radius: 10rpx;
    background: #fef3da;

    .item {
      height: 100rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      .stars {
        margin: 0 10rpx;
      }

      span {
        font-size: 28rpx;
      }

      .score {
        color: #ffd21e;
        font-size: 44rpx;
      }

      .num {
        color: #c0c0c0;
      }
    }
  }

  // 评价
  .evaluation-item {
    position: relative;
    width: 100%;

    .rates {
      position: absolute;
      top: 0;
      right: 25rpx;
    }

    .info {
      margin: 0 20rpx;
      display: flex;
      .avatar {
        width: 70rpx;
        height: 70rpx;
        border-radius: 12rpx;
      }
      .name {
        height: 35rpx;
        line-height: 35rpx;
        font-size: 28rpx;
      }
      .date {
        height: 35rpx;
        line-height: 35rpx;
        font-size: 24rpx;
      }
    }

    .content {
      margin: 0 20rpx;
      margin-top: 6rpx;
      margin-left: 105rpx;
    }
  }

  .btn-evaluate {
    position: fixed;
    right: 20rpx;
    bottom: 20rpx;
    z-index: 99;
  }
}
</style>