import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css'; // 新添加
import element from 'element-ui';
Vue.use(element);

Vue.config.productionTip = false;

import CustomSource from '@/CustomSource/CustomSource';
Vue.use(CustomSource);

import readConfigFile from 'U/readConfigFile';
Vue.use(readConfigFile);

import rq from '@/api';
Vue.use(rq);

import '@/style/reset.scss';
import '@/style/public.scss';

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
