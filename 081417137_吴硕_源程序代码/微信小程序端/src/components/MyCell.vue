<template>
  <div class="my-cell" @click="onClick">
    <i class="iconfont" :class="icon" :style="{ color }"></i>
    <span>{{ text }}</span>
    <i class="iconfont icon-right arrow" style="color: #737373"></i>
  </div>
</template>

<script>
export default {

  props: ['text', 'icon', 'color'],

  methods: {
    onClick() {
      this.$emit('click');
    }
  },

  beforeMount() {

  },

}
</script>

<style lang="scss" scoped>
.my-cell {
  position: relative;
  width: 100%;
  height: 100rpx;
  background: #fff;
  display: flex;
  align-items: center;

  &:active {
    background: #f2f3f5;
  }

  i {
    margin: 0 22rpx 0 25rpx;
    font-size: 36rpx;
  }

  span {
    font-size: 32rpx;
  }

  .arrow {
    position: absolute;
    right: 10rpx;
    font-size: 32rpx;
  }
}
</style>
