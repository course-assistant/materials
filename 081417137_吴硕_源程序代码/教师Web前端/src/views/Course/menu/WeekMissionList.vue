<template>
  <div class="container">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <!-- 导航 -->
      <div class="nav">
        <el-breadcrumb class="f-size" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            :to="'/course/' + $route.params.course_id + '/week-mission/'"
          >
            周任务
          </el-breadcrumb-item>
          <el-breadcrumb-item> {{ week.week_name }} </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="week-mission-list">
        <!-- 操作框 -->
        <div class="tools">
          <el-checkbox
            @change="changeAll"
            v-model="selectedAll"
            style="margin-left: 30px"
          >
            全选
          </el-checkbox>
          <div style="margin-right: 30px">
            <el-button type="text" @click="issueAll">发布选中任务</el-button>
            <el-button type="text" @click="deleteAll">删除选中任务</el-button>
          </div>
        </div>

        <!-- 列表 -->
        <div class="mission-list">
          <MissionItem
            class="mission-item"
            v-for="(mission, index) in missions"
            :key="index"
            :mission="mission"
            @edit="editMission"
            @delete="deleteMission"
          />
        </div>

        <!-- 操作框 -->
        <div class="add" @click="addMission">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>

    <!-- 对话框 -->
    <!-- 添加 -->
    <el-dialog
      title="添加任务"
      :visible.sync="addMissionDialogVisible"
      width="40%"
      center
    >
      <el-form ref="form" :model="addMissionForm" label-width="80px">
        <el-form-item label="任务名称">
          <el-input
            placeholder="请输入任务名称"
            v-model="addMissionForm.name"
          ></el-input>
        </el-form-item>

        <el-form-item label="任务类型">
          <el-select v-model="addMissionForm.type" placeholder="请选择">
            <el-option
              v-for="item in types"
              :key="item.type"
              :label="item.label"
              :value="item.type"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onAddMission">添加</el-button>
          <el-button @click="addMissionDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import MissionItem from '@/components/MissionItem.vue';

export default {

  data() {
    return {

      loading: false,

      selectedAll: false,

      week: {
        week_id: 0,
        week_name: '第xx周'
      },

      types: [{
        label: '理论',
        type: 1
      }, {
        label: '实验',
        type: 2
      }],
      addMissionDialogVisible: false,
      addMissionForm: {
        name: '',
        type: 1
      },

      missions: [
        // {
        //   teacher_name: '教师名',
        //   views: 5,
        //   week_mission_id: 1,
        //   week_mission_name: '任务001',
        //   week_mission_status: 1,
        //   week_mission_type: 1,
        //   checked: true,
        //   week_mission_content: '与现实生活一致：与现实生活的流程、\n逻辑保持一致，遵循用户习惯的语言和概念；',
        //   week_goals: [
        //     {
        //       week_goal_title: '记忆目标',
        //       week_goal_content: 'HTML、CSS、JavaScript\n'
        //     },
        //   ]
        // }
      ],
    }
  },

  components: { MissionItem },

  // 加载
  async beforeMount() {
    this.loading = true;
    console.log('week_id ' + this.$route.params.week_id);
    await this.refreshWeek();
    await this.refreshMissions();
    this.loading = false;
  },


  methods: {
    // 刷新本周的任务
    async refreshMissions() {
      let [data, err] = await this.$awaitWrap(this.$get('weekmission/selectbyweekid', {
        id: this.$route.params.week_id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      // 给missions全部添加checked
      let missions = data.data;
      missions.forEach((mission, index) => {
        mission['checked'] = false;
      });
      this.missions = missions;
    },


    // 刷新周
    async refreshWeek() {
      let [data, err] = await this.$awaitWrap(this.$get('week/selectbyid', {
        id: this.$route.params.week_id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.week = data.data;
    },


    // 点击编辑
    editMission(id) {
      console.log('编辑 ' + id);
    },


    // 点击删除
    deleteMission(id) {
      console.log('删除 ' + id);
      this.$cfm('确定删除', async () => {
        this.loading = true;
        let [data, err] = await this.$awaitWrap(this.$post('weekmission/delete', {
          ids: id
        }));
        if (err) {
          this.$message.warning(err);
          setTimeout(() => {
            this.$router.push({
              path: `/course/${this.$route.params.course_id}/week-mission/week-mission-list/${this.$route.params.week_id}`
            });
            this.loading = false;
          }, 1000);
          return
        }
        await this.refreshMissions();
        this.loading = false;
        this.$message.success(data.msg);
      });
    },


    // 点击全选/取消全选
    changeAll() {
      console.log('all');
      console.log(this.missions);
      if (this.selectedAll) {
        for (let i = 0; i < this.missions.length; i++) {
          this.missions[i].checked = true
        }
      } else {
        for (let i = 0; i < this.missions.length; i++) {
          this.missions[i].checked = false
        }
      }
    },


    // 点击了添加任务按钮
    addMission() {
      this.addMissionDialogVisible = true;
    },


    // 点击确定添加任务
    async onAddMission() {
      console.log(this.$route.params.week_id);
      console.log(this.addMissionForm);
      let [data, err] = await this.$awaitWrap(this.$post('weekmission/insert', {
        week_id: this.$route.params.week_id,
        name: this.addMissionForm.name,
        type: this.addMissionForm.type
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.addMissionDialogVisible = false;
      this.loading = true;
      await this.refreshMissions();
      this.loading = false;
      this.$message.success(data.msg);
    },


    // 点击发布所有任务
    async issueAll() {
      let missions = [];
      this.missions.forEach(mission => {
        if (mission.checked) {
          missions.push(mission.week_mission_id)
        }
      })
      if (missions.length < 1) {
        this.$message.info('请选择');
        return;
      }
      let [data, err] = await this.$awaitWrap(this.$post('weekmission/issue', {
        ids: missions.join(',')
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.loading = true;
      await this.refreshMissions();
      this.loading = false;
      this.$message.success(data.msg);
    },


    // 点击删除所有任务
    async deleteAll() {
      let missions = [];
      this.missions.forEach(mission => {
        if (mission.checked) {
          missions.push(mission.week_mission_id)
        }
      })
      if (missions.length < 1) {
        this.$message.info('请选择');
        return;
      }
      let [data, err] = await this.$awaitWrap(this.$post('weekmission/delete', {
        ids: missions.join(',')
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.loading = true;
      await this.refreshMissions();
      this.loading = false;
      this.$message.success(data.msg);
    },
  },
}
</script>

<style lang="less" scoped>
.f-size {
  font-size: 16px;
  margin-left: 12px;
}

.el-breadcrumb__inner {
  color: red;
}

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
    height: calc(100% - 90px);
    margin: 30px;
    /*margin-top: 30px;*/
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: auto;
    padding-bottom: 30px;
    // padding-right: 10px;

    .nav {
      margin: 20px 30px;
      display: flex;
      font-size: 26px;

      .link {
        text-decoration: none;
        color: #000;
        font-weight: bold;
      }
    }

    .week-mission-list {
      background: #fff;
      width: calc(100% - 80px);
      margin: 0 auto;

      .tools {
        position: relative;
        height: 60px;
        margin: 0 auto;
        margin-top: 10px;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .mission-list {
        width: 100%;
        height: 100%;

        .mission-item {
          margin-top: 20px;
        }
      }

      .add {
        width: 150px;
        height: 100px;
        margin-top: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        cursor: pointer;
        &:hover {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        display: flex;
        justify-content: center;
        align-items: center;

        i {
          color: #999999;
          font-size: 60px;
        }
      }
    }
  }
}
</style>