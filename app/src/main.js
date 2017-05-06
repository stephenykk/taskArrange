import 'element-ui/lib/theme-default/index.css';
import ElementUI from 'element-ui';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import extendsVue from './extends';

Vue.use(ElementUI);
extendsVue();

window.Vue = Vue;
window.axios = axios;

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(config => {
  config.data = P.url.stringify(config.data);
  return config;
});
axios.interceptors.response.use(res => {
  if (P.isString(res.data)) {
    P.warn('res.data is string..');
  } else {
    res.oriData = res.data;
    delete res.data;
    P.extend(res, res.oriData);
  }
  
  return res;
});

Vue.config.productionTip = false;

const routes = router.options.routes;
router.beforeEach((to, from, next) => {
  const secondNavs = P.get2ndNavs(to, routes);
  if (secondNavs) {
    store.commit('setSubNavs', secondNavs);
  }

  const breads = P.getBreadcrumb(to, routes);
  store.commit('setBreadcrumb', breads);

  next();
});

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

