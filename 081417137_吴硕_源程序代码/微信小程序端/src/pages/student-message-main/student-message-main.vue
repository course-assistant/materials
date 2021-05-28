<template>
  <div class="student-message-main">
    <div style="margin-bottom: 20rpx;">
      <div>
        <div style="font-size: 24rpx;text-align: center;color: #999999">2021-05-03 07:54</div>
        <div style="margin-left: 10rpx;">

          <!--        <van-icon style="width: 80rpx;height: 80rpx;float:left;" name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />-->
          <div>
            <img src="../../access/img/user1.png" style="width: 80rpx;height: 80rpx;float:left;" alt="">
          </div>


          <div style="margin-left: 80rpx">
            <span style="font-size: 30rpx;color: #999999">王斌斌</span>
            <div class="dialog">
              <!--            margin-left: 30rpx;-->
              <div style="width: 80rpx;height:80rpx;margin-left: 10rpx;border-radius:10rpx;color:#ffffff;margin-top: 15rpx;margin-right: 15rpx;font-size: 35rpx;display: inline-block;background-color:dodgerblue;padding: 20rpx">
                随堂练习
              </div>
              <div style="display: inline-block">
                <p style="margin-bottom: 20rpx;">2.3测验</p>
                <p style="font-size: 24rpx;color: #999999">2021-05-03 07:54</p>
              </div>
            </div>
          </div>


        </div>


      </div>
    </div>

    <div>
      <div>
        <div style="font-size: 24rpx;text-align: center;color: #999999">2021-05-03 07:54</div>
        <div style="margin-left: 10rpx;margin-top: 20rpx;">

          <!--        <van-icon style="width: 80rpx;height: 80rpx;float:left;" name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />-->
          <div>
            <img src="../../access/img/user1.png" style="width: 80rpx;height: 80rpx;float:right;margin-right: 20rpx;" alt="">
          </div>


          <div style="margin-left: 80rpx;float:right;margin-right: 20rpx;">
            <div class="dialog1">
              <!--            margin-left: 30rpx;-->
              <div style="width: 80rpx;height:80rpx;margin-left: 10rpx;border-radius:10rpx;color:#ffffff;margin-top: 15rpx;margin-right: 15rpx;font-size: 35rpx;display: inline-block;background-color:dodgerblue;padding: 20rpx">
                随堂练习
              </div>
              <div style="display: inline-block">
                <p style="margin-bottom: 20rpx;">2.3测验</p>
                <p style="font-size: 24rpx;color: #999999">2021-05-03 07:54</p>
              </div>
            </div>
          </div>


        </div>


      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "student-message-main",
    data() {
      return {
        active: 0
      }
    },
  }
</script>

<style scoped>
  .student-message-main{
    height: 100%;
    background-color: #f2f2f2;
  }

  .dialog{
    width: 500rpx;
    height: 150rpx;
    background-color: #ffffff;
    position: relative;
    margin-left: 10rpx;
    border-radius: 5rpx;
  }

  .dialog1{
    width: 500rpx;
    height: 150rpx;
    background-color: #ffffff;
    position: relative;
    margin-left: 10rpx;
    border-radius: 5rpx;
  }

  .dialog::after{
    content: '';
    width: 0;
    height: 0;
    border: 20rpx solid;
    position: absolute;
    top: 30rpx;
    left: -35rpx;
    border-color:    transparent #fff transparent transparent;
  }


  .dialog1::after{
    content: '';
    width: 0;
    height: 0;
    border: 20rpx solid;
    position: absolute;
    top: 30rpx;
    right: -35rpx;
    border-color: transparent transparent  transparent   #fff  ;
  }
</style>
