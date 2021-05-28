<template>
  <div class="container">
    <div class="round-div">
      <!-- 操作按钮 -->
      <div class="options">
        <el-button
          type="primary"
          icon="el-icon-plus"
          round
          @click="addClassDialogVisible = true"
          >添加班级
        </el-button>
      </div>

      <!-- 班级列表 -->
      <div class="class-list">
        <ClassItem
          v-for="(cls, index) in classes"
          :key="index"
          :class-data="cls"
          @showQrCode="showQrCode"
        />
      </div>

      <!-- 为空时显示 -->
      <Empty v-if="(classes == null || classes.length == 0)" text="暂无班级" />
    </div>

    <!-- 对话框 -->
    <!-- 添加班级的对话框 -->
    <el-dialog
      title="添加班级"
      :visible.sync="addClassDialogVisible"
      width="45%"
    >
      <el-form :model="addClassForm" label-position="left">
        <el-form-item label="名 称" label-width="50px">
          <el-input v-model="addClassForm.name"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addClassDialogVisible = false"> 取 消 </el-button>
        <el-button type="primary" @click="onAddClassClick"> 确 定 </el-button>
      </div>
    </el-dialog>

    <!-- 显示二维码的对话框 -->
    <el-dialog title="邀请码" :visible.sync="QRCodeDialogVisible" width="230px">
      <vue-qr :text="QRCodeText"></vue-qr>
    </el-dialog>
  </div>
</template>

<script>
import ClassItem from '@/components/ClassItem.vue';
import VueQr from 'vue-qr';

export default {

  data() {
    return {
      courseId: 0,

      classes: [
        // {
        //   classId: -1,
        //   className: '班级1',
        //   classStuNum: 10
        // },
        // {
        //   classId: -2,
        //   className: '班级2',
        //   classStuNum: 12
        // }
      ],

      addClassDialogVisible: false,
      addClassForm: {
        name: ''
      },

      QRCodeText: '',
      QRCodeDialogVisible: false,
    }
  },

  components: { ClassItem, VueQr },

  methods: {
    async refreshClass() {
      // 先加载所有班级
      let [data, err] = await this.$awaitWrap(this.$get('class/findbycourseid', {
        course_id: this.courseId
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }

      console.log(data);

      // 如果没有班级，显示没有
      if (!data.data) {
        this.classes = [];
        return;
      }

      let classes = [];
      // 根据班级查找人数
      let classData = data.data;

      classData.forEach(async (cls, index) => {
        console.log(cls, index);
        let [d, e] = await this.$awaitWrap(this.$get('class/countbycourseid', {
          class_id: cls.class_id
        }));
        if (e) {
          this.$message.warning(e);
          this.$router.push('/');
          return;
        }
        console.log(d);
        classes.push({
          classId: cls.class_id,
          className: cls.class_name,
          classStuNum: d.data.count
        });
      });
      this.classes = classes;
    },

    // 点击添加班级
    async onAddClassClick() {
      if (this.addClassForm.name.trim() === '') {
        this.$message.warning('请输入');
        return;
      }
      let [data, err] = await this.$awaitWrap(this.$post('class/insert', {
        course_id: this.courseId,
        name: this.addClassForm.name
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.addClassDialogVisible = false;
      // 刷新班级列表
      await this.refreshClass();
    },


    // 显示二维码邀请码
    showQrCode(text) {
      this.QRCodeText = text + '';
      this.QRCodeDialogVisible = true;
    },


  },



  beforeCreate() {
    // 检有没有携带参数
    if (this.$route.query.courseid === 0) {
      this.$router.replace('/');
      return;
    }
  },


  // 加载数据
  async beforeMount() {
    // this.courseId = this.$route.query.courseid;
    this.courseId = this.$route.params.course_id;
    await this.refreshClass();
  }
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

    .options {
      padding: 20px 0 0 40px;
    }

    .class-list {
      margin-top: 20px;
    }
  }
}
</style>