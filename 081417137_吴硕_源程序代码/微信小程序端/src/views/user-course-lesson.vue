<template>
  <div class="user-course-lesson">
    <div
      class="lesson-item"
      v-for="(lesson, index) in lessons"
      :key="index"
      @click="toLessonDetail(lesson.lesson_id)"
    >
      <span class="name">{{ lesson.lesson_name }}</span>

      <van-rate
        class="rate"
        :value="lesson.quality"
        :size="16"
        color="#ffd21e"
        void-color="#eee"
        void-icon="star"
        allow-half
        readonly
      />
    </div>

    <van-empty
      v-if="lessons == null || lessons.length == 0"
      description="暂无内容"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      lessons: [
        {
          lesson_id: 0,
          lesson_name: '课时01',
          quality: "3.6",
          lesson_status: 1
        }
      ],
    }
  },

  props: ['course_id', 'teacher'],


  computed: {
    clesson() {
      let l = [];
      this.lessons.forEach((lesson => {
        l.push(lesson);
      }));
      return l;
    }
  },

  methods: {
    // 刷新讨论
    async refresh() {
      console.log('refersh lesson ' + this.course_id);
      let [data, err] = await this.$awaitWrap(this.$get('lesson/selectbycourseid', {
        id: this.course_id
      }));
      if (err) {
        this.$toast(err);
        return;
      }
      this.lessons = data.data;
      console.log('lesson');
      console.log(data);
    },


    toLessonDetail(id) {
      console.log('to ' + id);
      wx.navigateTo({
        url: `/pages/user-lesson-detail/main?lesson_id=${id}&teacher=${this.teacher}`
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.user-course-lesson {
  width: 100%;

  .lesson-item {
    position: relative;
    width: 100%;
    height: 80rpx;

    background: #fff;
    border-bottom: solid 1px #f8f9fa;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &:active {
      background: #f2f3f5;
    }

    .name {
      margin-left: 25rpx;
    }

    .rate {
      margin-right: 25rpx;
    }
  }
}
</style>