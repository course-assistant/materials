<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px #aaaaaa;
  -webkit-box-shadow: inset 0 0 6px #aaaaaa;
  border-radius: 12px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 12px;
  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px #aaaaaa;
  -webkit-box-shadow: inset 0 0 6px #aaaaaa;
  background-color: #aaaaaa;
}
</style>
