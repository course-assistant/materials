<template>
  <div class="container">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >
      <!-- 讨论 -->
      <!-- 左 -- 周 -->
      <div class="discusstion-week">
        <el-menu
          :default-active="weekPeriods[0].periods[0].period_id.toString()"
          class="el-menu-vertical-demo"
          @select="selectPeriod"
          unique-opened
        >
          <el-submenu
            v-for="(week, i) in weekPeriods"
            :key="i"
            :index="week.week_id.toString()"
          >
            <template slot="title">
              <i class="el-icon-s-order"></i>
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

      <!-- 右 -- 讨论 -->
      <div class="discusstion-list">
        <el-button
          type="primary"
          round
          @click="addDiscussionDialogVisible = true"
          >添加讨论</el-button
        >
        <p style="margin: 20px 8px">全部话题</p>
        <el-divider />

        <div class="discussions">
          <DiscussionItem
            v-for="(discussion, index) in discussions"
            :key="index"
            :discussion="discussion"
            @delete="deleteDiscussion"
          />
        </div>

        <!-- 为空时显示 -->
        <Empty
          v-if="discussions == null || discussions.length == 0"
          text="暂无课堂讨论"
        />
      </div>
    </div>

    <!-- 对话框 -->
    <el-dialog
      title="添加讨论"
      :visible.sync="addDiscussionDialogVisible"
      width="50%"
    >
      <el-form :model="addDiscussionForm" label-position="left">
        <el-form-item>
          <el-input
            v-model="addDiscussionForm.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            type="textarea"
            :rows="7"
            placeholder="请输入内容"
            v-model="addDiscussionForm.content"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-form>

      <p style="color: #a8a8b3; font-size: 14px">
        发表该话题即表示您已阅读并接受<a href="" target="_blank">《用户协议》</a
        >, 请勿发布色情，反动等违法内容
      </p>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addDiscussionDialogVisible = false" clearable>
          取 消
        </el-button>
        <el-button type="primary" @click="onAddDiscussion"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DiscussionItem from '@/components/DiscussionItem.vue';

export default {

  data() {
    return {
      loading: true,

      currPeriodId: 0,

      courseId: 0,

      weekPeriods: [
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

      discussions: [
        {
          discussion_id: 1,
          discussion_title: '',
          discussion_content: '',
          discussion_date: ''
        }
      ],

      addDiscussionDialogVisible: false,
      addDiscussionForm: {
        title: '',
        content: ''
      }
    }
  },

  components: { DiscussionItem },

  methods: {
    // 点击某一学时
    async selectPeriod(id) {
      this.currPeriodId = id;
      // 根据index刷新右边的讨论
      console.log(id);
      this.loading = true;
      let [data, err] = await this.$awaitWrap(this.$get('discussioncomment/selectdissbyperiodid', {
        id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.discussions = data.data;
      console.log(this.discussions);
      this.loading = false;
    },


    // 点击确定添加讨论
    async onAddDiscussion() {
      this.loading = true;
      let [data, err] = await this.$awaitWrap(this.$post('discussioncomment/issuediscussion', {
        id: this.currPeriodId,
        title: this.addDiscussionForm.title,
        content: this.addDiscussionForm.content
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.selectPeriod(this.currPeriodId);
      this.addDiscussionDialogVisible = false;
      this.loading = false;
      this.$message.success(data.msg);
    },


    // 点击删除讨论
    deleteDiscussion(id) {
      this.$cfm('确定删除？', async () => {
        await this.$post('discussioncomment/deletediscussion', { id });
        await this.selectPeriod(this.currPeriodId);
      });
    },
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

    // 加载周和学时
    this.loading = true;

    let [data, err] = await this.$awaitWrap(this.$get('weekperiod/select', {
      id: this.courseId
    }));
    if (err) {
      this.$message.warning(err);
      return;
    }
    console.log(data);
    this.weekPeriods = data.data;

    // 加载第一个学时的讨论
    this.selectPeriod(this.weekPeriods[0].periods[0].period_id);

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

    .discusstion-week {
      flex: 1;
      margin: 16px 0;
      overflow: auto;
    }

    .discusstion-list {
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