<template>
  <div class="student-me">
    <div class="head">
      <img :src="avatar" alt="" />
      <span>{{ name }}</span>
    </div>
    <div class="margin"></div>

    <MyCell text="我的课程" icon="icon-my-course" @click="jump" />
    <MyCell text="加入课程" icon="icon-add" @click="selectCourseShow = true" />
    <MyCell text="账号管理" icon="icon-account-management" @click="jump" />
    <div class="margin"></div>

    <MyCell text="帮助中心" icon="icon-help" @click="toHelp" />
    <MyCell text="关于" icon="icon-info" @click="toAbout" />
    <div class="margin"></div>

    <MyCell text="退出登录" icon="icon-logout" @click="handleLogout" />

    <van-dialog id="van-dialog" />

    <!-- 上拉菜单 -->
    <van-action-sheet
      :show="selectCourseShow"
      :actions="selectCourseActions"
      @close="selectCourseShow = false"
      @select="onSelectCourse"
      @cancel="selectCourseShow = false"
      cancel-text="取消"
    />

    <van-dialog
      use-slot
      title="标题"
      :show="dialogShow"
      show-cancel-button
      @close="dialogShow = false"
      @confirm="selectCourse"
    >
      <van-field
        placeholder="请输入邀请码"
        @change="onChangeInviteCode"
        :value="inviteCode"
      />
    </van-dialog>
  </div>
</template>

<script>
import Dialog from '@/../static/vant/dialog/dialog';
import MyCell from '@/components/MyCell.vue';

export default {

  data() {
    return {
      name: wx.getStorageSync('hncj_assistant_wx_user_name'),
      avatar: wx.getStorageSync('hncj_assistant_wx_user_avatar'),

      selectCourseShow: false,
      selectCourseActions: [
        {
          index: 0,
          name: '扫一扫',
        },
        {
          index: 1,
          name: '输入邀请码',
        }
      ],

      inviteCode: '',

      dialogShow: false,
    }
  },
  components: { MyCell },

  methods: {

    // 选择上拉菜单
    onSelectCourse(event) {
      let detail = event.mp.detail;
      if (detail.index === 0) {
        this.scan();
      } else {
        console.log('输入邀请码');
        this.dialogShow = true;
      }
    },

    // 扫描二维码
    async scan() {
      wx.showLoading({
        title: '扫描中...',
        mask: true,
      });
      let [data, err] = await this.$awaitWrap(this.$scanQR());
      wx.hideLoading();
      if (err) {
        wx.showToast({
          title: err,
          icon: 'none'
        });
        return;
      }
      console.log('扫码');
      console.log(data);
      this.inviteCode = data.result
      this.selectCourse();
    },

    // 邀请码输入框改变
    onChangeInviteCode(event) {
      this.inviteCode = event.mp.detail;
    },

    // 根据邀请码添加课程
    async selectCourse() {
      wx.showLoading({
        title: 'Loading...', //提示的内容,
        mask: true,
      });

      let [data, err] = await this.$awaitWrap(this.$post('class/selection', {
        student_id: wx.getStorageSync('hncj_assistant_wx_user_id'),
        invite_code: this.inviteCode
      }));
      if (err) {
        this.$catch(err);
        return;
      }
      this.inviteCode = '';
      wx.hideLoading();
      this.$toast(data.msg);
    },


    jump() {
      console.log('jump');
    },

    toHelp() {
      wx.navigateTo({ url: '/pages/help/main' });
    },

    toAbout() {
      wx.navigateTo({ url: '/pages/about/main' });
    },

    

    // 点击退出登录
    handleLogout() {
      Dialog.confirm({
        title: '提示',
        message: '确认退出？',
      }).then(async () => {
        this.$logout();
      }).catch(() => {
        // 操作取消
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.student-me {
  width: 100%;
  height: 100%;
  background: #f4f5f7;

  .head {
    width: 100%;
    height: 160rpx;
    background: #fff;
    display: flex;
    align-items: center;

    img {
      width: 120rpx;
      height: 120rpx;
      margin: 0 30rpx;
      border-radius: 50%;
    }
    span {
      font-size: 34rpx;
      // font-weight: bold;
    }
  }

  .margin {
    width: 100%;
    height: 16rpx;
    background: #f4f5f7;
  }
}
</style>