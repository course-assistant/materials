<template>
  <div class="container">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >
      <!-- 左 -- 周 -->
      <div class="test-week">
        <el-menu
          :default-active="weekTests[0].periods[0].period_id.toString()"
          class="el-menu-vertical-demo"
          @select="refreshPeriodTest"
          unique-opened
        >
          <el-submenu
            v-for="(week, i) in weekTests"
            :key="i"
            :index="week.week_id.toString()"
          >
            <template slot="title">
              <i class="el-icon-s-claim"></i>
              <span>{{ week.week_name }}</span>
            </template>

            <el-menu-item-group>
              <template slot="title">学时</template>
              <el-menu-item
                v-for="(period, ind) in week.periods"
                :key="ind"
                :index="period.period_id.toString()"
              >
                {{ period.period_name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>

      <!-- 右 -- 测试 -->
      <div class="test-list">
        <el-button type="primary" round @click="addTestDialogVisible = true">
          添加测试
        </el-button>
        <p style="margin: 20px 8px">全部随堂测试</p>

        <div class="tests">
          <PeriodTestItem
            v-for="(test, index) in tests"
            :key="index"
            :test="test"
            @deleteTest="deleteTest"
          />
        </div>

        <!-- 为空时显示 -->
        <Empty v-if="tests == null || tests.length == 0" text="暂无随堂测试" />
      </div>
    </div>

    <!-- 对话框 -->
    <el-dialog
      title="添加测试"
      :visible.sync="addTestDialogVisible"
      width="50%"
    >
      <el-form :model="addTestForm" label-position="left">
        <el-form-item>
          <el-input
            v-model="addTestForm.name"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addTestDialogVisible = false" clearable>
          取 消
        </el-button>
        <el-button type="primary" @click="onAddTest"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PeriodTestItem from '@/components/PeriodTestItem.vue';

export default {

  data() {
    return {
      loading: false,

      courseId: 0,

      currentPeriodId: 0,

      weekTests: [
        {
          week_id: 1,
          week_name: '第01周',
          periods: [
            {
              period_id: 1,
              period_name: '第01学时'
            },
            {
              period_id: 2,
              period_name: '第01学时'
            }, {
              period_id: 3,
              period_name: '第03学时'
            }
          ]
        },
        {
          week_id: 2,
          week_name: '第02周',
          periods: [
            {
              period_id: 4,
              period_name: '第04学时'
            },
            {
              period_id: 5,
              period_name: '第05学时'
            }
          ]
        }
      ],

      tests: [],

      addTestDialogVisible: false,
      addTestForm: {
        name: ''
      }
    }
  },

  components: { PeriodTestItem },

  methods: {
    // 加载学时为id的测试
    async refreshPeriodTest(id) {
      this.currentPeriodId = id;
      let [data, err] = await this.$awaitWrap(this.$get('periodtest/selecttestbyperiodid', {
        id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.tests = data.data;
    },


    // 点击确定添加测试
    onAddTest() {
      console.log(this.addTestForm);
      if (this.addTestForm.name.trim() === '') {
        this.$message.warning('请输入');
        return;
      }
      // 添加
      this.$post('periodtest/inserttest', {
        id: this.currentPeriodId,
        name: this.addTestForm.name
      }).then(res => {
        this.$message.success(res.msg);
        this.addTestDialogVisible = false;
        // 刷新
        this.refreshPeriodTest(this.currentPeriodId);
      }).catch(err => {
        this.$message.warning(err);
      });
    },


    // 删除测试
    deleteTest(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.loading = true;
        // 执行删除操作
        let [data, err] = await this.$awaitWrap(this.$post('periodtest/delete', {
          id
        }));
        if (err) {
          this.$message.warning(err);
        }
        await this.refreshPeriodTest(this.currentPeriodId);
        this.loading = false;
        this.$message.success(data.msg);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        });
      });
    }
  },

  beforeCreate() {
    // 检有没有携带参数
    if (this.$route.query.courseid === 0) {
      this.$router.replace('/');
    }
  },

  // 加载数据
  async beforeMount() {
    // this.courseId = this.$route.query.courseid;
    this.courseId = this.$route.params.course_id;

    // 加载左侧周和学时
    this.loading = true;

    let [data, err] = await this.$awaitWrap(this.$get('weekperiod/select', {
      id: this.courseId
    }));
    if (err) {
      this.$message.warning(err);
      return;
    }
    console.log(data);
    this.weekTests = data.data;

    // 加载第一个学时的测试
    this.refreshPeriodTest(this.weekTests[0].periods[0].period_id);

    // 关闭loading
    this.loading = false;
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

    display: flex;

    .test-week {
      flex: 1;
      margin: 16px 0;
      overflow: auto;
    }

    .test-list {
      flex: 5;
      margin: 20px;
      overflow: auto;

      p {
        color: #a8a8b3;
        font-size: 12px;
      }
    }
  }
}
</style>