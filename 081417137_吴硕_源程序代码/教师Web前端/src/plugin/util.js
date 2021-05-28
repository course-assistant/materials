/**
 * 工具插件
 */

const Util = {};

Util.install = (Vue) => {
  Vue.prototype.$$$$ = () => {
    console.log('$$$$');
  };


  // 封装确认框
  Vue.prototype.$cfm = (title, callback) => {
    if (confirm(title)) {
      if (callback) {
        callback();
      }
    }
  };


  // 换行符替换为<br>
  Vue.prototype.convertHtml = (str) => {
    return str.replace(/\n/g, '<br>');
  };



};

export default Util;