<template>
  <div class="period-test-item">
    <div class="desc">
      <p class="test-name">{{ test.period_test_name }}</p>

      <p
        class="test-status unissue"
        v-show="test.period_test_status === 2"
        @click="showTip"
      >
        未发布
      </p>
      <p class="test-status issued" v-show="test.period_test_status === 1">
        已发布
      </p>
    </div>

    <div class="opts">
      <!-- 已发布的测试不显示编辑按钮 -->
      <el-button
        v-if="test.period_test_status === 2"
        class="btn-edit"
        type="text"
        @click.stop="toTestDetail"
      >
        编辑
      </el-button>

      <el-button class="btn-delete" type="text" @click.stop="deleteTest">
        删除
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['test'],

  methods: {
    // 跳转至随堂测试的详情
    toTestDetail() {
      let routeUrl = this.$router.resolve({
        path: '/test-detail',
        query: { test_id: this.test.period_test_id }
      });
      window.open(routeUrl.href, '_blank');
    },

    //删除测试
    deleteTest() {
      this.$emit('deleteTest', this.test.period_test_id);
    },

    // 显示提示
    showTip() {
      this.$message.info('请在移动端发布测试');
    }
  },
}
</script>

<style lang="less" scoped>
.period-test-item {
  width: 100%;
  height: 90px;
  background: #fff;
  border-bottom: solid 1px #f2f2f2;
  cursor: pointer;

  display: flex;
  justify-content: space-between;

  &:hover {
    background: #f7fafc;
  }

  .desc {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .test-name {
      font-size: 16px;
      margin: 10px 0 10px 8px;
    }

    .test-status {
      width: fit-content;
      font-size: 15px;
      margin: 5px 0 5px 8px;
      padding: 2px 4px;
      border-radius: 4px;
    }
    .unissue {
      color: #000;
      background: #ecf5ff;
    }
    .issued {
      color: #fff;
      background: #409eff;
    }
  }

  .opts {
    .btn-edit {
      font-size: 16px;
      margin-right: 10px;
    }

    .btn-delete {
      color: #f00;
      font-size: 16px;
      margin-right: 15px;
    }
  }
}
</style>