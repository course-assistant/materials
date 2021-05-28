<template>
  <div class="help">
    <MyCell text="如何加入课程" @click="f1" />
    <MyCell text="如何进行评论" />
    <MyCell text="平时分计算" />
    <div class="margin"></div>

    <MyCell text="注册登录相关" />
    <MyCell text="忘记密码怎么重置" />
    <div class="margin"></div>

    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import MyCell from '@/components/MyCell.vue';
import Dialog from '@/../static/vant/dialog/dialog';

export default {
  data() {
    return {

    }
  },

  components: { MyCell },

  methods: {
    f1() {
      Dialog.alert({
        message: '教师给学生批量添加课程。\n如果添加失败，可以在学生端里通过扫描班级二维码或者输入邀请码手动添加。',
        theme: 'round-button',
      }).then(() => {
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.help {
  height: 100%;
  background: #f4f5f7;

  .margin {
    width: 100%;
    height: 16rpx;
    background: #f4f5f7;
  }
}
</style>