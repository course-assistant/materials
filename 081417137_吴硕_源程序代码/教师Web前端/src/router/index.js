import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login';
import Index from '@/views/Index';
import NotFound from '@/views/404';

import CourseList from '@/views/Course/CourseList.vue';
import CourseIndex from '@/views/Course/CourseIndex.vue';
import TeacherHome from '@/views/Teacher/TeacherHome.vue';
import AddCourse from '@/views/Course/AddCourse.vue';
import StudentManage from '@/views/Course/StudentManage.vue';

// 课程详情 左边的菜单
import ClassManage from '@/views/Course/menu/ClassManage.vue';
import Lesson from '@/views/Course/menu/Lesson.vue';
import WeekMission from '@/views/Course/menu/WeekMission.vue';
import WeekMissionList from '@/views/Course/menu/WeekMissionList.vue';
import WeekMissionDetail from '@/views/Course/menu/WeekMissionDetail.vue';
import Test from '@/views/Course/menu/Test.vue';
import Discussion from '@/views/Course/menu/Discussion.vue';
import Statistics from '@/views/Course/menu/Statistics.vue';
import Setting from '@/views/Course/menu/Setting.vue';

import AddTest from "../components/test/AddTest";
import MainTest from "../components/test/MainTest";

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter)

const routes = [
  // 登录页面
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '教师登录'
    }
  },

  // 404页面
  {
    path: '/404',
    name: '404',
    component: NotFound,
    meta: {
      title: '404 Not Found'
    }
  },

  // 教师首页
  {
    path: '/',
    component: Index,
    meta: {
      title: '教师首页'
    },

    children: [
      // 课程列表页面
      {
        name: 'CourseList',
        path: '',
        component: CourseList,
        meta: {
          title: '教师首页'
        }
      },

      // 添加课程页面
      {
        name: 'AddCourse',
        path: 'addcourse',
        component: AddCourse,
        meta: {
          title: '添加课程'
        }
      },

      // 教师个人页面
      {
        name: 'TeacherHome',
        path: 'teacher',
        component: TeacherHome,
        meta: {
          title: '教师个人空间'
        }
      },

      // 班级学生管理页面
      {
        name: 'StudentManage',
        path: 'class-student/:class_id',
        component: StudentManage,
        meta: {
          title: '学生管理'
        }
      },

      // 课程首页
      {
        name: 'CourseIndex',
        path: 'course/:course_id',
        component: CourseIndex,
        meta: {
          title: '课程详情'
        },
        ////// 课程首页左边的菜单
        children: [
          // 班级管理
          {
            name: 'ClassManage',
            path: 'class',
            component: ClassManage,
            meta: {
              title: '课程详情 - 班级管理'
            }
          },

          // 教学内容
          {
            name: 'Lesson',
            path: 'lesson',
            component: Lesson,
            meta: {
              title: '课程详情 - 教学内容'
            }
          },

          // 周任务 -- 周列表
          {
            name: 'WeekMission',
            path: 'week-mission',
            component: WeekMission,
          },
          // 周任务 -- 周的任务列表
          {
            name: 'WeekMissionList',
            path: 'week-mission/week-mission-list/:week_id',
            component: WeekMissionList,
          },
          // 周任务 -- 编辑的详情
          {
            name: 'WeekMissionDetail',
            path: 'week-mission/week-mission-list/:week_id/week-mission-detail/:week_mission_id',
            component: WeekMissionDetail,
          },

          // 随堂测试
          {
            name: 'Test',
            path: 'test',
            component: MainTest,
            meta: {
              title: '课程详情 - 随堂测试'
            },
            children:[
              {
                path: '/',
                component: Test,
              },
              {
                name:'AddTest',
                path: 'addTest',
                component: AddTest,
                meta:{
                  title:'添加测试'
                }
              }

            ]
          },

          // 课堂讨论
          {
            name: 'Discussion',
            path: 'discussion',
            component: Discussion,
            meta: {
              title: '课程详情 - 课堂讨论'
            }
          },

          // 统计
          {
            name: 'Statistics',
            path: 'statistics',
            component: Statistics,
            meta: {
              title: '课程详情 - 统计'
            }
          },

          // 管理
          {
            name: 'Setting',
            path: 'setting',
            component: Setting,
            meta: {
              title: '课程详情 - 管理'
            }
          },


        ],
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router