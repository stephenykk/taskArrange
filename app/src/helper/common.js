import { Message } from 'element-ui';
import config from 'app/config';
import * as P from './utils';

const getEnvConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return config[isProduction ? 'build' : 'dev'];
};

const { apiBaseUrl, host } = getEnvConfig();

export const getApi = (path, query = '') => {
  path = path.replace(/^\//, '');
  if (P.isObject(query)) {
    query = P.url.stringify(query);
  }

  if (query) {
    query = P.trim(query);
    if (!(/^\?/.test(query))) {
      query = `?${query}`;
    }
  }

  return `${apiBaseUrl}${path}${query}`;
};

// 检测一级导航 eg: /task /
export const checkTopNav = route => route.path.match(/^\/(\w+)$/);

// 检测二级导航 eg: /task/my
export const check2ndNav = route => route.path.match(/^(\/\w+){2}(\/:\w*)?$/);

// 获取当前一级导航下的二级导航
export const get2ndNavs = (curRoute, routes) => {
  let result = true;
  const isHome = curRoute.path === '/';

  if (checkTopNav(curRoute)) {
    result = routes.filter(route => {
      let ok = false;
      if (check2ndNav(route)) {
        ok = route.path.indexOf(curRoute.path) === 0 && !route.meta.hide;
      }
      return ok;
    });
  } else if (isHome) { // home
    result = [];
  } else { // not top nav
    result = false;
  }
  if (Array.isArray(result)) {
    result.sort((a, b) => {
      const order1 = a.meta.order !== undefined ? a.meta.order : 1;
      const order2 = b.meta.order !== undefined ? b.meta.order : 1;
      return order1 - order2;
    });
  }
  return result;
};

// 根据当前路由的name,  推算出面包屑
export const getBreadcrumb = (curRoute, routes) => {
  const curname = curRoute.name; // fooBarBazGoo -> [foo, fooBar, fooBarBaz]
  const re = /\B[A-Z]/g;
  const names = [];
  while (re.exec(curname)) {
    names.push(curname.slice(0, re.lastIndex - 1));
  }
  names.push(curname);

  let breads = routes.filter(route => names.includes(route.name))
    .sort((a, b) => a.length - b.length)
    .map(route => {
      const o = {};
      o.name = route.name;
      o.text = route.meta.text;
      return o;
    });

  if (breads.length && breads[0].name !== 'home') {
    breads.unshift({ name: 'home', text: '首页' });
  } else {
    breads = [];
  }

  return breads;
};

export const renameField = (arr, oldName, newName) => {
  if (P.isObject(arr)) { // not arr
    arr = [arr];
  }
  arr.forEach(item => {
    item[newName] = item[oldName];
    delete item[oldName];
  });
  return arr;
};

// 分页参数
export const pagingParams = paging => {
  let params = {
    pagenum: 1,
    pagesize: 10
  };
  if (P.isObject(paging)) {
    params = {
      pagenum: paging.currentPage,
      pagesize: paging.pageSize
    };
  }
  return params;
};

// 返回ajax promise resolve的回调
export const resolvedCallback = (action, onsuccess, onerror) => {
  if (!action) { onsuccess.notips = true; }
  const callback = (res) => {
    if (res.ok) {
      !onsuccess.notips && Message.success(`${action}成功!`);
      onsuccess(res);
    } else {
      Message.warning(`${action}失败: ${res.msg}`);
      P.isFunction(onerror) && onerror(res);
    }
  };
  return callback;
};

// 重命名字段 视图表的字段名->基表的字段名
// 默认去掉 非prefix开头的字段
// eg: userNickName -> nick_name
export const renameViewFields = (row, prefix, keep) => {
  const re = new RegExp(`^${prefix}`, 'i');
  const delPrefix = str => str.replace(re, '');
  const toDash = (str) => {
    const re = /([^_-])([A-Z])/g;
    return str.replace(re, '$1_$2').toLowerCase();
  };

  const ret = {};
  P.eachKey(row, (val, key) => {
    if (!keep && !re.test(key)) {
      return;
    }
    const newKey = toDash(delPrefix(key));
    ret[newKey] = val;
  });

  return ret;
};

export const getAvatarUrl = path => (path ? host + path : path);

const oneDay = 1000 * 3600 * 24;
export const pickerShortcuts = [{
  text: '今天',
  onClick(picker) {
    picker.$emit('pick', new Date());
  }
}, {
  text: '今周',
  onClick(picker) {
    const now = new Date();
    const diff = 6 - now.getDay();
    const weekend = now.setDate(now.getDate() + diff);
    picker.$emit('pick', weekend);
  }
}, {
  text: '本月',
  onClick(picker) {
    const now = new Date();
    now.setMonth(now.getMonth() + 1);
    now.setDate(1);
    const next = now;
    const lastDate = new Date(next - oneDay);
    picker.$emit('pick', lastDate);
  }
}, {
  text: '本季度',
  onClick(picker) {
    const now = new Date();
    const m = now.getMonth() + 1;
    const diff = (m % 3) ? (3 - (m % 3)) : 0;
    now.setMonth((m - 1) + (diff + 1));
    const lastDate = new Date(now.setDate(1) - oneDay);
    picker.$emit('pick', lastDate);
  }
}, {
  text: '今年',
  onClick(picker) {
    const now = new Date();
    const lastDate = new Date(now.setFullYear(now.getFullYear() + 1, 0, 1) - oneDay);
    picker.$emit('pick', lastDate);
  }
}];

export const nextStatus = (curStatus, statusSteps) => {
  let nextStatus = {};
  const steps = statusSteps.slice(0, -1);
  const index = P.findIndex(steps, step => step.status === curStatus);
  if (index + 1 === steps.length) {
    nextStatus = false;
  } else {
    nextStatus = steps[index + 1];
  }
  return nextStatus;
};

export const checkLogin = (vm) => {
  if (!vm.$store.state.user.userId) {
    vm.$message.warning('请先登录..');
    setTimeout(() => {
      vm.$router.push({name: 'login'});
    }, 2000);
  }
};

const common = {
  getApi,
  checkTopNav,
  check2ndNav,
  get2ndNavs,
  getBreadcrumb,
  renameField,
  pagingParams,
  resolvedCallback,
  renameViewFields,
  getAvatarUrl,
  pickerShortcuts,
  checkLogin
};

export default common;
Object.assign(window.P, common, { common });