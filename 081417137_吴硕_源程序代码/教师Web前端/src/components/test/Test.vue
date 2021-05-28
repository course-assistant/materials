<template>
  <div class="container">


    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >

      <div class="nav">

        <div style="font-size: 20px;line-height: 30px">随堂检测</div>

        <el-drawer
          title=""
          :visible.sync="drawer1"
          :direction="direction1"
          size="100%"
          :before-close="handClose1"
          destroy-on-close
        >

          <div style="margin: 0 auto;width: 600px">
            <span>编辑题目</span>


          </div>

          <div style="width: 600px;margin: 60px auto">
            <span style="color: #999999;font-size: 14px;margin-right: 20px;margin-bottom: 20px;">
              类型
            </span>

            <el-button @click="changeChoise" type="primary" plain size="mini" round>选择</el-button>
            <el-button @click="changePd" type="success" plain size="mini" round>判断</el-button>
            <el-button @click="changeFill" type="info" plain size="mini" round>填空</el-button>

            <div style="margin-top: 20px;">

              <div style="margin-bottom: 10px;">
                <el-input
                  style="width: 560px"
                  size="mini"
                  type="textarea"
                  :autosize="{ minRows: 1, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="editItem.title">
                </el-input>
              </div>


              <el-radio-group
                v-if="editItem.type==='选择'"
                v-model="editItem.radio" size="small">
                <div style="margin-bottom: 5px" v-for="(op1,index1) in editItem.option">
                  <el-radio-button  :label="returnABCD(index1)"></el-radio-button>
                  <el-input
                    style="width: 500px;margin-left: 20px"
                    size="mini"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="editItem.option[index1]">
                  </el-input>
                </div>

              </el-radio-group>

              <!--                判断-->
              <el-radio-group
                v-if="editItem.type==='判断'" v-model="editItem.radio" size="small">
                  <span class="radio-op" v-for="(op1,index1) in editItem.option">
                    <el-radio-button class="radio-m" :label="returnTrueOrFalse(index1)"></el-radio-button>
                    <!--                    <span>-->
                    <!--                      <el-radio-button class="radio-m" :label="returnABCD(index1)"></el-radio-button>-->
                    <!--                    </span>-->

                  </span>
              </el-radio-group>


              <div style="margin-bottom: 10px"

                   v-if="editItem.type==='填空'" v-for="(op1,index1) in editItem.res">
                <span style="margin-right: 10px">第{{index1+1}}空</span>
                <el-input
                  style="width: 500px"
                  size="mini"
                  type="textarea"
                  :autosize="{ minRows: 1, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="editItem.res[index1]">
                </el-input>
                <el-link @click="delFillChoice(index1)" style="margin-left: 15px;" :underline="false">
                  <i class="el-icon-remove-outline"></i>
                </el-link>
              </div>

              <div v-if="editItem.type==='填空'"
                   @click="addFillChoice()"
                   style="margin-bottom: 20px;background-color:#fafafa;
                     color: #999999;
                     height: 30px;line-height: 30px;width: 560px;">
                +添加选项
              </div>


            </div>

            <div>
              <el-button
                style="margin-top: 20px;"
                type="primary"
                size="mini"
              >
                修改
              </el-button>
            </div>


          </div>


        </el-drawer>

        <el-drawer
          style="height: 100%"
          title="添加题目"
          :visible.sync="drawer2"
          :direction="direction2"
          size="100%"
          :before-close="handClose2"
          destroy-on-close>


          <div style="margin-left: 20px;">
            <div style="height: 40px;">
              <el-button @click="addChoice" type="primary" plain size="mini" round>选择</el-button>
              <el-button @click="addJudge" type="success" plain size="mini" round>判断</el-button>
              <el-button @click="addFill" type="info" plain size="mini" round>填空</el-button>

              <el-button
                @click="addAllToTable"
                type="text">
                添加
              </el-button>

            </div>
            <el-scrollbar :style="{'height': scroll+'px'}">

              <div style="padding-bottom: 50px;">
                <div style="margin-left: 10px;width: 650px;" v-for="(sub,index) in subject">

                  <div style="margin-bottom: 10px;">
                    <span style="margin-right: 20px;">{{index+1}}</span>
                    <el-select
                      style="width: 100px;"
                      size="mini"
                      v-model="sub.type" placeholder="请选择"
                      @change="clickChoice2($event,index)"
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

                    <img src="../../../assets/img/delete.png" style="width: 20px;margin-right: 40px;" alt="">
                      <!--                    删除图标-->

                  </span>

                  </div>


                  <div style="margin-bottom: 10px;" >
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
                      style="margin-bottom: 20px;"
                      v-if="sub.type==='选择'"
                      v-model="sub.radio" size="small">
                      <div style="margin-bottom: 5px" v-for="(op1,index1) in sub.option">
                        <el-radio-button style="margin-right: 20px" :label="returnABCD(index1)"></el-radio-button>
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
                    <el-radio-button style="margin-right: 20px" :label="returnTrueOrFalse(index1)"></el-radio-button>
                    <!--                    <span>-->
                    <!--                      <el-radio-button class="radio-m" :label="returnABCD(index1)"></el-radio-button>-->
                    <!--                    </span>-->

                  </span>
                    </el-radio-group>


                    <div
                      style="margin-bottom: 20px;"
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
                      <el-link @click="delFillChioce2(index,index1)" style="margin-left: 15px;" :underline="false">
                        <i class="el-icon-remove-outline"></i>
                      </el-link>
                    </div>

                    <div v-if="sub.type==='填空'"
                         @click="addFillChoice2(index)"
                         style="margin-bottom: 20px;background-color:#fafafa;
                     color: #999999;
                     height: 30px;line-height: 30px;width: 560px;">
                      +添加选项
                    </div>


                  </div>


                </div>
              </div>



            </el-scrollbar>
          </div>


        </el-drawer>

        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="随堂测试" name="first">
              <div style="margin-top: 5px"
              >
                <span style="font-size: 14px;margin-right: 20px;color:#999999;">
                  筛选
                </span>
                <el-date-picker
                  size="mini"
                  style="width: 200px"
                  v-model="value1"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :shortcuts="shortcuts"
                >
                </el-date-picker>


                <!--                <img style="margin-left: 350px;" height="12px" src="@/assets/img/目录.svg" alt="">-->

                <el-dropdown style="margin-left: 40px;">
                <span class="el-dropdown-link">
                  排序
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>时间升序</el-dropdown-item>
                      <el-dropdown-item>时间倒序</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>

                <el-input v-model="input" size="mini" placeholder="搜索题目 名称、内容 或 编号"
                          style="width: 300px;border-radius: 50%;float:right;"
                ></el-input>


              </div>

              <div style="margin-top: 15px">
                <span style="color: #444444">共 0 个随堂检测 已发布：0个未发布： 0个</span>

                <span
                  style="float:right;color: #409eff"
                  @click="clickTest"
                >添加随堂测试</span>

                <el-dialog
                  title="提示"
                  :visible.sync="dialogVisible"
                  width="30%"
                >
                  <!--              <span>这是一段信息</span>-->

                  <div>

                    <div>
                      测试标题:
                      <el-input v-model="input" size="mini" style="width: 200px" placeholder="请输入标题"></el-input>
                    </div>
                    <div style="margin-top: 15px;">
                      测试时间:
                      <el-time-picker
                        size="mini"
                        style="width: 200px"
                        arrow-control
                        v-model="value2"
                        :disabled-hours="disabledHours"
                        :disabled-minutes="disabledMinutes"
                        :disabled-seconds="disabledSeconds"
                        placeholder="任意时间点">
                      </el-time-picker>
                    </div>

                  </div>

                  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="toAddTest">确 定</el-button>
    </span>
                  </template>
                </el-dialog>

              </div>

              <div v-for="test in testList">
                <el-card v-if="test.state==='未发布'" class="box-card" shadow="hover" style="margin-top: 20px;width: 100%">
                  <div style="position: relative;height: 80px;">

                    <div style="width: 100%;">

                      <el-checkbox v-model="checked" style="position: absolute;top: 0px;left: 20px"/>

                      <div style="position: absolute;top: 0px;left: 60px;width: 100%;">
                        <strong>{{test.test_title}}</strong>

                        <el-tag
                          style="margin-left: 20px"
                          type="success"
                          effect="plain"
                          size="mini"
                        >
                          {{test.state}}
                        </el-tag>

                        <el-tag
                          style="margin-left: 20px"
                          type="success"
                          effect="plain"
                          size="mini"
                        >
                          第1周
                        </el-tag>

                        <div style="position: absolute;top:-10px;right: 150px;color:#409eff;">
                          <el-button type="text">
                            发布
                          </el-button>
                        </div>

                        <div style="position: absolute;top:-10px;right: 80px;color:#409eff;">
                          <el-button
                            @click="toAddTest"
                            type="text">
                            编辑
                          </el-button>
                        </div>

                        <div style="position: absolute;bottom:0px;right: 80px;color:#999999;font-size: 14px;">
                        <span>
                          测试时间:{{test.test_time}}
                        </span>
                        </div>


                        <div style="padding-top: 40px">
                          <strong style="color: #999999">{{test.creater}}</strong>
                          <span style="padding-left: 20px;color: #999999">{{test.create_time}}</span>
                        </div>

                      </div>


                    </div>

                  </div>
                </el-card>

                <el-card  v-if="test.state==='已发布'" class="box-card" shadow="hover" style="margin-top: 20px;width: 100%">
                  <div style="position: relative;height: 80px;">
                    <div style="width: 100%;">
                      <el-checkbox v-model="checked" style="position: absolute;top: 0px;left: 20px"/>

                      <div style="position: absolute;top: 0px;left: 60px;width: 100%;">
                        <strong>{{test.test_title}}</strong>

                        <el-tag
                          style="margin-left: 20px"
                          effect="plain"
                          size="mini"
                        >
                          {{test.state}}
                        </el-tag>

                        <el-tag
                          style="margin-left: 20px"
                          type="success"
                          effect="plain"
                          size="mini"
                        >
                          第1周
                        </el-tag>

                        <span style="margin-left: 20px;color: #999999">
                        {{test.test_time}}
                      </span>


                        <div style="position: absolute;top:-10px;right: 150px;color:#409eff;">
                          <el-button type="text">
                            立即结束
                          </el-button>
                        </div>

                        <div style="position: absolute;top:-10px;right: 80px;color:#409eff;">
                          <el-button
                            @click="toAddTest"
                            type="text">
                            查看
                          </el-button>
                        </div>

                        <div style="position: absolute;bottom:0px;right: 80px;color:#999999;font-size: 14px;">
                        <span>
                          测试时间:5分钟
                        </span>
                        </div>


                        <div style="padding-top: 40px">
                          <strong style="color: #999999">陈耀鹏</strong>
                          <span style="padding-left: 20px;color: #999999">2021-4-30</span>

                          <span style="margin-left: 20px;font-size: 12px;color: #999999">
                            已提交 {{test.commit_num}}/{{test.main_num}}
                          </span>

                        </div>

                      </div>


                    </div>

                  </div>
                </el-card>
                <el-card  v-if="test.state==='已结束'" class="box-card" shadow="hover" style="margin-top: 20px;width: 100%">
                  <div style="position: relative;height: 80px;">
                    <div style="width: 100%;">
                      <el-checkbox v-model="checked" style="position: absolute;top: 0px;left: 20px"/>

                      <div style="position: absolute;top: 0px;left: 60px;width: 100%;">
                        <strong>{{test.test_title}}</strong>

                        <el-tag
                          style="margin-left: 20px"
                          effect="plain"
                          type="danger"
                          size="mini"
                        >
                          {{test.state}}
                        </el-tag>

                        <el-tag
                          style="margin-left: 20px"
                          type="success"
                          effect="plain"
                          size="mini"
                        >
                          第1周
                        </el-tag>




<!--                        <div style="position: absolute;top:-10px;right: 150px;color:#409eff;">-->
<!--                          <el-button type="text">-->
<!--                            立即结束-->
<!--                          </el-button>-->
<!--                        </div>-->

                        <div style="position: absolute;top:-10px;right: 80px;color:#409eff;">
                          <el-button
                            @click="toAddTest"
                            type="text">
                            查看
                          </el-button>
                        </div>

<!--                        <div style="position: absolute;bottom:0px;right: 80px;color:#999999;font-size: 14px;">-->
<!--                        <span>-->
<!--                          测试时间:5分钟-->
<!--                        </span>-->
<!--                        </div>-->


                        <div style="padding-top: 40px">
                          <strong style="color: #999999">陈耀鹏</strong>
                          <span style="padding-left: 20px;color: #999999">2021-4-30</span>
                          <span style="margin-left: 20px;font-size: 12px;color: #999999">
                            已提交 {{test.commit_num}}/{{test.main_num}}
                          </span>
                        </div>

                      </div>


                    </div>

                  </div>
                </el-card>





              </div>



              <div style="margin-bottom: 20px;"></div>


            </el-tab-pane>
            <el-tab-pane label="测试题库" name="second">
              <!--              测试题库-->
              <el-tag
                color="#337ab7"
                effect="dark"
                size="mini"
              >
                总量{{tableData.length}}
              </el-tag>
              -
              <el-tag
                style="margin-left: 10px"
                color="#5cb85c"
                effect="dark"
                size="mini"
              >
                选择{{returnChioce}}
              </el-tag>

              <el-tag
                style="margin-left: 10px"
                color="f0ad4e"
                effect="dark"
                size="mini"
              >
                判断{{returnPd}}
              </el-tag>

              <el-tag
                style="margin-left: 10px"
                color="#d9534f"
                effect="dark"
                size="mini"
              >
                填空{{returnFill}}
              </el-tag>

              <el-button
                style="margin-left: 50px;"
                type="text"
                size="mini"
                @click="addOptions"
              >
                添加题目
              </el-button>

              <el-button
                style="margin-left: 30px;"
                type="text"
                size="mini"
                @click="delChioceOptions"
              >
                删除选中题目
              </el-button>

              <div style="margin-top: 20px">
                <el-input v-model="input" size="mini" placeholder="搜索题目 名称、内容 或 编号"
                          style="width: 300px;border-radius: 50%"
                ></el-input>

                <img style="margin-left: 350px;" height="12px" src="@/assets/img/目录.svg" alt="">

                <el-dropdown style="margin-left: 40px;">
                <span class="el-dropdown-link">
                  类别
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>选择</el-dropdown-item>
                      <el-dropdown-item>判断</el-dropdown-item>
                      <el-dropdown-item>填空</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>

                <el-dropdown style="margin-left: 25px;">
                <span class="el-dropdown-link">
                  下拉菜单
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>选择</el-dropdown-item>
                      <el-dropdown-item>判断</el-dropdown-item>
                      <el-dropdown-item>填空</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>

                <div style="margin-top: 20px;">

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
                        <el-button @click="editPoint(scope.row.cid,scope.row.tid)" type="text" size="small">编辑
                        </el-button>


                        <!--              <el-button  type="text" size="small">删除</el-button>-->

                        <el-popconfirm
                          style="margin-left: 20px;"
                          title="这是一段内容确定删除吗？"
                          @confirm="delChioceOption(scope.$index)"
                        >
                          <template #reference>
                            <el-button type="text" size="small">删除</el-button>
                          </template>
                        </el-popconfirm>

                      </template>

                    </el-table-column>

                  </el-table>
                </div>

              </div>


              <div style="margin-top: 20px;padding-bottom: 20px;margin-left: 30px">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="1000">
                </el-pagination>
              </div>


            </el-tab-pane>
          </el-tabs>


        </div>


      </div>

    </div>
  </div>
</template>

<script>

  import MissionItem from "../../../components/MissionItem";

  const makeRange = (start, end) => {
    const result = []
    for (let i = start; i <= end; i++) {
      result.push(i)
    }
    return result
  }
  export default {

    data() {
      return {
        lastTime:"00:03",
        dialogVisible: false,
        checked: false,
        course_id: 0,
        loading: false,
        value2: new Date(2016, 9, 10, 0, 0, 5),
        activeName: 'first',
        shortcuts: [{
          text: '最近一周',
          value: (() => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          })(),
        }, {
          text: '最近一个月',
          value: (() => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          })(),
        }, {
          text: '最近三个月',
          value: (() => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          })(),
        }],
        value1: '',

        input: '',
        expends: [],
        /**
         * 添加题目
         */
        drawer2: false,
        direction2: 'ttb',
        scroll: 714,
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

        addList:[

        ],


        /*
        * 抽屉数据,编辑题目
        */
        drawer1: false,
        direction1: 'ttb',
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

        editItem: {
          title: '这是题目标题',
          type: '选择',
          option: [
            "第一个选项",
            "第二个选项",
            "第三个选项",
            "第四个选项"
          ],
          res: [
            ''
          ],
          radio: 'A'

        },

        /**
         * table数据
         */
        tableData: [{
          cid: '1',
          tid: '1',
          title: '我是题目1啦啦啦啦啦啦啦',
          type: '选择',
          points: '',
          creater: '陈耀鹏',
          createTime: '2020-4-27',
          edit: '操作哦'
        },
          {
            cid: '1',
            tid: '2',
            title: '我是题目1啦啦啦啦啦啦啦',
            type: '选择',
            points: '',
            creater: '陈耀鹏',
            createTime: '2020-4-27',
            edit: '操作哦'
          },
        ],
        multipleSelection: [],
        testList:[
          {
            test_id: 'h123',
            test_title:'这是测试的标题',
            state:'未发布',
            test_time:'00:05:00',
            creater:'张妍妍',
            create_time:'2021-4-29',
            main_num:60,
            commit_num:0
          },
          {
            test_id: 'h123',
            test_title:'这是测试的标题',
            state:'未发布',
            test_time:'00:05:00',
            creater:'陈耀鹏',
            create_time:'2021-4-29',
            main_num:60,
            commit_num:0
          },
          {
            test_id: 'h123',
            test_title:'这是测试的标题',
            state:'未发布',
            test_time:'00:05:00',
            creater:'陈耀鹏',
            create_time:'2021-4-29',
            main_num:60,
            commit_num:0
          },
          {
            test_id: 'h123',
            test_title:'这是测试的标题',
            state:'已发布',
            test_time:'00:05',
            creater:'陈耀鹏',
            create_time:'2021-4-29',
            main_num:60,
            commit_num:0

          },
          {
            test_id: 'h123',
            test_title:'这是测试的标题',
            state:'已结束',
            test_time:'05:00',
            creater:'陈耀鹏',
            create_time:'2021-4-29',
            main_num:60,
            commit_num:0
          }
        ],
        timer:''
      }
    },
    components: {
      MissionItem: MissionItem
    },

    computed: {
      returnChioce() {
        let cn = 0;
        for (let p in this.tableData) {
          let t = this.tableData[p].type;
          if (t === '选择') {
            cn++
          }
        }
        return cn;
      },
      returnPd() {
        let cn = 0;
        for (let p in this.tableData) {
          let t = this.tableData[p].type;
          if (t === '判断') {
            cn++
          }
        }
        return cn;
      },
      returnFill() {
        let cn = 0;
        for (let p in this.tableData) {
          let t = this.tableData[p].type;
          if (t === '填空') {
            cn++
          }
        }
        return cn;
      }
    },


    // 加载数据
    beforeMount() {
      this.course_id = this.$route.params.course_id;
    },
    mounted(){
        let t =10
        this.timer=setInterval(this.setLastTime, 1000);

    },
    beforeDestroy() {
      clearInterval(this.timer);
    },

    created() {
      this.getExpends();
    },

    methods: {
      /**
       *设置倒计时
       */

      setLastTime(){
        let date =this.testList[3].test_time
        let list =date.split(":");
        let map1={
          m:parseInt(list[0]),
          s:parseInt(list[1]),

        };
        console.log(this.testList[3].test_time)
        if (map1.m===0&&map1.s===0){
          this.testList[3].state='已结束'
          clearInterval(this.timer);
          return
        }



        if (map1.s!==0){
          map1.s--;
        }else{
          map1.m--;
          map1.s=59;
        }
        let sm='';
        let ss='';
        if (map1.s<=9){
          ss='0'+map1.s
        }else{
          ss=map1.s
        }

        if (map1.m<=9){
          sm='0'+map1.m
        }else{
          sm=map1.m
        }
        let m_date=sm+':'+ss
        this.testList[3].test_time=m_date



      },



      /**
       * 设置table
       * @param index
       */
      //返回abcd
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
      //选择改变类型
      clickChoice(event, index) {
        if (event === '选择') {
          this.editItem.option = ['', '', '', '']
          this.editItem.radio = 'A'
        } else if (event === '判断') {
          this.editItem.option = ['', '']
        } else if (event === '填空') {

        }

      },

      //选择的函数
      handleSelectionChange(val) {
        this.multipleSelection = val;

      },

      //更改类型
      changeChoise() {
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
        this.editItem = choice
      },
      //删除编辑的填空选项
      delFillChoice(index1) {
        if (this.editItem.res.length > 1) {
          this.editItem.res.splice(index1, 1)
        }
      },

      /**
       *添加题目
       */
      //添加题目

      addOptions() {
        this.scroll = document.body.clientHeight - 63
        console.log(this.scroll);
        this.drawer2 = true
      },
      clickChoice2(event, index) {
        if (event === '选择') {
          this.subject[index].option = ['', '', '', '']
          this.subject[index].radio = 'A'
        } else if (event === '判断') {
          this.subject[index].radio = '对'
          this.subject[index].option = ['', '']
        } else if (event === '填空') {

        }

      },
      delFillChioce2(index,index1){
        if (this.subject[index].res.length > 1) {
          this.subject[index].res.splice(index1, 1)
        }
      },

      //删除当前
      delThisSub(index) {
        this.subject.splice(index, 1)
      },

      addFillChoice2(index) {
        this.subject[index].res.push("")
      },

      returnTrueOrFalse(index){
        if (index === 0) {
          return '对'
        } else if (index === 1) {
          return '错'
        }
      },
      delChioceOption(row){
        this.tableData.splice(row, 1);
      },

      addAllToTable(){
        for(let p in this.subject){

          let v={
            cid: '1',
            tid: '1',
            title: '我是题目1啦啦啦啦啦啦啦',
            type: '选择',
            points: '',
            creater: '陈耀鹏',
            createTime: '2020-4-27',
            edit: '操作哦'
          };
          let tp =this.subject[p]
          var myDate = new Date();
          let mydate1 =myDate.toLocaleDateString();
          let localTime = mydate1.replaceAll("/","-")
          console.log(localTime)
          v.createTime=localTime
          v.creater="陈耀鹏"
          v.title=tp.title
          v.type=tp.type
          this.tableData.push(v)
        }
        this.drawer2=false



      },

      //关闭回调
      handClose2() {
        this.drawer2 = false
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
          radio: '对'
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



      /**
       * 这是主页面的编辑
       */
      //删除选中
      delChioceOptions() {
        // let i=0;
        for (let i = this.tableData.length - 1; i >= 0; i--) {

          for (var j = this.multipleSelection.length - 1; j >= 0; j--) {

            if (this.multipleSelection[j].tid === this.tableData[i].tid) {
              this.tableData.splice(i, 1);
            }
          }

        }


        // console.log(list)
        // console.log(this.multipleSelection.pop())
      },

      changePd() {
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
          radio: '对'
        }
        this.editItem = choice
      },

      changeFill() {
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
        this.editItem = choice
      },

      addFillChoice() {

        this.editItem.res.push("")

      },
      editPoint(cid, tid) {
        console.log("课程id" + cid)
        console.log("题目id" + tid)
        //从后端获取数据
        //弹出抽屉
        this.drawer1 = true

      },
      handClose1() {
        this.drawer1 = false
      },


      //时间选择器
      disabledHours() {
        return makeRange(0, 23)
      },
      disabledMinutes(hour) {
        return makeRange(0, 59)
      },
      disabledSeconds(hour, minute) {
        return makeRange(0, 59)
      },


      //table
      getExpends() {
        var Id = this.tableData.map(item => item.name)
        this.expends = Id
      },
      getRowKeys(row) {
        return row.name
      },


      handleClick(tab, event) {
        console.log(tab, event);
      },

      //点击弹窗
      clickTest() {
        console.log('点击了');
        this.dialogVisible = true
        // this.$router.push(this.$route.path+"/addTest")
      },
      //跳转到添加测试页面
      toAddTest() {

        this.$router.push(this.$route.path + "/addTest")
      }

    },

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

    .optionStyle {
      margin-bottom: 5px;

    }

    .head-op {
      margin-top: 10px;
      margin-bottom: 15px;

    }

    .radio-op1 {
      /*height: 40px;*/
      line-height: 30px;

    }

    .radio-m {
      margin-right: 20px;

    }

  }
</style>