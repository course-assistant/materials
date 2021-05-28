<template>
  <div class="class-item" @click="toStudentManage">
    <div style="margin-left: 40px">
      <p class="class-name">{{ classData.className }}</p>
      <p class="class-stu-num">学生人数：{{ classData.classStuNum }}</p>
    </div>

    <div class="invite-code" @click.stop="showQrCode">
      邀请码：{{ inviteCode }}
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      inviteCode: 'abc123456'
    }
  },

  props: ['classData'],

  methods: {
    // 跳转至学生管理
    toStudentManage() {
      let routeUrl = this.$router.resolve({
        path: `/class-student/${this.classData.classId}`
      });
      window.open(routeUrl.href, '_blank');
    },

    // 显示邀请码
    showQrCode() {
      this.$emit('showQrCode', this.inviteCode);
    }
  },

  beforeMount() {
    this.inviteCode = this.classData.classId ^ 0x1111;
  },

}
</script>

<style lang="less" scoped>
.class-item {
  width: 100%;
  height: 94px;
  border-bottom: solid 1px #f2f2f2;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .class-name {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: #181e33;
  }

  .class-stu-num {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #a8a8b3;
  }

  .invite-code {
    margin-right: 40px;
    color: #a8a8b3;

    &:hover {
      color: #679cff;
    }
  }

  &:hover {
    background: #f7fafc;
  }
}
</style>