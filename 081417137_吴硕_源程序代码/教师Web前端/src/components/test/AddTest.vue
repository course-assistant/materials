<template>


  <div class="container">


    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >

      <!--      style="position: relative"-->
      <div class="nav" style="position: relative">


        <div style="margin-top: 20px;margin-left: 15px;">

          <el-page-header @back="goBack" content="添加随堂测试">
          </el-page-header>

          <div style="width: 620px;margin-top: 20px;">
            <span style="color: #999999;font-size: 14px;margin-right: 20px;">
              添加题目
            </span>

            <el-button @click="addChoice" type="primary" plain size="mini" round>选择</el-button>
            <el-button @click="addJudge" type="success" plain size="mini" round>判断</el-button>
            <el-button @click="addFill" type="info" plain size="mini" round>填空</el-button>

            <span @click="drawer = true" style="float:right;margin-right: 50px">从题库中选择</span>


            <el-drawer
              title="题库选题"
              :visible.sync="drawer"
              :direction="direction"
              size="100%"
              :before-close="handClose" destroy-on-close>


              <div style="margin-left: 20px;">
                <div style="margin-bottom: 20px;">

                  <div >
                    <el-tag
                      color="#337ab7"
                      effect="dark"
                      size="mini"
                    >
                        已选取10

                    </el-tag>
                    -
                    <el-tag
                      style="margin-left: 10px"
                      color="#5cb85c"
                      effect="dark"
                      size="mini"
                    >
                        选择6

                    </el-tag>

                    <el-tag
                      style="margin-left: 10px"
                      color="f0ad4e"
                      effect="dark"
                      size="mini"
                    >
                        判断2

                    </el-tag>

                    <el-tag
                      style="margin-left: 10px"
                      color="#d9534f"
                      effect="dark"
                      size="mini"
                    >
                      填空2
                    </el-tag>




                  </div>


                  <div style="margin-top: 25px">
                    <span class="radio-m tagTitle">课程</span>
                    <el-select value="课程1"
                               class="radio-m"
                               size="mini"
                               style="width: 80px"
                               placeholder="请选择">
                      <el-option
                        label="课程1"
                        value="课程1">
                      </el-option>
                    </el-select>
                    <span class="radio-m tagTitle">题型</span>

                    <el-select value="选择"
                               class="radio-m"
                               size="mini"
                               style="width: 80px"
                               placeholder="请选择">
                      <el-option
                        label="选择"
                        value="选择">
                      </el-option>
                      <el-option
                        label="判断"
                        value="判断">
                      </el-option>
                      <el-option
                        label="填空"
                        value="填空">
                      </el-option>

                    </el-select>
                    <span class="radio-m tagTitle">知识点</span>

                    <el-select
                      class="radio-m"
                      value="知识点1"
                      size="mini"
                      style="width: 100px"
                      placeholder="请选择">
                      <el-option
                        label="知识点1"
                        value="知识点1">
                      </el-option>
                      <el-option
                        label="知识点2"
                        value="知识点2">
                      </el-option>

                    </el-select>

                    <el-button
                      type="primary"
                      size="mini"
                      style="margin-left: 30px"
                    >添加选中
                    </el-button>
                  </div>

                  <div style="float:right;font-size: 12px;margin-right: 30px;color: #999999">
                    题目总量:{{tableData.length}}
                  </div>
                  
                </div>


                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    label="题目"
                    prop="title"
                    width="720">
                    <template #default="scope">{{ scope.row.title }}</template>
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="题型"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="creater"
                    label="创建者"
                    width="120"
                  >
                  </el-table-column>


                  <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="120px">
                  </el-table-column>

                  <el-table-column
                    prop="edit"
                    label="操作"
                    show-overflow-tooltip
                  >
                    <template #default="scope">
                      <el-button @click="" type="text" size="small">编辑</el-button>
                      <el-button type="text" size="small">删除</el-button>
                    </template>

                  </el-table-column>

                </el-table>

                <el-pagination
                  style="margin-top: 10px;"
                  background
                  layout="prev, pager, next"
                  page-size="8"
                  :total="tableData.length">
                </el-pagination>

              </div>

            </el-drawer>


            <div>

              <div style="margin-left: 10px;" v-for="(sub,index) in subject">

                <div class="head-op">
                  <span style="margin-right: 20px">{{index+1}}</span>
                  <el-select
                    style="width: 100px;"
                    size="mini"
                    v-model="sub.type" placeholder="请选择"
                    @change="clickChoice($event,index)"
                  >

                    <el-option

                      v-for="item in options"

                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

                  <span
                    style="float: right;margin-right: 50px;"
                    @click="delThisSub(index)"
                  >

                    <img src="../../assets/img/delete.png" style="width: 20px" alt="">
                    <!--                    删除图标-->

                  </span>

                </div>


                <div class="radio-op">
                  <el-input
                    style="width: 560px"
                    size="mini"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="sub.title">
                  </el-input>
                </div>
                <div>
                  <el-radio-group
                    v-if="sub.type==='选择'"
                    v-model="sub.radio" size="small">
                    <div class="radio-op" v-for="(op1,index1) in sub.option">
                      <el-radio-button class="radio-m" :label="returnABCD(index1)"></el-radio-button>
                      <el-input
                        style="width: 500px"
                        size="mini"
                        type="textarea"
                        :autosize="{ minRows: 1, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="sub.option[index1]">
                      </el-input>
                    </div>

                  </el-radio-group>

                  <!--                判断-->
                  <el-radio-group
                    style="margin-bottom: 20px;"
                    v-if="sub.type==='判断'" v-model="sub.radio" size="small">
                  <span class="radio-op" v-for="(op1,index1) in sub.option">
                    <el-radio-button class="radio-m" :label="returnABCD(index1)"></el-radio-button>
                    <!--                    <span>-->
                    <!--                      <el-radio-button class="radio-m" :label="returnABCD(index1)"></el-radio-button>-->
                    <!--                    </span>-->

                  </span>
                  </el-radio-group>


                  <div class="radio-op"

                       v-if="sub.type==='填空'" v-for="(op1,index1) in sub.res">
                    <span style="margin-right: 10px">第{{index1+1}}空</span>
                    <el-input
                      style="width: 500px"
                      size="mini"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="sub.res[index1]">
                    </el-input>
                    <el-link @click="delFillChoice(index,index1)" style="margin-left: 15px;" :underline="false">
                      <i class="el-icon-remove-outline"></i>
                    </el-link>
                  </div>

                  <div v-if="sub.type==='填空'"
                       @click="addFillChoice(index)"
                       style="margin-bottom: 20px;background-color:#fafafa;
                     color: #999999;
                     height: 30px;line-height: 30px;width: 560px;">
                    +添加选项
                  </div>
                </div>


              </div>


            </div>


          </div>

          <div style="height: 100px;width: 370px;float:right;position: absolute;top: 40px;right: 20px;">
            <div>
              设置
            </div>
            <div style="margin-top: 20px;">
              活动时长
            </div>
            <div>
              <el-time-picker
                size="mini"
                arrow-control
                v-model="selectT"
                :disabled-hours="disabledHours"
                :disabled-minutes="disabledMinutes"
                :disabled-seconds="disabledSeconds"
                placeholder="任意时间点">
              </el-time-picker>
            </div>

            <div style="margin-top: 20px;">
              <el-button size="mini">
                保存,但不发布
              </el-button>

              <el-button size="mini">
                立即开始
              </el-button>
            </div>

          </div>


        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {defineComponent, ref} from 'vue'

  const makeRange = (start, end) => {
    const result = []
    for (let i = start; i <= end; i++) {
      result.push(i)
    }
    return result
  }
  export default {
    name: "AddTest",
    data() {
      return {
        loading: false,
        dialogVisible: false,
        dialogVisible1: false,
        input: '',
        textarea: '',
        textarea1: '',
        textarea2: '',
        textarea3: '',
        textarea4: '',
        expends: [],
        options: [{
          value: '选择',
          label: '选择'
        }, {
          value: '判断',
          label: '判断'
        }, {
          value: '填空',
          label: '填空'
        }],
        subject: [
          {
            title: '',
            type: '选择',
            option: [
              "",
              "",
              "",
              ""
            ],
            res: [
              ''
            ],
            radio: 'A'

          }

        ],


        value: '选择',
        radio3: 'A',
        selectT: new Date(2016, 9, 10, 0, 10, 0),

        //从题库中数据
        drawer: false,
        direction: 'ttb',
        tableData: [{
          tid:'',
          cid:'',
          title: '我是题目1啦啦啦啦啦啦啦',
          type: '选择',
          points:'',
          creater: '陈耀鹏',
          createTime: '2020-4-27',
          edit: '操作哦'
        },
          {
            tid:'',
            cid:'',
            title: '我是题目1啦啦啦啦啦啦啦',
            type: '选择',
            points:'',
            creater: '陈耀鹏',
            createTime: '2020-4-27',
            edit: '操作哦'
          },
          {
            tid:'',
            cid:'',
            title: '我是题目1啦啦啦啦啦啦啦',
            type: '选择',
            points:'',
            creater: '陈耀鹏',
            createTime: '2020-4-27',
            edit: '操作哦'
          },
          {
            tid:'',
            cid:'',
            title: '我是题目1啦啦啦啦啦啦啦',
            type: '选择',
            points:'',
            creater: '陈耀鹏',
            createTime: '2020-4-27',
            edit: '操作哦'
          },
          {
            tid:'',
            cid:'',
            title: '我是题目1啦啦啦啦啦啦啦',
            type: '选择',
            points:'',
            creater: '陈耀鹏',
            createTime: '2020-4-27',
            edit: '操作哦'
          },
          {
            tid:'',
            cid:'',
            title: '我是题目1啦啦啦啦啦啦啦',
            type: '选择',
            points:'',
            creater: '陈耀鹏',
            createTime: '2020-4-27',
            edit: '操作哦'
          },
          {
            tid:'',
            cid:'',
            title: '我是题目1啦啦啦啦啦啦啦',
            type: '选择',
            points:'',
            creater: '陈耀鹏',
            createTime: '2020-4-27',
            edit: '操作哦'
          },
          {
            tid:'',
            cid:'',
            title: '我是题目1啦啦啦啦啦啦啦',
            type: '选择',
            points:'',
            creater: '陈耀鹏',
            createTime: '2020-4-27',
            edit: '操作哦'
          }
        ],
        multipleSelection: []
      }
    },
// 加载数据
    created() {
      this.getExpends();
    },

    beforeMount() {
      this.course_id = this.$route.params.course_id;
    },
    computed: {
      // 计算属性的 getter

    },

    methods: {

      /*
      从题库中选择
      * */

      choiceFromItem() {

      },
      //关闭
      handClose(done) {
        done()
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
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

      addChoice() {
        let choice = {
          title: '',
          type: '选择',
          option: [
            "",
            "",
            "",
            ""
          ],
          res: [
            ''
          ],
          radio: 'A'

        }
        this.subject.push(choice)
      },
      addJudge() {
        let choice = {
          title: '',
          type: '判断',
          option: [
            "",
            ""
          ],
          res: [
            ''
          ],
          radio: 'A'
        }
        this.subject.push(choice)
      },
      addFill() {
        let choice = {
          title: '',
          type: '填空',
          option: [
            "",
            ""
          ],
          res: [
            ''
          ],
          radio: ''
        }
        this.subject.push(choice)
      },
      addFillChoice(index) {
        this.subject[index].res.push("")
      },
      //删除选项
      delFillChoice(index, index1) {
        // console.log(index1)
        if (this.subject[index].res.length > 1) {
          this.subject[index].res.splice(index1, 1)
        }

      },
      clickChoice(event, index) {
        if (event === '选择') {
          this.subject[index].option = ['', '', '', '']
          this.subject[index].radio = 'A'
        } else if (event === '判断') {
          this.subject[index].option = ['', '']
        } else if (event === '填空') {

        }

      },
      delThisSub(index) {
        this.subject.splice(index, 1)
      },

      //关闭之后
      handleClose() {
        console.log('关闭了')
      },
      showAddOption() {
        this.dialogVisible = true;
        console.log('点击了')
      },

      toAddOption() {
        this.dialogVisible1 = true;

      },
      // 如允许 17:30:00 - 18:30:00
      disabledHours() {
        return makeRange(0, 16).concat(makeRange(19, 23))
      },
      disabledMinutes(hour) {
        if (hour === 17) {
          return makeRange(0, 29)
        }
        if (hour === 18) {
          return makeRange(31, 59)
        }
      },
      disabledSeconds(hour, minute) {
        if (hour === 18 && minute === 30) {
          return makeRange(1, 59)
        }
      },


      goBack() {
        this.$router.go(-1);//返回上一层
        console.log('go back');
      },
      getExpends() {
        var Id = this.tableData.map(item => item.name)
        console.log(Id);
        this.expends = Id
      },
      getRowKeys(row) {
        return row.name
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;

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

    .radio-m {
      margin-right: 20px;

    }

    .radio-op {
      /*height: 40px;*/
      line-height: 30px;
      margin-bottom: 10px;

    }

    .head-op {
      margin-top: 10px;
      margin-bottom: 15px;

    }

    .tagTitle{

      font-size: 14px;
      color: #999999;
    }

  }
</style>