<template>
  <div class="lesson-item">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ lesson.lesson_name }}</span>

          <!-- 评分部分 -->
          <div class="rate">
            <div :title="title">
              <el-rate
                v-model="lesson.quality - 0"
                disabled
                show-score
                text-color="#ff9900"
                :colors="rate_colors"
              />
              <el-rate
                v-model="lesson.degree - 0"
                disabled
                show-score
                text-color="#ff9900"
                :colors="rate_colors"
              />
            </div>
            <el-link
              :underline="false"
              type="primary"
              style="margin-left: 16px"
              @click="showDetail"
            >
              查看详情
            </el-link>
          </div>
        </div>
      </template>

      <h3 style="margin-bottom: 10px">主讲内容</h3>
      <p v-html="convertHtml(lesson.lesson_content)"></p>
      <div class="delete">
        <el-link
          type="primary"
          icon="el-icon-edit"
          :underline="false"
          style="font-size: 18px; margin-right: 20px"
          @click="onEdit"
        ></el-link>

        <el-link
          type="primary"
          icon="el-icon-delete"
          :underline="false"
          style="font-size: 18px"
          @click="onDelete"
        ></el-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '教学质量\n掌握程度',
      rate_colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  props: ['lesson'],

  methods: {
    showDetail() {
      console.log(this.lesson.lesson_id);
    },

    onEdit() {
      this.$emit('edit', this.lesson);
    },

    onDelete() {
      this.$emit('delete', this.lesson.lesson_id);
    },
  },
}
</script>

<style lang="less" scoped>
.lesson-item {
  margin: 20px 10px 0;
  .box-card {
    position: relative;
    .card-header {
      position: relative;
      display: flex;
      align-items: center;

      .rate {
        position: absolute;
        right: 0;
        display: flex;
      }
    }

    .delete {
      display: none;
      position: absolute;
      right: 20px;
      bottom: 10px;
    }

    &:hover {
      .delete {
        display: block;
      }
    }
  }
}
</style>