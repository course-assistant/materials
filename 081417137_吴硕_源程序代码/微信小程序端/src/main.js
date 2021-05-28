import Vue from 'vue'
import App from './App'



import MyHttp from './plugin/http.js';
import MyUtil from './plugin/util.js';

Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(MyHttp);
Vue.use(MyUtil);

const app = new Vue(App)
app.$mount()
