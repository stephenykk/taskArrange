/*
const P = {
  //...
}
window.P = P;
export default P;

这里使用 export default 或者 module.exports 都有问题
基本上这里就不支持commonJs
无奈只能这样定义了...
*/

const P = {};

/*-------------
  @shim
---------------*/
const shims = () => {
  const arrProto = Array.prototype;
  const strProto = String.prototype;

  if (!arrProto.includes) {
    arrProto.includes = function (item) {
      return this.indexOf(item) > -1;
    };
  }

  if (!strProto.includes) {
    strProto.includes = function (str) {
      return this.indexOf(str) > -1;
    };
    strProto.trim = function () {
      return this.replace(/^\s*|\s*$/g, '');
    };
  }
};
shims();


/*-------------
  @log
---------------*/
export const print = (type) => {
  const prefix = `[${type}]: `;
  return (...args) => {
    args.unshift(prefix);
    console[type](...args);
  };
};

export const vlog = (data) => {
  console.log(JSON.parse(JSON.stringify(data)));
};
export const log = print('log');
export const warn = print('warn');
export const error = print('error');

/*-------------
  @str
---------------*/
export const capitalize = (str) => {
  if (typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const camelize = (str) => {
  if (typeof str !== 'string') {
    return '';
  }
  return str.replace(/-(\w)/g, (m, c) => c.toUpperCase());
};

export const trim = str => str.replace(/^\s*|\s*$/g, '');

/*-------------
  @type
---------------*/
let types = (() => {
  const tArr = ['string', 'number', 'boolean', 'object', 'function', 'array'];
  const fns = {};
  tArr.forEach(type => {
    fns[`is${capitalize(type)}`] = arg => Object.prototype.toString.call(arg).slice(8, -1).toLowerCase() === type;
  });
  return fns;
})();

types = {
  ...types,
  isPlainObject: obj => obj && obj.constructor === Object,
  isUndefined: val => typeof val === 'undefined',
  isNull: val => val === null,
  isNil: val => types.isUndefined(val) || types.isNull(val)
};

export const isString = types.isString;
export const isNumber = types.isNumber;
export const isBoolean = types.isBoolean;
export const isObject = types.isObject;
export const isArray = types.isArray;
export const isFunction = types.isFunction;
export const isPlainObject = types.isPlainObject;
export const isUndefined = types.isUndefined;
export const isNull = types.isNull;
export const isNil = types.isNil;

/*-------------
  @obj
---------------*/
export const eachKey = (obj, fn) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn(obj[key], key, obj);
    }
  }
};

export const mapKey = (obj, fn) => {
  const arr = [];
  eachKey(obj, (...args) => {
    arr.push(fn(...args));
  });
  return arr;
};

export const filterKey = (obj, fn) => {
  const ret = {};
  eachKey(obj, (val, key, obj) => {
    if (fn(val, key, obj)) {
      ret[key] = val;
    }
  });
  return ret;
};

export const pluck = (obj, keys) => filterKey(obj, (val, key) => keys.includes(key));

const merge = function merge(obj1, obj2) {
  if (!(isPlainObject(obj1) && isPlainObject(obj2))) {
    warn('need both params to be plain object..');
    return obj1 || {};
  }

  eachKey(obj2, (val, key) => {
    if (isPlainObject(val) && isPlainObject(obj1[key])) {
      merge(obj1[key], val);
    } else {
      obj1[key] = val;
    }
  });

  return obj1;
};


// deep clone
export const extend = (...objs) => {
  let dest, src;
  if (objs.length < 2) {
    dest = P;
    src = objs[0] || {};
    objs = [dest, src];
  }

  return objs.reduce((dest, src) => merge(dest, src));
};

// set defaults
export const defaults = (dest, src) => {
  eachKey(src, (val, key) => {
    if (isNil(dest[key])) {
      dest[key] = val;
    }
  });
  return dest;
};

// remove null or undefined keys
export const compact = (obj) => {
  eachKey(obj, (val, key) => {
    if (val == null) {
      delete obj[key];
    }
  });
  return obj;
};

/*-------------
  @url
---------------*/
export const url = {
  parse: (url) => {
    const matched = url.match(/\?+(.*)$/);
    const qs = matched && matched[1] ? matched[1] : {};
    const query = {};
    const re = /([^?=]+?)=([^&]*)(?:&|$)/g;

    let m = re.exec(qs);
    while (m) {
      const [, key, val] = m;
      query[key] = val;
      m = re.exec(qs);
    }
    
    return query;
  },
  stringify: (params) => {
    const arr = [];
    eachKey(params, (val, key) => arr.push(`${key}=${val}`));
    return arr.join('&');
  }
};

/*-----------
 @date
--------------*/
export const formatDatetime = (dt) => {
  dt = dt || new Date();
  let dparts = [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()];
  let tparts = [dt.getHours(), dt.getMinutes(), dt.getSeconds()];
  const d2 = n => (String(n).length > 1 ? n : `000${n}`.slice(-2));
  dparts = dparts.map(part => d2(part)).join('-');
  tparts = tparts.map(part => d2(part)).join(':');

  return `${dparts} ${tparts}`;
};

const fns = (() => {
  const str = {
    trim,
    capitalize,
    camelize
  };
  const logs = {
    vlog,
    log,
    warn,
    error
  };
  const obj = {
    eachKey,
    mapKey,
    filterKey,
    defaults,
    pluck,
    compact
  };
  const date = {
    formatDatetime
  };

  return {
    logs,
    str,
    obj,
    url,
    date,
    types
  };
})();

eachKey(fns, (cateFns, key) => {
  if (key === 'url') {
    P.url = url;
  } else {
    extend(cateFns);
  }
});

P.fns = fns;
window.P = P;
