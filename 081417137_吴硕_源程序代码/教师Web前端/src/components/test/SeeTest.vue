<template>
  <div class="container">


    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >

      <div class="nav">

        <div style="margin-top: 20px;margin-left: 15px;">

          <el-page-header @back="goBack" content="查看随堂测试">
          </el-page-header>

          <div style="margin-top: 10px;color: #333333;font-size: 24px;
">
            <span>
              5-1
            </span>


            <el-tag
              v-if="isRunning"
              style="margin-left: 20px;"
              size="mini"
            >
              进行中
            </el-tag>

            <el-tag
              v-if="!isRunning"
              style="margin-left: 20px;"
              size="mini"
              type="danger"
            >
              已结束
            </el-tag>





          </div>


          <div style="position: relative">
            <div style="
          margin-top: 20px;
          width: 450px">

              <el-radio-group v-model="test"
                              style="display: flex;flex-direction:row;
          flex-wrap: wrap;align-items: flex-start;"
                size="mini"
                              @change="changeToIndex($event)"
              >
                <el-radio-button  v-for="(p,index) in subList" :label="index+1"></el-radio-button>


              </el-radio-group>

<!--                <el-button-->
<!--                  @click="changeToIndex(index)"-->
<!--                  v-for="(p,index) in list"-->
<!--                  :key="p"-->
<!--                  type=""-->
<!--                  size="mini"-->
<!--                  style="width: 40px">-->
<!--                  {{p}}-->
<!--                </el-button>-->


            </div>
            <div style="position: absolute;top: -60px;right: 200px;line-height: 38px">


              <span style="color:#999999;font-size: 20px;">已提交 {{commit_num}}/{{main_num}}</span>

              <div
                v-if="isRunning"
                style="color: #b63b4d;font-size: 38px;
                  margin-top: 10px;
                  font-weight: bold;

              "

              >
                05:00
              </div>


              <div
                v-if="isRunning"
                style="margin-top: 30px;">
                <el-button @click="nowOver" type="danger" round>立即结束</el-button>
              </div>




            </div>

          </div>

          <div style="float:right;margin-right: 250px;">
<!--            <span style="font-size: 35px;">05:00</span>-->

          </div>


          <div>


            <div class="block">
<!--              height="150px"-->
              <el-carousel
                ref="changeIndex"
                arrow="never"
                indicator-position="none"  :autoplay=false >
                <el-carousel-item v-for="(item,index) in subList" :key="item">
                  <div v-if="item.type==='选择'">
                    <p style="font-size: 20px;margin-bottom: 15px;">{{index+1}}. {{item.title}}</p>

                    <div v-for="(p,index) of item.option" style="margin-bottom: 5px;position: relative">

                      <span>{{returnABCD(index)}}: </span>
                      <span>{{p.option}}</span>
                      <div style="width: 500px;margin-top: 10px;">
                        <el-progress :status="returnABCD(index)===item.radio?'success':'exception'"  :text-inside="true" :stroke-width="18" :percentage="getPercentage(p.num,item.max_num)"></el-progress>
                        <span style="position: absolute;left: 510px;top: 30px;color: #999999">{{p.num}}人</span>
                      </div>

                    </div>


                    <div style="margin-top: 15px;">
                      <span>正确答案:</span>
                      <span style="margin-left: 10px;">{{item.radio}}</span>
                    </div>
                  </div>

                  <div v-if="item.type==='判断'">
                    <p style="font-size: 20px;margin-bottom: 15px;">{{index+1}}. {{item.title}}</p>

                    <div v-for="(p,index1) of item.option" style="margin-bottom: 5px;position: relative">

                      <span>{{returnTrueOrFalse(index1)}}</span>
                      <div style="width: 500px;margin-top: 10px;">
                        <el-progress :status="returnTrueOrFalse(index1)===item.radio?'success':'exception'"  :text-inside="true" :stroke-width="18" :percentage="getPercentage(p.num,item.max_num)"></el-progress>
                        <span style="position: absolute;left: 510px;top: 30px;color: #999999">{{p.num}}人</span>
                      </div>

                    </div>


                    <div style="margin-top: 15px;">
                      <span>正确答案:</span>
                      <span style="margin-left: 10px;">{{item.radio}}</span>
                    </div>
                  </div>


                  <div v-if="item.type==='填空'">
                    <p style="font-size: 20px;margin-bottom: 15px;">{{index+1}}. {{item.title}}</p>

                    <div v-for="(p,index1) of item.res" style="margin-bottom: 5px;position: relative">

                      <span>第{{index1+1}}空</span>
                      <div style="width: 500px;margin-top: 10px;">
                        <el-progress status="success"  :text-inside="true" :stroke-width="18" :percentage="getPercentage(p.num,item.max_num)"></el-progress>
                        <span style="position: absolute;left: 510px;top: 30px;color: #999999">{{p.num}}人</span>
                      </div>

                    </div>


                    <div style="margin-top: 15px;">
                      <span>正确答案:</span>
                      <div v-for="(y,index2) of item.res"
                          style="margin-top: 10px;"
                      >
                        <span>答案{{index2+1}}: </span>
                        <span style="margin-left: 10px;">{{y.p}}</span>
                      </div>

                    </div>
                  </div>

                </el-carousel-item>
              </el-carousel>
            </div>

          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SeeTest",
    data(){
      return{
        list:[1,2,3,4,5,6],
        main_num:60,
        isRunning:true,
        commit_num:2,
        subList:[
          {
            title: '这是文章的标题',
            max_num:10,
            type: '选择',
            option: [
              {
                option:"这是选项1",
                num:1
              },
              {
                option:"这是选项2",
                num:6
              },
              {
                option:"这是选项3",
                num:1
              },
              {
                option:"这是选项4",
                num:2
              },
            ],
            res: [
              ''
            ],
            radio: 'B'

          },
          {
            title: '这是文章的标题',
            max_num:2,
            type: '选择',
            option: [
              {
                option:"这是选项1",
                num:1
              },
              {
                option:"这是选项2",
                num:1
              },
              {
                option:"这是选项3",
                num:0
              },
              {
                option:"这是选项4",
                num:0
              },
            ],
            res: [
              ''
            ],
            radio: 'A'

          },
          {
            title: '这是文章的标题',
            max_num:2,
            type: '判断',
            option: [
              {
                num:1
              },
              {
                num:1
              }
            ],
            res: [

            ],
            radio: '对'

          },
          {
            title: '这是文章的标题',
            max_num:2,
            type: '填空',
            option: [
            ],
            res: [
              {
                p:'0.1',
                num:1
              },
              {
                p:'300',
                num:1
              }
            ],
            radio: '对'

          }
        ],
        test:'1'
      }
    },
    methods:{
      goBack() {
        this.$router.go(-1);//返回上一层
        console.log('go back');
      },
      changeToIndex(index){
        console.log(index)
        this.$refs.changeIndex.setActiveItem(index-1)
      },
      getPercentage(t1,t2){
        // parseFloat((e.fullMarksCount / e.totalCount*100).toFixed(2))
        return (parseFloat(t1/t2)*100).toFixed(2);

      },
      returnABCD(index) {
        // `this` 指向 vm 实例
        if (index === 0) {
          return 'A'
        } else if (index === 1) {
          return 'B'
        } else if (index === 2) {
          return 'C'
        } else if (index === 3) {
          return 'D'
        }
      },
      returnTrueOrFalse(index){
        if (index === 0) {
          return '对'
        } else if (index === 1) {
          return '错'
        }
      },
      nowOver(){
        this.isRunning=false
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    background: #f2f4f7;
    display: flex;
    justify-content: center;
    align-items: center;

    .round-div {
      width: 100%;
      min-width: 1000px;
      height: calc(100% - 30px);
      margin-left: 20px;
      margin-right: 20px;
      /*margin-top: 20px;*/
      border-radius: 16px;
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      overflow: auto;
    }

    .nav {
      margin: 20px 30px;
      height: 45px;
      /*background-color: red;*/
      /*display: flex;*/
    }
  }

  .el-button.el-button {
    margin-right: 10px;
    margin-left: 0;
    margin-bottom: 10px;
  }
  /*.el-carousel__item:nth-child(2n) {*/
  /*  background-color: #99a9bf;*/
  /*}*/

  /*.el-carousel__item:nth-child(2n+1) {*/
  /*  background-color: #d3dce6;*/
  /*}*/

  .el-carousel__indicator--horizontal {
    display: none;
  }

  .block{
    margin-top: 10px;
    width: 650px;
  }

  .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    margin-right: 10px;
  }

  .radio-m {
    margin-right: 10px;

  }




</style>