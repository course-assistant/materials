/**
 * 注册全局组件
 */


import Empty from '@/components/Empty.vue';

const MyUI = {
    install: function (Vue) {
        Vue.component('Empty', Empty);
    }
}


export default MyUI;