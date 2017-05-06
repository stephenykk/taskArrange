import Hello from '@/components/Hello';
import Home from '@/views/home';
import Login from '@/views/home/login';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: {
      text: '首页'
    }
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      text: '登录'
    }
  },
  {
    name: 'task',
    path: '/task',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/task'));
      }, 'task');
    },
    meta: {
      text: '任务分派'
    }
  },
  {
    name: 'taskList',
    path: '/task/list',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/task'));
      }, 'task');
    },
    meta: {
      text: '任务管理'
    }
  },
  {
    name: 'taskCreate',
    path: '/task/create',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/task/create'));
      }, 'task');
    },
    meta: {
      text: '新建任务'
    }
  },
  {
    name: 'taskMy',
    path: '/task/my',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/task/my'));
      }, 'task');
    },
    meta: {
      text: '我的任务'
    }
  },
  {
    name: 'apply',
    path: '/apply',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/apply'));
      }, 'apply');
    },
    meta: {
      text: '故障申报'
    }
  },
  {
    name: 'applyList',
    path: '/apply/list',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/apply'));
      }, 'apply');
    },
    meta: {
      text: '故障管理'
    }
  },
  {
    name: 'sign',
    path: '/sign',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/sign'));
      }, 'sign');
    },
    meta: {
      text: '每日签到'
    }
  },
  {
    name: 'signList',
    path: '/sign/list',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/sign'));
      }, 'sign');
    },
    meta: {
      text: '签到管理'
    }
  },
  {
    name: 'user',
    path: '/user',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/user'));
      }, 'user');
    },
    meta: {
      text: '个人中心'
    }
  },
  {
    name: 'userInfo',
    path: '/user/info',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/user'));
      }, 'user');
    },
    meta: {
      text: '用户信息'
    }
  },
  {
    name: 'stat',
    path: '/stat',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/stat'));
      }, 'stat');
    },
    meta: {
      text: '统计汇总'
    }
  },
  {
    name: 'statList',
    path: '/stat/list',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/stat'));
      }, 'stat');
    },
    meta: {
      text: '统计管理'
    }
  },
  {
    name: 'admin',
    path: '/admin',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/admin/users'));
      }, 'admin');
    },
    meta: {
      text: '后台管理'
    }
  },
  {
    name: 'adminUsers',
    path: '/admin/users',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/admin/users'));
      }, 'amdin');
    },
    meta: {
      text: '用户管理'
    }
  },
  {
    name: 'adminDeps',
    path: '/admin/deps',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/admin/deps'));
      }, 'admin');
    },
    meta: {
      text: '部门管理'
    }
  },
  {
    name: 'adminRoles',
    path: '/admin/roles',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/admin/roles'));
      }, 'admin');
    },
    meta: {
      text: '角色管理'
    }
  },
  {
    name: 'Hello-Test',
    path: '/hello',
    component: Hello,
    meta: {
      text: 'hello-world'
    }
  }
];

export default routes;