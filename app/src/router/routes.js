import Hello from '@/components/Hello';
import Home from '@/views/home';
import Login from '@/views/home/Login';

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
        resolve(require('@/views/task/TaskEdit'));
      }, 'task');
    },
    meta: {
      text: '新建任务'
    }
  },
  {
    name: 'taskEdit',
    path: '/task/edit/:id',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/task/TaskEdit'));
      }, 'task');
    },
    meta: {
      text: '编辑任务',
      hide: true
    }
  },
  {
    name: 'taskMy',
    path: '/task/my',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/task/My'));
      }, 'task');
    },
    meta: {
      text: '我的任务'
    }
  },
  {
    name: 'userTask',
    path: '/user/task',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/task/My'));
      }, 'task');
    },
    meta: {
      text: '我的任务'
    }
  },
  {
    name: 'apply',
    path: '/apply', // applyCreate
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
    name: 'applyEdit',
    path: '/apply/edit/:id',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/apply'));
      }, 'apply');
    },
    meta: {
      text: '故障编辑',
      hide: true
    }
  },
  {
    name: 'applyCreate',
    path: '/apply/create',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/apply'));
      }, 'apply');
    },
    meta: {
      text: '故障填写'
    }
  },
  {
    name: 'applyList',
    path: '/apply/list',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/apply/List'));
      }, 'apply');
    },
    meta: {
      text: '故障管理'
    }
  },
  {
    name: 'applyMy',
    path: '/apply/my',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/apply/My'));
      }, 'apply');
    },
    meta: {
      text: '我的故障'
    }
  },
  {
    name: 'userApply',
    path: '/user/apply',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/apply/My'));
      }, 'apply');
    },
    meta: {
      text: '我的故障'
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
    name: 'signDuty',
    path: '/sign/duty',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/sign'));
      }, 'sign');
    },
    meta: {
      text: '考勤打卡'
    }
  },
  {
    name: 'signList',
    path: '/sign/list',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/sign/List'));
      }, 'sign');
    },
    meta: {
      text: '我的签到'
    }
  },
  {
    name: 'userSign',
    path: '/user/sign',
    component(resolve) {
      require.ensure([], () => {
        resolve(require('@/views/sign/List'));
      }, 'sign');
    },
    meta: {
      text: '我的签到'
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
      text: '我的信息',
      order: 0
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