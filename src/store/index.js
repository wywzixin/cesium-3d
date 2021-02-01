import Vue from 'vue';
import Vuex from 'vuex';
import refresh from './moudle/refresh';
import mainStore from './moudle/mainStore';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        refresh,
        mainStore,
    },
});
