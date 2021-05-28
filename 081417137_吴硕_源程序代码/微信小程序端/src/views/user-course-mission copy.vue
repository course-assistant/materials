<template>
 <div>
      <div
    v-for="(l, index_m) in 3"
    :key="index_m"
    @click.stop="showRw(index_m)"
    style="background-color: #fff; padding-left: 10rpx"
  >
    <div
      style="height: 70rpx; border-bottom: 1px solid #eeeff3"
      @click="click_m(index_m)"
    >
      <img
        style="width: 32rpx; height: 32rpx; margin-right: 16rpx"
        src="../access/img/任务.png"
        alt=""
      />
      第{{ index_m + 1 }}周
      <van-icon
        style="float: right; margin-right: 20px"
        :name="!isShow ? 'arrow' : 'arrow-down'"
      />
    </div>

    <!--          arrow-up-->

    <ul v-if="isShow[index_m] === 1 ? true : false">
      <li
        class="fold_li"
        v-for="(p, index_li) in 2"
        :key="index_li"
        @click="click_li(index_li)"
      >
        <div class="c_li">
          <img
            style="width: 32rpx; height: 32rpx; margin-right: 16rpx"
            src="../access/img/finish.png"
            alt=""
          />
          任务{{ index_li + 1 }}
        </div>
      </li>
    </ul>
  </div>
 </div>
</template>

<script>
export default {
  methods: {
    onTabChange(event) {
    },
    handleClick() {
      console.log('点击了');
    },
    showRw(index_m) {
      // console.log('点击了' + (index_m+1));

      if (this.isShow[index_m] === 1) {
        for (let i = 0; i < this.isShow.length; i++) {
          Vue.set(this.isShow, i, 0)
        }
      } else {
        for (let i = 0; i < this.isShow.length; i++) {
          Vue.set(this.isShow, i, 0)
        }
        Vue.set(this.isShow, index_m, 1)
      }
    },
    click_li(index_li) {

      wx.navigateTo({
        url: `/pages/user-weekmission-detail/main`
      });
      console.log('点击了' + (index_li + 1));
    },
    click_m(index_m) {
      console.log('点击了周任务' + (index_m + 1));
    }
  },
}
</script>

<style>
.fold_li {
  position: relative;
  /*background-color: ##f2f3f5;*/
  background-color: #fff;
  height: 70rpx;
  color: #444444;
  padding-left: 20rpx;
  line-height: 70rpx;
  border-bottom: 1px solid #eeeff3;
}
</style>