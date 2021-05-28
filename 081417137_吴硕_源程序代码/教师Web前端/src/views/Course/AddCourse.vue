<template>
  <div class="container">
    <div class="round-div">
      <el-form
        class="form"
        label-position="right"
        label-width="80px"
        :model="addCourseFormData"
        :rules="rules"
      >
        <p class="title">新建课程</p>

        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="addCourseFormData.courseName" clearable></el-input>
        </el-form-item>

        <el-form-item label="课程教师">
          <el-input v-model="addCourseFormData.teacherName" disabled></el-input>
        </el-form-item>

        <el-form-item label="课程封面">
          <el-image
            :src="addCourseFormData.courseCover"
            style="width: 240px; height: 130px; border-radius: 5px"
          >
          </el-image>

          <!-- 添加封面 -->
          <el-popover placement="right" width="600" trigger="click">
            <div style="width: 100%; height: 380px; overflow: auto">
              <el-image
                class="cover-item"
                style="
                  width: 180px;
                  margin: 5px;
                  border-radius: 5px;
                  cursor: pointer;
                "
                v-for="(url, index) in coverUrls"
                :key="index"
                :src="url"
                @click="selectCover(url, index)"
              />
            </div>

            <el-link
              class="select-cover-btn"
              type="primary"
              slot="reference"
              icon="el-icon-edit"
              :underline="false"
            >
              选择系统封面
            </el-link>
          </el-popover>
        </el-form-item>

        <!-- <el-form-item label="课程说明">
          <el-input v-model="addCourseFormData.type" clearable></el-input>
        </el-form-item> -->

        <el-form-item
          style="width: 300px"
          label="课程周数"
          prop="courseWeekNum"
        >
          <el-input v-model="addCourseFormData.courseWeekNum"></el-input>
        </el-form-item>

        <!-- <el-form-item label="周课程数">
          <el-col class="line" :span="2" style="margin-left: 10px">
            单周节数
          </el-col>
          <el-col :span="4">
            <el-input v-model="addCourseFormData.oddLesson"></el-input>
          </el-col>

          <el-col class="line" :span="2" style="margin-left: 10px">
            双周节数
          </el-col>
          <el-col :span="4">
            <el-input v-model="addCourseFormData.evenLesson"></el-input>
          </el-col>
          <el-col class="line" :span="10" style="margin-left: 20px">
            注：指课程表上的一节课
          </el-col>
        </el-form-item> -->

        <div class="btns">
          <el-button
            type="primary"
            icon="el-icon-connection"
            round
            @click="handleClone"
          >
            克隆已有课程
          </el-button>
          <el-button round @click="handleCancel">取消创建</el-button>
          <el-button
            type="primary"
            round
            @click="handleFinish"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在创建课程！请不要离开此页面！"
          >
            完成
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import jwtDecode from '@/util/jwt-decode.js';

export default {
  data() {
    return {
      addCourseFormData: {
        teacherId: '0',
        courseName: '',
        teacherName: '',
        courseCover: 'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/01.jpg',
        courseWeekNum: 1,
        oddLesson: 1,
        evenLesson: 1
      },

      // 封面url
      coverUrls: [
        'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/01.jpg',
        'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/02.jpg',
        'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/03.jpg',
        'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/04.jpg',
        'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/05.jpg',
        'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/06.jpg',
        'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/07.jpg',
        'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/08.jpg',
        'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/09.jpg',
        'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/10.jpg',
        'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/11.jpg',
        'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/12.jpg',
        'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/13.jpg',
        'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/14.jpg',
      ],

      // 检验规则
      rules: {
        courseName: [
          { required: true, message: '请输入课程名称' }
        ],
        courseWeekNum: [
          { required: true, message: '请输入课程周数' }
        ],
        weekPeriodNum: [
          { required: true, message: '请输入周学时数' }
        ]
      },

      fullscreenLoading: false
    }
  },

  methods: {
    // 点击选择封面
    selectCover(url, index) {
      this.addCourseFormData.courseCover = url;
    },

    // 取消创建
    handleCancel() {
      this.$confirm('此操作将无法撤销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.replace('/');
      }).catch(() => {
        // this.$message.info('操作已取消');
      });
    },

    // 点击克隆
    handleClone() {
      this.$message.info('克隆');
    },

    // 点击完成
    async handleFinish() {
      console.log(this.addCourseFormData);
      if (!this.checkForm()) {
        this.$message.warning('请填写所有内容 ！');
        return;
      }
      // 加载loading
      this.fullscreenLoading = true;

      let [data, err] = await this.$awaitWrap(this.$post('course/insert', {
        teacher_id: this.addCourseFormData.teacherId,
        name: this.addCourseFormData.courseName,
        cover: this.addCourseFormData.courseCover,
        week: this.addCourseFormData.courseWeekNum,
        odd_lesson: this.addCourseFormData.oddLesson,
        even_lesson: this.addCourseFormData.evenLesson
      }));

      if (err) {
        this.fullscreenLoading = false;
        this.$message.warning('创建失败：' + err);
        this.$router.push({
          path: '/addcourse'
        });
        return;
      }
      this.fullscreenLoading = false;
      this.$router.replace('/');
    },

    // 检查表单内容
    checkForm() {
      if (this.addCourseFormData.courseName.trim() === ''
        || this.addCourseFormData.courseWeekNum === ''
        || this.addCourseFormData.oddLesson === ''
        || this.addCourseFormData.evenLesson === '') {
        return false;
      }
      return true;
    }
  },

  // 获取数据
  async beforeMount() {
    // 获取教师id
    let jwt = localStorage.getItem('hncj_management_teacher_token');
    this.addCourseFormData.teacherId = jwtDecode(jwt).id;
    // 获取教师名
    let [data, err] = await this.$awaitWrap(this.$get('teacher/selectbyid', {
      id: this.addCourseFormData.teacherId
    }));
    if (err) {
      this.$message.warning(err);
      this.$router.push({
        path: '/'
      });
      return;
    }
    this.addCourseFormData.teacherName = data.data.teacher_name;
  },

}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f2f4f7;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  .round-div {
    height: 520px;
    width: 980px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .form {
      padding: 20px 40px;

      .title {
        font-size: 21px;
        margin-left: -10px;
        margin-bottom: 20px;
      }

      .select-cover-btn {
        margin-left: 16px;
      }

      .btns {
        float: right;
        margin-top: 10px;
      }
    }
  }
}
</style>