<template>
  <div class="test-detail">
    {{ test_id }}
  </div>
</template>

<script>


export default {

  data() {
    return {
      test_id: 0
    }
  },

  onLoad(option) {
    this.test_id = option.test_id;
  }
}
</script>

<style lang="scss" scoped>
.test-detail {
}
</style>