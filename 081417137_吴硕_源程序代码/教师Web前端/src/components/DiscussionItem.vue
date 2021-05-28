<template>
  <div class="discussion-item">
    <div class="left">
      <el-avatar :size="40" :src="teacherAvatar" />
    </div>
    <div class="right">
      <p class="teacher-name">
        {{ teacherName }}
        <span class="date">{{ discussion.discussion_date }}</span>
      </p>
      <p class="discussion-title">{{ discussion.discussion_title }}</p>
      <p class="discussion-content">{{ discussion.discussion_content }}</p>
    </div>

    <el-button
      class="btn-delete"
      type="primary"
      icon="el-icon-delete"
      @click.stop="deleteDiscussion"
    ></el-button>
  </div>
</template> 

<script>
export default {

  props: ['discussion'],

  data() {
    return {
      // 头像
      teacherAvatar: localStorage.getItem('hncj_assistant_web_teacher_avatar'),
      // 姓名
      teacherName: localStorage.getItem('hncj_assistant_web_teacher_name'),
    }
  },

  methods: {
    sss() {
      localStorage.getItem('hncj_assistant_web_teacher_avatar');
    },


    deleteDiscussion() {
      this.$emit('delete', this.discussion.discussion_id);
    }
  },
}
</script>

<style lang="less" scoped>
.discussion-item {
  position: relative;
  padding-top: 10px;
  width: 100%;
  min-height: 120px;
  max-height: 146px;
  background: #fff;
  border-bottom: solid 1px #f2f2f2;
  cursor: pointer;
  display: flex;

  &:hover {
    background: #f7fafc;
  }

  .left {
    width: 65px;
    height: 100%;
    // background: saddlebrown;
    text-align: center;
  }

  .right {
    flex: 1;
    height: 100%;
    // background: pink;

    .teacher-name {
      margin: 12px 0;
      color: #8a8b99;
      font-size: 16px;
      .date {
        font-size: 14px;
      }
    }

    .discussion-title {
      margin: 4px 0;
      font-size: 18px;
      color: #59657d;
    }

    .discussion-content {
      margin: 3px 0;
      font-size: 16px;
      color: #666666;
    }
  }

  .btn-delete {
    position: absolute;
    right: 5px;
    top: 5px;
  }
}
</style>