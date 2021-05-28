<template>
  <div class="student-management">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >
      <div class="head">
        <span class="class-name">{{ class_name }}</span>
      </div>

      <div class="options">
        <el-button
          type="primary"
          icon="el-icon-plus"
          round
          @click="addStudentVisible = true"
        >
          添加学生
        </el-button>

        <el-button
          type="primary"
          icon="el-icon-upload2"
          round
          @click="choiceXlsx"
        >
          批量导入
        </el-button>

        <el-link
          type="primary"
          :underline="false"
          style="margin-left: 10px"
          @click="downTemplate"
        >
          下载批量导入模板
        </el-link>

        <input
          style="display: none"
          ref="filElem"
          type="file"
          class="upload-file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          @change="getFile"
        />
      </div>

      <p style="margin: 20px 0 10px 30px; font-size: 12px; color: #a8a8b3">
        全部学生
      </p>

      <!-- 学生列表 -->
      <div class="student-list">
        <el-table
          class="student-table"
          ref="multipleTable"
          :data="students"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>

          <el-table-column prop="student_name" label="姓名" width="130">
          </el-table-column>

          <el-table-column prop="student_id" label="学号" width="130">
          </el-table-column>

          <el-table-column
            prop="student_phone"
            label="电话"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="removeStudent(scope.row.student_id)"
              >
                移出
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 对话框 -->
    <el-dialog title="添加学生" :visible.sync="addStudentVisible" width="50%">
      <el-form :model="addStudentForm" label-position="left">
        <el-form-item>
          <el-input
            v-model="addStudentForm.student_id"
            placeholder="请输入学号"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addStudentVisible = false" clearable>
          取 消
        </el-button>
        <el-button type="primary" @click="onAddStudent"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from 'xlsx';

export default {

  data() {
    return {
      loading: false,

      class_id: 0,
      class_name: '',
      students: [
        {
          student_id: '',
          student_name: '',
          student_phone: ''
        }
      ],
      multipleSelection: [],

      addStudentVisible: false,
      addStudentForm: {
        student_id: ''
      }
    }
  },

  methods: {
    // 刷新
    async refreshStudents() {
      // 加载班级名
      let [clsData, e] = await this.$awaitWrap(this.$get('class/findbyclassid', {
        class_id: this.class_id
      }));
      if (e) {
        this.loading = false;
        this.$router.push('/404');
        return;
      }
      this.class_name = clsData.data.class_name;

      // 加载学生
      let [data, err] = await this.$awaitWrap(this.$get('student/selectbyclassid', {
        class_id: this.class_id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.students = data.data.students;
    },


    // 删除学生
    removeStudent(id) {
      this.$cfm('确定删除？', async () => {
        let [data, err] = await this.$awaitWrap(this.$post('class/removestudent', {
          student_id: id,
          class_id: this.$route.params.class_id
        }));
        if (err) {
          this.$message.warning(err);
          return;
        }
        await this.refreshStudents();
        this.$message.success(data.msg);
      });
    },


    // 添加学生
    async onAddStudent() {
      console.log(this.addStudentForm.student_id);
      let [data, err] = await this.$awaitWrap(this.$post('class/selectionbyteacher', {
        student_id: this.addStudentForm.student_id,
        class_id: this.$route.params.class_id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      await this.refreshStudents();
      this.addStudentVisible = false;
      this.$message.success(data.msg);
    },


    // 下载模板
    downTemplate() {
      window.open("https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/template/student_class_template.xlsx", "_blank")
    },

    // 处理多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 点击选择xlsx
    choiceXlsx() {
      this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
    },

    // 处理批量添加
    async getFile() {
      const inputFile = this.$refs.filElem.files[0];
      let students = await this.$resolveXlsx(inputFile);
      console.log(students);
      // 依次导入，导入失败提示
      await (async () => {
        students.forEach(async student => {
          console.log(student.id);
          let [data, err] = await this.$awaitWrap(this.$post('class/selectionbyteacher', {
            student_id: student.id,
            class_id: this.$route.params.class_id
          }));
          if (err) {
            this.$message.warning(err);
          } else {
            this.$message.success(data.msg);
          }
        });
      })();
      await this.refreshStudents();
    }

  },

  // 加载数据
  async beforeMount() {
    this.class_id = this.$route.params.class_id;
    this.loading = true;
    await this.refreshStudents();
    this.loading = false;
  },

}
</script>

<style lang="less" scoped>
.student-management {
  width: 100%;
  height: 100%;
  background: #f2f4f7;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  .round-div {
    height: calc(100% - 60px);
    width: 100%;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .head {
      height: 60px;
      border-bottom: solid 1px #f2f2f2;
      .class-name {
        height: 60px;
        line-height: 60px;
        margin-left: 30px;
        font-size: 18px;
      }
    }

    .options {
      padding-top: 20px;
      padding-left: 30px;
    }

    .student-list {
      width: 97%;
      margin: 0 auto;
    }
  }
}
</style>