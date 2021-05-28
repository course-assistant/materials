import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import MyAxiosHttp from '@/plugin/http.js';
import Util from '@/plugin/util.js';
import MyUI from '@/plugin/my-ui.js';
import MyXLSX from '@/plugin/my-xlsx.js';
Vue.use(MyAxiosHttp);
Vue.use(Util);
Vue.use(MyUI);
Vue.use(MyXLSX);


import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/reset.css';

Vue.use(ElementUI);

Vue.config.productionTip = false;


// 路由发生变化修改页面title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')