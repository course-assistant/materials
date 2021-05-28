<template>
  <div class="student">
    <div class="content">
      <StudentIndex v-if="active == 0" />

      <StudentCourse v-if="active == 1" />

      <StudentMe v-if="active == 2" />
    </div>

    <!-- tabbar -->
    <van-tabbar :active="active" @change="onTabbarChange">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item icon="user-o">账户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import StudentIndex from '@/views/student-index.vue';
import StudentCourse from '@/views/student-course-list.vue';
import StudentMe from '@/views/student-me.vue';

export default {
  data() {
    return {
      active: 0
    }
  },

  components: {
    StudentIndex,
    StudentCourse,
    StudentMe
  },

  methods: {

    // 点击下面的tabbar时
    onTabbarChange(event) {
      this.active = event.mp.detail;
    }
  },


  beforeMount() {
    console.log('进入 学生首页');
    this.active = 0;
  },

}
</script>

<style lang="scss" scoped>
.student {
  width: 100%;
  height: 100%;
  background: #f7f7f7;

  .content {
    width: 100%;
    height: calc(100% - 50px);
    overflow: auto;
  }
}
</style>
