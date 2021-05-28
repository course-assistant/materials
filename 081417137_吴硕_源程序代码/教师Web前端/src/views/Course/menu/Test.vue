<template>
  <div class="container">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >
      <div class="nav">
        <div style="font-size: 20px; line-height: 30px">随堂检测</div>

        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="随堂测试" name="first">
              <div style="margin-top: 5px">
                <span
                  style="font-size: 14px; margin-right: 20px; color: #999999"
                >
                  筛选
                </span>
                <el-date-picker
                  size="mini"
                  style="width: 200px"
                  v-model="value1"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :shortcuts="shortcuts"
                >
                </el-date-picker>

                <el-dropdown style="margin-left: 40px">
                  <span class="el-dropdown-link">
                    排序
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>时间升序</el-dropdown-item>
                      <el-dropdown-item>时间倒序</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>

                <el-input
                  v-model="input"
                  size="mini"
                  placeholder="搜索题目 名称、内容 或 编号"
                  style="width: 300px; border-radius: 50%; float: right"
                ></el-input>
              </div>

              <div style="margin-top: 15px">
                <span style="color: #444444"
                  >共 0 个随堂检测 已发布：0个未发布： 0个</span
                >

                <span style="float: right; color: #409eff" @click="clickTest"
                  >添加随堂测试</span
                >

                <el-dialog
                  title="提示"
                  :visible.sync="dialogVisible"
                  width="30%"
                >
                  <div>
                    <div>
                      测试标题:
                      <el-input
                        v-model="input"
                        size="mini"
                        style="width: 200px"
                        placeholder="请输入标题"
                      ></el-input>
                    </div>
                    <div style="margin-top: 15px">
                      测试时间:
                      <el-time-picker
                        size="mini"
                        style="width: 200px"
                        arrow-control
                        v-model="value2"
                        :disabled-hours="disabledHours"
                        :disabled-minutes="disabledMinutes"
                        :disabled-seconds="disabledSeconds"
                        placeholder="任意时间点"
                      >
                      </el-time-picker>
                    </div>
                  </div>

                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="dialogVisible = false"
                        >取 消</el-button
                      >
                      <el-button type="primary" @click="toAddTest"
                        >确 定</el-button
                      >
                    </span>
                  </template>
                </el-dialog>
              </div>

              <el-card
                class="box-card"
                shadow="hover"
                style="margin-top: 20px; width: 100%"
              >
                <div style="position: relative; height: 80px">
                  <div style="width: 100%">
                    <el-checkbox
                      v-model="checked"
                      style="position: absolute; top: 0px; left: 20px"
                    />

                    <div
                      style="
                        position: absolute;
                        top: 0px;
                        left: 60px;
                        width: 100%;
                      "
                    >
                      <strong>测验01</strong>

                      <el-tag
                        style="margin-left: 20px"
                        type="success"
                        effect="plain"
                        size="mini"
                        >未发布</el-tag
                      >

                      <el-tag
                        style="margin-left: 20px"
                        type="success"
                        effect="plain"
                        size="mini"
                        >第1周</el-tag
                      >

                      <div
                        style="
                          position: absolute;
                          top: 0px;
                          right: 150px;
                          color: #409eff;
                        "
                      >
                        <span> 发布 </span>
                      </div>

                      <div
                        style="
                          position: absolute;
                          top: 0px;
                          right: 80px;
                          color: #409eff;
                        "
                      >
                        <span> 查看 </span>
                      </div>

                      <div
                        style="
                          position: absolute;
                          bottom: 0px;
                          right: 80px;
                          color: #999999;
                          font-size: 14px;
                        "
                      >
                        <span> 测试时间:5分钟 </span>
                      </div>

                      <div style="padding-top: 40px">
                        <strong style="color: #999999">张妍妍</strong>
                        <span style="padding-left: 20px; color: #999999"
                          >创建于1分钟前</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-tab-pane>

            <el-tab-pane label="测试题库" name="second">
              <div style="margin-top: 20px">
                <div style="margin-top: 20px">
                  <el-table
                    :expand-row-keys="expends"
                    :data="tableData"
                    :row-key="getRowKeys"
                    :header-cell-style="{
                      background: '#F4F5F6',
                      color: '#131D34',
                      padding: '8px 0',
                    }"
                    style="width: 100%"
                  >
                    <el-table-column type="expand">
                      <template #default="props">
                        <!-- 选择题 -->
                        <div
                          v-if="props.row.problem.type === 1"
                          style="position: relative"
                        >
                          <span
                            style="position: absolute; right: 250px; top: 0"
                          >
                            正确答案: {{ props.row.problem.res }}
                          </span>
                          <p style="font-size: 16px; margin-bottom: 10px">
                            {{ props.row.problem.title }}
                          </p>

                          <p class="optionStyle">{{ props.row.problem.a }}</p>
                          <p class="optionStyle">{{ props.row.problem.b }}</p>
                          <p class="optionStyle">{{ props.row.problem.c }}</p>
                          <p class="optionStyle">{{ props.row.problem.d }}</p>
                        </div>

                        <!-- 判断题 -->
                        <div
                          v-if="props.row.problem.type === 3"
                          style="position: relative"
                        >
                          <span
                            style="position: absolute; right: 250px; top: 0"
                          >
                            正确答案: {{ props.row.problem.res }}
                          </span>
                          <p style="font-size: 16px; margin-bottom: 10px">
                            {{ props.row.problem.title }}
                          </p>
                          <p class="optionStyle">A. 对</p>
                          <p class="optionStyle">B. 错</p>
                        </div>

                        <!-- 填空题 -->
                        <div
                          v-if="props.row.problem.type === 2"
                          style="position: relative"
                        >
                          <span
                            style="position: absolute; right: 250px; top: 0"
                          >
                            正确答案:
                            <span
                              v-for="(r, index) in props.row.problem.res"
                              style="color: red; margin-left: 10px"
                            >
                              {{ r }}
                            </span>
                          </span>
                          <p style="font-size: 16px; margin-bottom: 10px">
                            {{ props.row.problem.title }}
                          </p>
                        </div>

                        <div></div>
                      </template>
                    </el-table-column>

                    <el-table-column prop="name" label="编号" width="300">
                    </el-table-column>

                    <el-table-column prop="type" label="类别" width="300">
                    </el-table-column>

                    <el-table-column prop="edit" label="知识点">
                      JavaWeb
                    </el-table-column>
                  </el-table>
                </div>
              </div>

              <div
                style="
                  margin-top: 20px;
                  padding-bottom: 20px;
                  margin-left: 30px;
                "
              ></div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MissionItem from "../../../components/MissionItem";

const makeRange = (start, end) => {
  const result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}
export default {

  data() {
    return {
      dialogVisible: false,
      checked: false,
      course_id: 0,
      loading: false,
      value2: new Date(2016, 9, 10, 0, 0, 5),
      activeName: 'second',
      shortcuts: [{
        text: '最近一周',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        })(),
      }, {
        text: '最近一个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        })(),
      }, {
        text: '最近三个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        })(),
      }],
      value1: '',

      input: '',
      expends: [],
      tableData: [{
        name: '1',
        type: '选择',
        problem: {
          type: 1,
          title: '人声的主要作用有(  )',
          a: 'A. 这是A的选项',
          b: 'B. 这是B的选项asdad',
          c: 'C. 这是C的选项asdddd',
          d: 'D. 这是D的选项da',
          res: 'B'
        }
      },
      {
        name: '2',
        address: '人声',
        type: '判断',
        problem: {
          type: 3,
          title: '人声的主要作用有(  )',
          a: 'A',
          b: 'B',
          res: 'A'
        }
      },
      {
        name: '3',
        type: '填空',
        problem: {
          type: 2,
          title: '人声的有___的作用',
          res: ['刻画人物形象', '222']
        }
      },]
    }
  },
  components: {
    MissionItem: MissionItem
  },


  // 加载数据
  async beforeMount() {
    this.course_id = this.$route.params.course_id;
    await this.refreshProblems();
  },

  created() {
    this.getExpends();
  },

  methods: {

    async refreshProblems() {
      let [data, err] = await this.$awaitWrap(this.$get('question/all', {
        course_id: this.course_id
      }));

      this.tableData = this.beauty(data.data);
      console.log(data);
    },


    beauty(data) {
      let questions = [];
      data.forEach((question, index) => {

        // 选择
        if (question.question_type === 1) {
          let q = {};
          q.name = index - 0 + 1;
          q.type = '选择';

          // 分离
          let s = question.question_desc.split('$');
          q.problem = {
            type: 1,
            title: s[0],
            a: s[1],
            b: s[2],
            c: s[3],
            d: s[4],
            res: question.question_answer,
          }
          questions.push(q);
        }

        // 判断
        if (question.question_type === 3) {
          let q = {};
          q.name = index - 0 + 1;
          q.type = '判断';

          q.problem = {
            type: 3,
            title: question.question_desc,
            res: question.question_answer,
          }
          questions.push(q);
        }

        // 填空
        if (question.question_type === 2) {
          let q = {};
          q.name = index - 0 + 1;
          q.type = '填空';

          q.problem = {
            type: 2,
            title: question.question_desc,
            res: [question.question_answer],
          }
          questions.push(q);
        }
      });

      console.log('questions');
      console.log(questions);
      return questions;
    },

    //时间选择器
    disabledHours() {
      return makeRange(0, 23)
    },


    disabledMinutes(hour) {
      return makeRange(0, 59)
    },


    disabledSeconds(hour, minute) {
      return makeRange(0, 59)
    },


    //table
    getExpends() {
      var Id = this.tableData.map(item => item.name)
      this.expends = Id
    },


    getRowKeys(row) {
      return row.name
    },


    handleClick(tab, event) {
      console.log(tab, event);
    },


    //点击弹窗
    clickTest() {
      console.log('点击了');
      this.dialogVisible = true
    },


    //跳转到添加测试页面
    toAddTest() {
      this.$router.push(this.$route.path + "/addTest")
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
    height: calc(100% - 30px);
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: auto;
  }
  .nav {
    margin: 20px 30px;
    height: 45px;
  }

  .optionStyle {
    margin-bottom: 5px;
  }
}
</style>