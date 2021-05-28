<template>
  <div class="period-evaluation">
    <!-- 空提示 -->
    <div v-if="evaluation_count == null || evaluation_count == 0">
      <van-empty image="search" description="暂无评价" />
    </div>

    <div v-else>
      <!-- 总分 -->
      <div class="rate">
        <div class="item">
          <span>
            教师教学质量 <span class="score">{{ avg_quality }}</span> 分
          </span>
          <van-rate
            class="stars"
            :value="avg_quality"
            size="42rpx"
            icon="star"
            void-icon="star-o"
            allow-half
            readonly
          />
          <span class="num">{{ evaluation_count }} 人</span>
        </div>

        <div class="item">
          <span>
            学生掌握程度 <span class="score">{{ avg_degree }}</span> 分
          </span>
          <van-rate
            class="stars"
            :value="avg_degree"
            size="42rpx"
            icon="star"
            void-icon="star-o"
            allow-half
            readonly
          />
          <span class="num">{{ evaluation_count }} 人</span>
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
          <img class="avatar" :src="evaluation.student_avatar" alt="" />

          <div class="rates">
            <div>
              <van-rate
                :value="evaluation.period_evaluate_quality"
                size="24rpx"
                icon="star"
                void-icon="star-o"
                allow-half
                readonly
              />
            </div>
            <div>
              <van-rate
                :value="evaluation.period_evaluate_degree"
                size="24rpx"
                icon="star"
                void-icon="star-o"
                allow-half
                readonly
              />
            </div>
          </div>

          <div style="margin-left: 18rpx; margin-top: 5rpx">
            <div class="name">
              {{ evaluation.student_name }}
            </div>
            <p class="date">{{ evaluation.period_evaluate_date }}</p>
          </div>
        </div>

        <!-- 内容 -->
        <p class="content">{{ evaluation.period_evaluate_content }}</p>
        <van-divider />
      </div>
    </div>
  </div>
</template>

<script>
import EvaluationItem from '@/components/EvaluationItem.vue';

export default {

  data() {
    return {

      // 平均评分
      avg_quality: '0',
      avg_degree: '0',

      // 评价人数
      evaluation_count: 10,

      // 评价
      evaluations: [
        {
          student_id: 0,
          student_name: '匿名评价',
          student_avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          period_evaluate_id: 0,
          period_id: 0,
          period_evaluate_content: '老师教的很好！',
          period_evaluate_date: '2021-3-4',
          period_evaluate_degree: 4,
          period_evaluate_quality: 5
        },
        {
          student_id: 0,
          student_name: '匿名评价',
          student_avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          period_evaluate_id: 0,
          period_id: 0,
          period_evaluate_content: '老师教的很好！',
          period_evaluate_date: '2021-3-4',
          period_evaluate_degree: 3,
          period_evaluate_quality: 4
        }
      ],

      showEvaluateDialog: false,
    }
  },

  components: { EvaluationItem },

  props: ['periodid'],

  methods: {

    async refreshEvaluations() {
      // let [data, err] = await this.$awaitWrap(this.$get('periodevaluation/select', {
      //   period_id: this.periodid
      // }));
      // if (err) {
      //   this.$catth(err);
      //   return;
      // }
      // console.log('查询评价');
      // console.log(data);
      // this.avg_quality = data.data.avg_quality;
      // this.avg_degree = data.data.avg_degree;
      // this.evaluations = data.data.evaluations;
      // this.evaluation_count = data.data.evaluation_count;
    },
  },


}
</script>

<style lang="scss" scoped>
.period-evaluation {
  position: relative;

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
}
</style>