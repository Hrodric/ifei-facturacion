// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from '@/store/store';
import {
  sync,
} from 'vuex-router-sync';

import Vue from 'vue';
import App from './App';
import router from './router';

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
  },
  template: '<App/>',
});
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
