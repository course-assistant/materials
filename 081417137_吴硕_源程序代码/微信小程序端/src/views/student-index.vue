<template>
  <div class="student-index">
    <!-- 轮播图 -->
    <swiper
      class="swiper"
      :indicator-dots="true"
      :autoplay="true"
      :interval="2000"
      :duration="500"
      indicator-color="#8d93b5"
      indicator-active-color="#fff"
    >
      <block v-for="(swiper, index) in swipers" :key="index">
        <swiper-item>
          <img :src="swiper" alt="" />
        </swiper-item>
      </block>
    </swiper>

    <!-- 应用 -->
    <div class="apps">
      <van-grid :border="false">
        <van-grid-item class="app-item" use-slot @click="toMyCourse">
          <i class="iconfont icon-course" style="color: #08aeab"></i>
          <p class="name">我的课程</p>
        </van-grid-item>
        <van-grid-item class="app-item" use-slot @click="notNow">
          <i class="iconfont icon-evaluate" style="color: #08aeab"></i>
          <p class="name">自我评估</p>
        </van-grid-item>
        <van-grid-item class="app-item" use-slot @click="notNow">
          <i class="iconfont icon-app" style="color: #08aeab"></i>
          <p class="name">四六级</p>
        </van-grid-item>
        <van-grid-item class="app-item" use-slot @click="notNow">
          <i class="iconfont icon-video" style="color: #4e8df6"></i>
          <p class="name">视频</p>
        </van-grid-item>
        <van-grid-item class="app-item" use-slot @click="notNow">
          <i class="iconfont icon-query" style="color: #08aeab"></i>
          <p class="name">成绩查询</p>
        </van-grid-item>
        <van-grid-item class="app-item" use-slot @click="notNow">
          <i class="iconfont icon-more" style="color: #93a2f9"></i>
          <p class="name">更多工具</p>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 最近课程 -->
    <div class="recent-course">
      <p>最近课程</p>
      <div class="course-list">
        <div
          class="course-item"
          v-for="(course, index) in courses"
          :key="index"
          @click="toCourseDetail(course.course_id)"
        >
          <img class="cover" :src="course.course_cover" alt="" />
          <p class="name">{{ course.course_name }}</p>
          <p class="subname">{{ course.teacher_name }}</p>
        </div>
      </div>
      <!-- 没有课程时提示 -->
      <div v-if="courses == null || courses.length == 0">
        <p style="margin-left: 30rpx; font-size: 30rpx">暂无课程</p>
      </div>
    </div>

    <!-- app -->
    <p style="margin: 0 0 10rpx 25rpx; font-size: 36rpx">反馈</p>
    <div class="apps">
      <van-grid :border="false">
        <van-grid-item class="app-item" use-slot @click="notNow">
          <i class="iconfont icon-feedback" style="color: #08aeab"></i>
          <p class="name">意见反馈</p>
        </van-grid-item>

        <van-grid-item class="app-item" use-slot @click="notNow">
          <i class="iconfont icon-bug" style="color: #08aeab"></i>
          <p class="name">Bug反馈</p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      swipers: [
        'https://uc.chaoxing.com/backSchool/images/mBanner.png',
        'https://uc.chaoxing.com/backSchool/images/mBanner.png',
        'https://uc.chaoxing.com/backSchool/images/mBanner.png'
      ],

      courses: [
        // {
        //   course_id: 0,
        //   course_name: '课程',
        //   teacher_name: '教师',
        //   course_cover: 'https://p.ananas.chaoxing.com/star3/origin/a597b7c95a3e72dbbdb21f17011ce85f.jpg'
        // },
      ],
    }
  },

  methods: {
    // 刷新最近的4个课程
    async refreshRecentCourse() {
      console.log('加载课程...');
      this.$loading('加载课程...');
      let [data, err] = await this.$awaitWrap(this.$get('course/findbystudentid', {
        id: wx.getStorageSync('hncj_assistant_wx_user_id'),
        page: 0,
        size: 4,
        status: 1
      }));
      if (err) {
        wx.hideLoading();
        return;
      }
      this.courses = data.data;
      wx.hideLoading();
    },

    toCourseDetail(id) {
      console.log('to ' + id);
      wx.navigateTo({
        url: `/pages/user-course-detail/main?course_id=${id}`
      });
    },

    // 切换页面
    switchTab() {
      this.$emit('switchTab', 1);
    },

    // 提示功能还不可用
    notNow() {
      wx.showToast({
        title: '此功能目前在实验阶段，暂时不可用',
        icon: 'none',
        duration: 1500
      });
    },
    toMyCourse(){
      wx.showToast({
        title: '点击跳转到课程页面',
        icon: 'none',
        duration: 1500
      });
    }


  },

  async beforeMount() {
    await this.refreshRecentCourse();
  },
}
</script>

<style lang="scss" scoped>
.student-index {
  width: 100%;
  // height: 100%;
  background: #f7f7f7;
  overflow: auto;

  .swiper {
    width: 100%;
    height: 360rpx;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .apps {
    margin: 20rpx;
    padding: 0 15rpx;
    border-radius: 16rpx;
    background: #fff;
    .app-item {
      i {
        font-size: 58rpx;
        margin-bottom: 8rpx;
      }
      .name {
        margin-top: 5rpx;
        font-size: 24rpx;
      }
    }
  }

  .recent-course {
    p {
      margin: 0 0 10rpx 25rpx;
      font-size: 36rpx;
    }
    .course-list {
      margin: 0 20rpx;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .course-item {
        width: 49%;
        height: 280rpx;
        margin-bottom: 18rpx;
        background: #fff;
        border-radius: 16rpx;

        .cover {
          width: 100%;
          height: 190rpx;
          border-top-left-radius: 16rpx;
          border-top-right-radius: 16rpx;
          object-fit: cover;
          margin: 0;
        }

        .name {
          margin: 0;
          margin-top: -5rpx;
          margin-left: 15rpx;
          font-weight: bold;
          height: 40rpx;
          line-height: 40rpx;
          font-size: 28rpx;
        }

        .subname {
          margin: 0;
          margin-left: 15rpx;
          height: 45rpx;
          line-height: 45rpx;
          font-size: 22rpx;
        }
      }
    }
  }
}
</style>
