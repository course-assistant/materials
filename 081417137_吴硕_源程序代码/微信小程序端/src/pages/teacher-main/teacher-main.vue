<template>
  <div class="teacher">
    <div class="content">
      <TeacherIndex v-if="active == 0" @switchTab="switchTab" />

      <TeacherCourse v-if="active == 1" />

      <TeacherMe v-if="active == 2" />
    </div>

    <!-- tabbar -->
    <van-tabbar :active="active" @change="onTabbarChange">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="orders-o">课程</van-tabbar-item>
      <van-tabbar-item icon="user-o">我</van-tabbar-item>
    </van-tabbar>

    <van-toast id="custom-selector" />
  </div>
</template>

<script>
import TeacherIndex from '@/views/teacher-index.vue';
import TeacherCourse from '@/views/teacher-course-list.vue';
import TeacherMe from '@/views/teacher-me.vue';

export default {
  data() {
    return {
      active: 0
    }
  },

  components: {
    TeacherIndex,
    TeacherCourse,
    TeacherMe
  },

  methods: {

    // 点击下面的tabbar时
    onTabbarChange(event) {
      this.active = event.mp.detail;
    },


    // 给子组件调用，用来切换tab
    switchTab(index) {
      this.active = index;
    }
  },

  beforeMount() {
    // 在进入此页面时，显示第0页
    this.active = 0;
  },

}
</script>

<style lang="scss" scoped>
.teacher {
  width: 100%;
  height: 100%;

  .content {
    width: 100%;
    height: calc(100% - 50px);
    overflow: auto;
  }
}
</style>