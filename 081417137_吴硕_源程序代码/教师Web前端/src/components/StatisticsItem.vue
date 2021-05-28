<template>
  <!-- 统计页面 彩色方块组件 -->
  <div class="statistics-item" :style="{ background: backcolor }">
    <p class="text">{{ text }}</p>
    <div class="num">
      <span class="num">{{ num }} </span>
      <span class="q">{{ q }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text', 'num', 'q', 'backcolor'],
}

</script>

<style lang="less" scoped>
.statistics-item {
  flex: 1;
  padding: 20px 0;
  padding-left: 20px;
  border-radius: 8px;
  background: olive;
  color: #fff;
  margin-bottom: 10px;

  display: flex;
  flex-direction: column;
  justify-content: start;

  .text {
    font-size: 20px;
  }

  .num {
    width: 100px;
    margin-top: 10px;
    display: flex;
    align-items: flex-end;

    .num {
      font-size: 32px;
      // font-weight: bold;
    }

    .q {
      font-size: 18px;
    }
  }
}
</style>