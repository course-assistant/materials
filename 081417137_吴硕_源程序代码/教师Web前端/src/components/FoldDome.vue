<template>
  <div>
    <ul id="accordion" class="accordion">
      <li v-for="(t1, index) in week">
        <div
          :class="isShow[index] === 1 ? 'link_c' : 'link'"
          @click="liChange(index)"
        >
          {{ t1.week_name }}

          <!-- 状态 -->
          <span
            v-if="t1.week_status == 1"
            style="font-size: 12px; color: #8a8b99; margin-left: 10px"
          >
            已开放
          </span>

          <span
            v-else
            style="font-size: 12px; color: #8a8b99; margin-left: 10px"
          >
            未开放
          </span>

          <i
            class="fr"
            :class="
              isShow[index] === 0
                ? 'el-icon-caret-right'
                : 'el-icon-caret-bottom'
            "
          ></i>
          <el-tag
            class="fr"
            style="margin-right: 10px"
            size="mini"
            key="未开放"
            type=""
            effect="plain"
          >
            已开放 {{ calcIssued(t1) }} / {{ t1.missions.length }}
          </el-tag>
        </div>

        <el-collapse-transition>
          <ul class="submenu" v-if="isShow[index] === 1">
            <li v-for="mission in t1.missions">
              <a
                href="#"
                style="
                  height: 30px;
                  line-height: 30px;
                  border-bottom: 1px dashed #8a8b99;
                "
              >
                {{ mission.week_mission_name }}

                <!-- 任务的状态 -->
                <el-tag
                  v-if="mission.week_mission_status == 1"
                  class=""
                  style="margin-left: 10px"
                  size="small "
                  key="已开放"
                  type=""
                  effect="plain"
                >
                  已开放
                </el-tag>

                <el-tag
                  v-else
                  class=""
                  style="margin-left: 10px"
                  size="small "
                  key="未开放"
                  type=""
                  effect="plain"
                >
                  未开放
                </el-tag>

                <span class="cz1">
                  <el-button
                    type="text"
                    @click="deleteMission(mission.week_mission_id)"
                  >
                    删除
                  </el-button>
                </span>

                <span class="cz2">
                  <el-button type="text" @click="issueMission(mission)">
                    开放
                  </el-button>
                </span>
              </a>
              <week-mission-detail class="wmd" :week_mission="mission" />
            </li>
            <!--            no-mission-->
            <div class="no-mission" v-show="t1.missions.length === 0">
              <span>暂无任务</span>

              <span
                style="
                  font-size: 14px;
                  color: #409eff;
                  cursor: pointer;
                  padding-left: 40px;
                "
                @click="addMission(index)"
              >
                添加
              </span>
            </div>

            <div class="no-mission" v-show="t1.missions.length !== 0">
              <!--              <span>点击添加</span>-->

              <span
                style="font-size: 14px; color: #409eff; cursor: pointer"
                @click="addMission(index)"
                >添加任务</span
              >
            </div>
          </ul>
        </el-collapse-transition>
      </li>
    </ul>

    <el-dialog
      title="编辑内容"
      :visible.sync="addMissionDialogVisible"
      width="50%"
      center
    >
      <el-form ref="form" :model="addMissionDialogForm" label-width="80px">
        <el-form-item label="任务名称">
          <el-input
            placeholder="请输入名称"
            v-model="addMissionDialogForm.name"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item label="主要内容">
          <el-input
            type="textarea"
            :rows="7"
            placeholder="请输入内容"
            v-model="addMissionDialogForm.content"
          >
          </el-input>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="onSubmitAdd">添加</el-button>
          <el-button @click="addMissionDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'

import WeekMissionDetail from "../views/Course/menu/WeekMissionDetail";

export default {
  props: ['week'],
  data() {
    return {
      isShow: [],
      list: [1, 2, 3],
      mission: [],

      addMissionDialogVisible: false,
      addMissionDialogForm: {
        name: '',
        content: ''
      }
    }
  },
  components: {
    WeekMissionDetail

  },
  created() {
    // this.refreshWeeks(i)

    console.log(this.week);

  },
  methods: {

    refreshWeeks(missionid) {
      this.loading = true;
      let [data, err] = this.$awaitWrap(this.$get('weekmission/selectbymissionid', {
        id: missionid
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.mission.add(data.data)

      console.log(this.weeks);
      this.loading = false;
    },


    liChange(index) {
      console.log('点击了' + index);

      if (this.isShow[index] === 1) {
        for (let i = 0; i < this.isShow.length; i++) {
          Vue.set(this.isShow, i, 0)
        }
      } else {
        for (let i = 0; i < this.isShow.length; i++) {
          Vue.set(this.isShow, i, 0)
        }
        Vue.set(this.isShow, index, 1)
      }

    },
    toWeekMissionList(index) {
      this.$router.push({

        path: `/course/${this.$route.params.course_id}/week-mission/week-mission-list/${this.week[index].week_id}/week-mission-detail/1`
      });
    },


    addMission(index) {

      let week_id = this.week[index]['week_id']
      console.log('week: ' + week_id);

      console.log(this.week[index]);

      this.addMissionDialogForm.week_id = week_id;
      this.addMissionDialogVisible = true;
    },

    async onSubmitAdd() {
      console.log(this.addMissionDialogForm);
      let [data, err] = await this.$awaitWrap(this.$post('weekmission/insert', {
        week_id: this.addMissionDialogForm.week_id,
        name: this.addMissionDialogForm.name,
        type: 1
      }));
      this.addMissionDialogVisible = false;

      if (err) {
        this.$message.warning(err);
        return;
      }
      this.$message.success(data.msg);

      // 刷新
      // this.$router.go(0);
      // location.reload()
      setTimeout(() => {
        this.$router.push(`/course/${this.$route.params.course_id}/lesson`);
      }, 500);
    },


    // 计算已发布的任务数
    calcIssued(week) {
      let n = 0;
      week.missions.forEach(m => {
        if (m.week_mission_status === 1) {
          n++;
        }
      });
      return n;
    },

    // 发布任务
    issueMission(mission) {
      if (mission.week_mission_status == 1) {
        this.$message.warning('已经是发布状态');
        return;
      }
      console.log('发布任务 ' + mission.week_mission_id);
      this.$cfm('确定发布？', async () => {
        let [data, err] = await this.$awaitWrap(this.$post('week/issuemission', {
          id: mission.week_mission_id
        }));
        if (err) {
          this.$message.warning(err);
          return;
        }
        this.$message.success(data.msg);
      });
    },

    // 删除任务
    deleteMission(id) {
      this.$cfm('确定删除？', async () => {
        let [data, err] = await this.$awaitWrap(this.$post('week/deletemission', { id }));
        if (err) {
          this.$message.warning(err);
          return;
        }
        this.$message.success(data.msg);
        setTimeout(() => {
          this.$router.push(`/course/${this.$route.params.course_id}/lesson`);
        }, 500);
      });
    },
  }
}
</script>
<style scoped>
.accordion {
  width: 100%;
  /*max-width: 700px;*/
  margin: 30px auto 20px;
  background: #fff;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}

.accordion .link {
  cursor: pointer;
  display: block;
  padding: 15px 15px 15px 42px;
  color: #4d4d4d;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
  position: relative;
}

.link_c {
  cursor: pointer;
  display: block;
  padding: 15px 15px 15px 42px;
  color: #b63b4d;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
  position: relative;
}

.no-mission {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
  /*text-align: center;*/
  position: relative;
  color: #8a8b99;
  font-size: 12px;
  min-width: 1000px;
  background: #fff;
  box-shadow: 1px 7px 5px -5px rgba(0, 0, 0, 0.3);
}

ul {
  list-style-type: none;
}

.submenu {
  display: block;
  background: #ffffff;
  font-size: 14px;
}

/* .submenu li { */
/*border-bottom: 1px dashed #4b4a5e ;*/
/* } */

.submenu a {
  display: block;
  text-decoration: none;
  color: #5557b6;
  padding-top: 12px;
  margin-left: 42px;
  margin-right: 42px;
  font-weight: 700;

  -webkit-transition: all 0.25s ease;
  -o-transition: all 0.25s ease;
  transition: all 0.25s ease;
}

h1 {
  color: #fff;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin-top: 80px;
}

h1 a {
  /*color: #c12c42;*/
  font-size: 16px;
}

/*a:hover {*/
/*  !*background: #b63b4d;*!*/
/*  color: #409eff;*/
/*}*/

.fade-enter-active,
.fade-leave-active {
  transition: height 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  height: 0;
}

/* .wmd { */
/*margin-left: 42px;*/
/* } */

/*  图片*/

.fr {
  float: right;
}

.cz1 {
  /*line-height: 24px;*/

  float: right;

  /*padding-right: 20px;*/
}

.cz2 {
  /*line-height: 24px;*/

  float: right;

  padding-right: 20px;
}
</style>