<template>
  <div class="student-course-detail">
    <div class="head">
      <img class="head" :src="course_data.course_cover" alt="" />
      <p class="course-name">{{ course_data.course_name }}</p>
      <p class="teacher-name">{{ course_data.teacher_name }}</p>
    </div>

    <van-tabs
      :active="active"
      @change="onTabChange"
      color="#4396f7"
      animated
      swipeable
      sticky
    >
      <!-- 教学内容 -->
      <van-tab title="教学内容"></van-tab>

      <!-- 任务 -->
      <van-tab title="任务">
        <!--        <WeekMission-->
        <!--          :course_id="course_data.course_id"-->
        <!--          ref="weekMission"-->
        <!--        />-->

        <div
          v-for="(l, index_m) in 3"
          :key="index_m"
          @click.stop="showRw(index_m)"
          style="background-color: #fff; padding-left: 10rpx"
        >
          <div
            style="height: 70rpx; border-bottom: 1px solid #eeeff3"
            @click="click_m(index_m)"
          >
            <img
              style="width: 32rpx; height: 32rpx; margin-right: 16rpx"
              src="../../access/img/任务.png"
              alt=""
            />
            第{{ index_m + 1 }}周
            <van-icon
              style="float: right; margin-right: 20px"
              :name="!isShow ? 'arrow' : 'arrow-down'"
            />
          </div>

          <!--          arrow-up-->

          <ul v-if="isShow[index_m] === 1 ? true : false">
            <li
              class="fold_li"
              v-for="(p, index_li) in 2"
              :key="index_li"
              @click="click_li(index_li)"
            >
              <div class="c_li">
                <img
                  style="width: 32rpx; height: 32rpx; margin-right: 16rpx"
                  src="../../access/img/finish.png"
                  alt=""
                />
                任务{{ index_li + 1 }}
              </div>
            </li>
          </ul>
        </div>
      </van-tab>

      <!--  -->
      <van-tab title="课堂讨论">
        <div class="discussion">
          <DiscussionItem :discussion="discussion" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import Period from '@/views/student-course-periods.vue';

import DiscussionItem from '@/components/DiscussionItem.vue';

import WeekMission from '@/views/student-course-weekmissions.vue';

export default {

  data() {
    return {
      isShow: [],
      activeNames: ['1'],

      active: 0,

      course_data: {
        course_id: 0
      },

      discussion: {
        student_avatar: 'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/avatar/avatar_teacher_female.jpg',
        student_name: '张妍琰',
        comment_date: '2021-2-3',
        comment_content: '我觉得话可以'
      },

    }
  },

  components: {
    Period,
    WeekMission,
    DiscussionItem
  },

  methods: {
    onTabChange(event) {
    },
    handleClick() {
      console.log('点击了');
    },
    showRw(index_m) {
      // console.log('点击了' + (index_m+1));

      if (this.isShow[index_m] === 1) {
        for (let i = 0; i < this.isShow.length; i++) {
          Vue.set(this.isShow, i, 0)
        }
      } else {
        for (let i = 0; i < this.isShow.length; i++) {
          Vue.set(this.isShow, i, 0)
        }
        Vue.set(this.isShow, index_m, 1)
      }
    },
    click_li(index_li) {

      wx.navigateTo({
        url: `/pages/user-weekmission-detail/main`
      });
      console.log('点击了' + (index_li + 1));
    },
    click_m(index_m) {
      console.log('点击了周任务' + (index_m + 1));
    }
  },

  async beforeMount() {
    // 加载数据
    let [data, err] = await this.$awaitWrap(this.$get('course/findbyid', {
      id: this.course_data.course_id
    }));
    console.log('获取课程详情');
    console.log(data);
    this.course_data = data.data;

    // 更新标题
    wx.setNavigationBarTitle({
      title: this.course_data.course_name
    })



    // 刷新子组件
    this.$refs.period.refresh();
    this.$refs.weekMission.refresh();
  },

  onLoad(option) {
    this.course_data.course_id = option.course_id;
  }

}
</script>


<style lang="scss" scoped>
.student-course-detail {
  height: 100%;

  // background: #f5f6f8;
  background: #fff;

  .head {
    position: relative;
    img {
      width: 100%;
      height: 270rpx;
      object-fit: cover;
      vertical-align: middle;
    }

    .course-name {
      position: absolute;
      top: 155rpx;
      left: 25rpx;
      padding: 0;
      font-size: 36rpx;
      font-weight: bold;
      color: #fff;
    }

    .teacher-name {
      position: absolute;
      top: 210rpx;
      left: 25rpx;
      padding: 0;
      font-size: 26rpx;
      color: #fff;
    }

    .discussion {
      background: pink;
    }
  }
}

.fold_li {
  position: relative;
  /*background-color: ##f2f3f5;*/
  background-color: #fff;
  height: 70rpx;
  color: #444444;
  padding-left: 20rpx;
  line-height: 70rpx;
  border-bottom: 1px solid #eeeff3;
}
</style>
