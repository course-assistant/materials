<template>
  <div class="container">
    <div class="test-detail">
      <!-- 预览列表 -->
      <div class="list">
        <div class="question-item">
          <el-tag type="primary" size="small">选择题</el-tag>
          <span class="name">第01题</span>
        </div>

        <div class="question-item">
          <el-tag type="success" size="small">填空题</el-tag>
        </div>

        <div class="question-item">
          <el-tag type="warning" size="small">判断题</el-tag>
        </div>
      </div>

      <!-- 编辑题目 -->
      <div class="edit-area">
        <div class="opts">
          <el-button type="primary" @click="currentQuestionType = 1">
            选择题
          </el-button>
          <el-button type="success" @click="currentQuestionType = 2">
            填空题
          </el-button>
          <el-button type="warning" @click="currentQuestionType = 3">
            判断题
          </el-button>
        </div>
        <el-divider />

        <!-- 编辑选择题 -->
        <div class="choose" v-if="currentQuestionType === 1">
          <!-- 题干 -->
          <p>题干</p>
          <el-input type="textarea" :rows="4" placeholder="请输入题干">
          </el-input>

          <!-- 选项 -->
          <p>
            选项
            <el-button type="text" style="margin-left: 2px">
              添加选项
            </el-button>
          </p>
          <div class="options">
            <div class="line">
              <span>A</span>
              <el-input v-model="input" placeholder="请输入选项" />
              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                style="margin-left: 8px"
              ></el-button>
            </div>

            <div class="line">
              <span>B</span>
              <el-input v-model="input" placeholder="请输入选项" />
              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                style="margin-left: 8px"
              ></el-button>
            </div>

            <div class="line">
              <span>C</span>
              <el-input v-model="input" placeholder="请输入选项" />
              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                style="margin-left: 8px"
              ></el-button>
            </div>

            <div class="line">
              <span>D</span>
              <el-input v-model="input" placeholder="请输入选项" />
              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                style="margin-left: 8px"
              ></el-button>
            </div>
          </div>

          <!-- 答案 -->
          <p>答案</p>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <!-- 编辑填空题 -->
        <div class="fill" v-if="currentQuestionType === 2">
          <!-- 题干 -->
          <p>题干</p>
          <el-input type="textarea" :rows="4" placeholder="请输入题干">
          </el-input>

          <!-- 答案 -->
          <p>
            答案
            <el-button type="text" style="margin-left: 2px">
              添加答案
            </el-button>
          </p>
          <div class="line">
            <span>第01空答案</span>
            <el-input v-model="input" placeholder="请输入答案" />
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              style="margin-left: 8px"
            ></el-button>
          </div>
          <div class="line">
            <span>第02空答案</span>
            <el-input v-model="input" placeholder="请输入答案" />
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              style="margin-left: 8px"
            ></el-button>
          </div>
        </div>

        <!-- 编辑判断题 -->
        <div class="judge" v-if="currentQuestionType === 3">
          <!-- 题干 -->
          <p>题干</p>
          <el-input type="textarea" :rows="4" placeholder="请输入题干">
          </el-input>

          <!-- 答案 -->
          <p>答案</p>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <el-button type="primary" style="margin: 10px 0">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      period_test: {
        period_test_id: 0
      },


      currentQuestionType: 1,
    }
  },


  // 加载数据
  async beforeMount() {
    // 获取传递的参数
    this.period_test.period_test_id = this.$route.query.test_id;

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

  .test-detail {
    height: calc(100% - 60px);
    width: 100%;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;

    .list {
      flex: 1;
      height: calc(100% - 40px);
      background: #f0f0f0;

      margin: 20px;
      overflow: auto;
      border-right: solid 1px #d9d9d9;

      .question-item {
        width: 100%;
        height: 40px;
        padding: 0 10px;
        border-bottom: 1px solid #d9d9d9;
        cursor: pointer;
        display: flex;
        align-items: center;
        background: #fff;

        &:hover {
          background: #f0f0f0;
        }

        .name {
          margin-left: 9px;
          font-size: 15px;

          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          display: block;
        }
      }
    }

    .edit-area {
      flex: 4;
      height: calc(100% - 40px);
      background: #fff;
      margin: 20px;
      margin-left: 0;
      overflow: auto;

      p {
        margin: 10px 0;
        font-size: 20px;
      }

      .line {
        display: flex;
        align-items: center;
        margin: 10px 0;

        span {
          width: 98px;
          min-width: 98px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>