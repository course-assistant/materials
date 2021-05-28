<template>
  <div class="container">
    <div class="round-div">
      <div style="margin: 20px 30px">
        <div class="section">
          <p class="title">课程封面</p>
          <img class="cover" :src="course.course_cover" alt="" />
        </div>

        <div class="section">
          <p class="title">课程名称</p>

          <el-input
            v-if="editing"
            v-model="course.course_name"
            placeholder="请输入课程名称"
            style="width: 300px"
          ></el-input>

          <p v-else>{{ course.course_name }}</p>
        </div>

        <div class="section">
          <p class="title">课程教师</p>
          <p>{{ course.teacher_name }}</p>
        </div>

        <el-button v-if="editing" type="primary" round @click="save"
          >保存</el-button
        >
        <el-button v-else type="primary" round @click="edit">编辑</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      courseId: 0,

      editing: false,

      course: {
        course_cover: '',
        course_name: '',
        teacher_name: ''
      }
    }
  },

  // 加载数据
  async beforeMount() {
    await this.refresh();
  },

  methods: {
    // 加载数据
    async refresh() {
      let [data, err] = await this.$awaitWrap(this.$get('course/findbyid', {
        id: this.$route.params.course_id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.course = data.data;
    },

    // 点击编辑
    edit() {
      this.editing = true;
    },

    // 保存修改
    async save() {
      let [data, err] = await this.$awaitWrap(this.$post('course/update', {
        course_id: this.$route.params.course_id,
        teacher_id: localStorage.getItem('hncj_management_teacher_id'),
        name: this.course.course_name
      }));
      if (err) {
        this.$message.warning(err);
        this.editing = false;
        return;
      }
      await this.refresh();
      this.$message.success(data.msg);
      this.editing = false;
    },
  },

  beforeCreate() {
    // 检有没有携带参数
    if (this.$route.query.courseid === 0) {
      this.$router.replace('/');
    }
  },


}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f2f4f7;
  display: flex;
  justify-content: center;
  align-items: center;

  .round-div {
    width: 100%;
    min-width: 1000px;
    height: calc(100% - 60px);
    margin: 30px;
    margin-top: 30px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .section {
      margin-bottom: 20px;
      .title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .cover {
        width: 280px;
        height: 168px;
        border-radius: 6px;
      }
    }
  }
}
</style>