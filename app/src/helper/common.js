import { Message } from 'element-ui';
import config from 'app/config';
import * as P from './utils';

const getEnvConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return config[isProduction ? 'build' : 'dev'];
};

const { apiBaseUrl } = getEnvConfig();

export const getApi = (path, query = '') => {
  path = path.replace(/^\//, '');

  query = P.isObject(query) ? P.url.stringify(query) : query;
  query && (query = P.trim(query));
  if (query && !/^\?/.test(query)) {
    query = `?${query}`;
  }
  
  return `${apiBaseUrl}${path}${query}`;
};

// 检测一级导航 eg: /task /
export const checkTopNav = route => route.path.match(/^\/(\w+)$/); 

// 检测二级导航 eg: /task/my
export const check2ndNav = route => route.path.match(/^(\/\w+){2}$/); 

// 获取当前一级导航下的二级导航
export const get2ndNavs = (curRoute, routes) => {
  let result = true;
  const isHome = curRoute.path === '/';

  if (checkTopNav(curRoute)) {
    result = routes.filter(route => {
      let ok = false;
      if (check2ndNav(route)) {
        ok = route.path.indexOf(curRoute.path) === 0;
      }
      return ok;
    });
  } else if (isHome) { // home
    result = [];
  } else { // not top nav
    result = false;  
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
    breads.unshift({name: 'home', text: '首页'});
  } else {
    breads = [];
  }

  return breads;
};

export const renameField = (arr, oldName, newName) => {
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
  const callback = function (res) {
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
// eg: userNickName -> nick_name
export const renameKeys = (obj, prefix) => {
  const delPrefix = (str) => {
    if (prefix) {
      const re = new RegExp(`^${prefix}`, 'i');
      str = str.replace(re, '');
    }
    return str;
  };
  const toDash = (str) => {
    const re = /([^_-])([A-Z])/g;
    return str.replace(re, '$1_$2').toLowerCase();
  };

  const ret = {};
  P.eachKey(obj, (val, key) => {
    const newKey = toDash(delPrefix(key));
    ret[newKey] = val;
  });

  return ret;
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
  renameKeys
};

export default common;
Object.assign(window.P, common, {common});
