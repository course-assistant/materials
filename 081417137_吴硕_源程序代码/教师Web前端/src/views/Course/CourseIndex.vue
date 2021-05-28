<template>
  <div class="course-index">
    <!-- 侧边菜单 -->
    <div class="aside">
      <div class="course-detail">
        <img class="course-cover" :src="courseCover" alt="" />
        <p class="course-name">{{ courseName }}</p>
      </div>

      <el-menu
        default-active="lesson"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item index="class">
          <i class="el-icon-menu"></i>
          <span slot="title">班级管理</span>
        </el-menu-item>

        <el-menu-item index="lesson">
          <i class="el-icon-s-opportunity"></i>
          <span slot="title">教学内容</span>
        </el-menu-item>

        <el-menu-item index="week-mission">
          <i class="el-icon-s-order"></i>
          <span slot="title">任务</span>
        </el-menu-item>

        <el-menu-item index="test">
          <i class="el-icon-s-claim"></i>
          <span slot="title">随堂测试</span>
        </el-menu-item>

        <el-menu-item index="discussion">
          <i class="el-icon-s-comment"></i>
          <span slot="title">课堂讨论</span>
        </el-menu-item>

        <el-menu-item index="statistics">
          <i class="el-icon-s-marketing"></i>
          <span slot="title">统计</span>
        </el-menu-item>

        <el-menu-item index="setting">
          <i class="el-icon-s-tools"></i>
          <span slot="title">管理</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 主窗口 -->
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这个0可以记录有没有传递课程id，没有传递的默认就是0
      courseId: 0,
      courseName: '测试课程',
      courseCover: 'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/01.jpg',
    }
  },

  methods: {
    // 点击菜单切换 并携带参数
    handleSelect(path) {
      // 避免重复跳转
      let paths = this.$route.path.split('/');
      if (paths.pop() === path) {
        return;
      }

      // this.$router.replace({ name: index, query: { courseid: this.courseId } });
      this.$router.replace({
        path: `/course/${this.courseId}/${path}`
      });
    }
  },

  async created() {
    // 获取传递的参数
    // this.courseId = this.$route.query.courseid;
    this.courseId = this.$route.params.course_id;

    // 根据id查询课程
    let [data, err] = await this.$awaitWrap(this.$get('course/findbyid', {
      id: this.courseId
    }));

    if (err) {
      this.$message.warning(err);
      setTimeout(() => {
        this.$router.push({ path: '/' });
      }, 500);
      return;
    }
    this.courseName = data.data.course_name;
    this.courseCover = data.data.course_cover;
  },

  mounted() {
    // 默认打开学时菜单
    this.handleSelect('lesson');
  }
}
</script>

<style lang="less" scoped>
.course-index {
  // background: palegreen;

  display: flex;
  .aside {
    width: 180px;
    height: 100%;
    background: #fff;

    .course-detail {
      width: 100%;
      height: 110px;
      margin-top: 30px;
      margin-bottom: 20px;
      // background: pink;
      text-align: center;
      cursor: pointer;

      .course-cover {
        width: 138px;
        height: 78px;
        border-radius: 6px;
        object-fit: cover;
      }

      .course-name {
        margin-top: 4px;
        font-size: 16px;
      }
    }
  }

  .main {
    flex: 1;
    height: 100%;
    // background: green;
  }
}
</style>