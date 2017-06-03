import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';

Vue.use(Vuex);

const state = {
  loading: 0,
  asideSpan: 0, // asie nav span
  subNavs: [], // 当前二级导航列表
  user: {}, // 登录后 保存用户基本信息
  breadcrumb: [], // 面包屑数据
  currentTask: {} // 当前编辑的任务
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
  },
  [types.setCurrentTask](state, task) {
    state.currentTask = task;
  }
};

const getters = {
  mainSpan(state) {
    return 24 - state.asideSpan;
  },
  canUpdateTask(state) {
    const {user} = state;
    return user.roleTaskCreate || user.roleSysAdmin;
  },
  canCreateTask(state) {
    const {user} = state;
    return user.roleTaskCreate || user.roleSysAdmin;
  },
  canRemoveTask(state) {
    const {user} = state;
    return user.roleTaskRemove || user.roleSysAdmin;
  },
  canUpdateApply(state) {
    const {user} = state;
    return user.roleApplyUpdate || user.roleSysAdmin;
  },
  canCreateApply(state) {
    const {user} = state;
    return user.roleApplyCreate || user.roleSysAdmin;
  },
  canRemoveApply(state) {
    const {user} = state;
    return user.roleApplyRemove || user.roleSysAdmin;
  },
  isSysAdmin(state) {
    return !!state.user.roleSysAdmin;
  },
  canDataStat(state) {
    const {user} = state;
    return user.roleDataStat || user.roleSysAdmin;
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