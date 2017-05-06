import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';

Vue.use(Vuex);

const state = {
  loading: 0,
  asideSpan: 0, // asie nav span
  subNavs: [], // 当前二级导航列表
  user: {}, // 登录后 保存用户基本信息
  breadcrumb: [] // 面包屑数据
};

const mutations = {
  [types.increment](state) {
    state.loading++;
  },
  [types.decrement](state) {
    state.loading--;
  },
  [types.setAsideSpan](state, n = 4) {
    state.asideSpan = n;
  },
  [types.setUser](state, userData) {
    state.user = userData || {};
  },
  [types.setSubNavs](state, subNavs) {
    state.subNavs = subNavs;
  },
  [types.setBreadcrumb](state, breads) {
    state.breadcrumb = breads;
  }
};

const getters = {
  mainSpan(state) {
    return 24 - state.asideSpan;
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  getters
});

store.watch(state => state.subNavs, (subNavs) => {
  store.commit(types.setAsideSpan, !subNavs.length ? 0 : 4);
});

export default store;