<template>
  <div class="container">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >
      <div class="main-container">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addDialogVisible = true"
          round
        >
          添加内容
        </el-button>

        <el-row>
          <el-col :span="24" v-for="(lesson, index) in lessons" :key="index">
            <LessonItem
              :lesson="lesson"
              @edit="editLesson"
              @delete="deleteLesson"
            />
          </el-col>
        </el-row>

        <!-- 为空时显示 -->
        <Empty
          v-if="lessons == null || lessons.length == 0"
          style="margin-top: 60px"
          text="暂无课时内容"
        />
      </div>
    </div>

    <!-- 对话框 -->
    <el-dialog title="添加内容" :visible.sync="addDialogVisible" width="50%">
      <el-form :model="addForm" label-position="left">
        <el-form-item>
          <el-input
            v-model="addForm.name"
            placeholder="请输入课时名"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            type="textarea"
            :rows="7"
            placeholder="请输入内容"
            v-model="addForm.content"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false" clearable>
          取 消
        </el-button>
        <el-button type="primary" @click="onAdd"> 确 定 </el-button>
      </div>
    </el-dialog>

    <!-- 编辑内容 -->
    <el-dialog title="编辑内容" :visible.sync="editDialogVisible" width="50%">
      <el-form :model="addForm" label-position="left">
        <el-form-item>
          <el-input
            type="textarea"
            :rows="7"
            placeholder="请输入内容"
            v-model="editForm.content"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false" clearable>
          取 消
        </el-button>
        <el-button type="primary" @click="onEdit"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LessonItem from '@/components/LessonItem.vue';
export default {

  data() {
    return {
      course_id: 0,
      loading: false,

      lessons: [
        // {
        //   lesson_id: 0,
        //   lesson_name: '第01课时',
        //   lesson_content: `（1）Android简介（了解）
        //   （2）Android Studio的安装与调试（掌握）
        //   （3）创建HelloAndroid项目（掌握）
        //   （4）Android Studio中的SDK设置
        //   （4）Android Studio中的SDK设置
        //   （4）Android Studio中的SDK设置
        //   思政部分：安卓技术的发展史，技术的突破对提高项目开发效率的影响。鸿蒙系统的崛起，自有技术的重要性等。`,
        //   degree: 1,
        //   quality: 4.6
        // }
      ],

      addDialogVisible: false,
      addForm: {
        name: '',
        content: ''
      },

      editDialogVisible: false,
      editForm: {
        id: '',
        content: ''
      }
    }
  },

  components: { LessonItem },

  // 加载数据
  async beforeMount() {
    this.course_id = this.$route.params.course_id;
    await this.refresh();
  },

  methods: {

    async refresh() {
      let [data, err] = await this.$awaitWrap(this.$get('lesson/selectbycourseid', {
        id: this.course_id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.lessons = data.data;
      console.log(data);
    },

    // 确定添加
    async onAdd() {
      if ('' === this.addForm.name || '' === this.addForm.content) {
        this.$message.warning('请输入');
        return;
      }
      let [data, err] = await this.$awaitWrap(this.$post('lesson/insert', {
        id: this.course_id,
        name: this.addForm.name,
        content: this.addForm.content
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.addDialogVisible = false;
      await this.refresh();
      this.$message.success(data.msg);
    },

    // 点击编辑
    editLesson(lesson) {
      this.editDialogVisible = true;
      this.editForm.id = lesson.lesson_id;
      this.editForm.content = lesson.lesson_content;
    },

    // 确定编辑
    async onEdit() {
      let [data, err] = await this.$awaitWrap(this.$post('lesson/update', {
        id: this.editForm.id,
        content: this.editForm.content
      }));
      this.editDialogVisible = false;
      if (err) {
        this.$message.warning(err);
        return;
      }
      await this.refresh();
      this.$message.success(data.msg);
    },

    // 确定删除
    async deleteLesson(id) {
      this.$cfm('确定删除？', async () => {
        let [data, err] = await this.$awaitWrap(this.$post('lesson/delete', { id }));
        if (err) {
          this.$message.warning(err);
          return;
        }
        this.refresh();
        this.$message.success(data.msg);
      });
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

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .round-div {
    width: 100%;
    min-width: 1000px;
    height: calc(100% - 60px);
    margin: 30px;
    margin-top: 20px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;

    .main-container {
      width: calc(100% - 60px);
      height: calc(100% - 40px);
      overflow: auto;
    }
  }
}
</style>