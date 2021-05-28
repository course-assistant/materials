<template>
  <div class="not-found">
    <div class="container">
      <div class="top">
        <p>
          <span class="code">404</span>
          <span class="text">该内容不存在或已被删除！</span>
        </p>
      </div>

      <div class="bottom">
        <div class="info">
          <p>该内容似乎已经被删除，或者已被遗忘。</p>
          <p>请确认您的来源链接是否正确？ 资源是否存在？</p>
          <p class="to-home" @click="toHome">返回首页 ></p>
        </div>
        <div class="img"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
methods: {
  toHome(){
    this.$router.push('/');
  }
},
}
</script>

<style lang="less" scoped>
.not-found {
  height: 100%;
  background: #f4f5f7;

  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 60%;
    height: 65%;
    background: #ffffff;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .top {
      flex: 4;
      margin-top: 40px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;

      .code {
        font-size: 200px;
        color: #9a9a9a;
      }

      .text {
        margin-left: 20px;
        font-size: 30px;
        color: #616161;
      }
    }

    .bottom {
      width: 100%;
      flex: 5;
      display: flex;
      justify-content: center;
      align-items: center;

      .info {
        width: 70%;
        height: 70%;
        background: #fafafa;
        border: solid 1px #f5f5f5;
        color: #0000008f;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        p {
          margin-left: 40px;
        }

        .to-home {
          color: #909399;
          cursor: pointer;
        }
      }
    }
  }
}
</style>