<template>
  <div class="teacher-index">
    <!-- 轮播图 -->
    <div class="swiper">
      <img src="https://uc.chaoxing.com/backSchool/images/mBanner.png" alt="" />
    </div>

    <!-- 应用 -->
    <div class="app">
      <div class="app-title"><p>教学</p></div>
      <van-grid :border="false">
        <van-grid-item class="app-item" use-slot @click="switchTab">
          <i class="iconfont icon-course" style="color: #08aeab"></i>
          <p class="name">我的课程</p>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 服务 -->
    <div class="app">
      <div class="app-title"><p>服务</p></div>
      <van-grid :border="false">
        <van-grid-item class="app-item" use-slot @click="notNow">
          <i class="iconfont icon-video" style="color: #4e8df6"></i>
          <p class="name">视频</p>
        </van-grid-item>

        <van-grid-item class="app-item" use-slot @click="notNow">
          <i class="iconfont icon-book" style="color: #4e8df6"></i>
          <p class="name">图书</p>
        </van-grid-item>

        <van-grid-item class="app-item" use-slot @click="notNow">
          <i class="iconfont icon-newspaper" style="color: #83c1ff"></i>
          <p class="name">报纸</p>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 工具 -->
    <div class="app">
      <div class="app-title"><p>工具</p></div>
      <van-grid :border="false">
        <van-grid-item class="app-item" use-slot @click="notNow">
          <i class="iconfont icon-random" style="color: #0590df"></i>
          <p class="name">随机点名</p>
        </van-grid-item>

        <van-grid-item class="app-item" use-slot @click="notNow">
          <i class="iconfont icon-more" style="color: #93a2f9"></i>
          <p class="name">更多工具</p>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 反馈 -->
    <div class="app">
      <div class="app-title"><p>反馈</p></div>
      <van-grid :border="false">
        <van-grid-item class="app-item" use-slot>
          <i class="iconfont icon-feedback" style="color: #36a99e"></i>
          <p class="name">意见反馈</p>
        </van-grid-item>

        <van-grid-item class="app-item" use-slot @click="notNow">
          <i class="iconfont icon-bug" style="color: #36cfc9"></i>
          <p class="name">Bug反馈</p>
        </van-grid-item>

        <!-- <van-grid-item class="app-item" use-slot @click="notNow">
          <i class="iconfont icon-github" style="color: #191717"></i>
          <p class="name">开源地址</p>
        </van-grid-item> -->
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  methods: {

    // 切换页面
    switchTab() {
      this.$emit('switchTab', 1);
    },

    // 提示功能还不可用
    notNow() {
      this.$toast('此功能目前在实验阶段，暂时不可用');
    }
  },
}
</script>

<style lang="scss" scoped>
.teacher-index {
  width: 100%;
  height: 100%;
  background: #fff;

  .swiper {
    width: 100%;
    height: 360rpx;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .app {
    .app-title {
      height: 55rpx;
      background: #f7f8f9;
      p {
        color: #9a9a9a;
        height: 55rpx;
        line-height: 55rpx;
        margin-left: 18rpx;
        font-size: 30rpx;
      }
    }

    // 单个应用的样式
    .app-item {
      i {
        font-size: 80rpx;
      }
      .name {
        margin-top: 15rpx;
        font-size: 28rpx;
      }
    }
  }
}
</style>