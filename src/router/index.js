/**
 * 路由配置
 */
import {createRouter, createWebHistory,createWebHashHistory} from 'vue-router';
import store from "@/store";
import setting from '@/config/setting';

import NProgress from 'nprogress';

// 静态路由
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    meta: {title: '登录'}
  },
  {
    path: '/file',
    component: () => import('@/views/tms/file/file'),
    meta: {title: '文件查询'}
  },
  {
    path: '/audit',
    component: () => import('@/views/tms/audit/auditService'),
    meta: {title: '审核管理'}
  },
  {
    path: '/stuRegister',
    component: () => import('@/views/login/stuRegister'),
    meta: {title: '学生注册'}
  },

  {
    path: '/forget',
    component: () => import('@/views/login/forget'),
    meta: {title: '忘记密码'}
  },
  {
    path: '/decache',
    component: () => import('@/views/login/decache'),
    meta: {title: '忘记密码'}
  },

  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/exception/404')
  },
  // {
  //   path: '/ams/awardEntity/audit',
  //   component:()=>import('@/views/ams/awardEntity/audit'),
  //   meta: {title: '获奖信息审核管理'}
  // },
  // {
  //   path: '/User_instructions',
  //   component:()=>import('@/views/ams/awardEntity/User_instructions'),
  //   meta: {title: '使用须知'}
  // },
  {
    path: '/bms/rewardEntity/Reward',
    component:()=>import('@/views/bms/rewardEntity/reward'),
    meta: {title: '学生获奖管理'}
  },
  {
    path: '/audit_appraising',
    component:()=>import('@/views/ams/appraisingEntity/appraising/audit_appraising'),
    meta: {title: '学生获奖管理'}
  },
];

const router = createRouter({
  routes,
  // history: createWebHistory()
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
});

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  updateTitle(to);

  if(to.path === '/decache')
  {
    store.dispatch('user/setUser').then(() => {
    });
    store.dispatch('user/setToken').then(() => {
    });
    next();  // 在无需登录的白名单内
  }
  else if (setting.takeToken()) {
    //判断是否已经注册动态路由
    if (!store.state.user.menus) {
      // debugger
      // 获取动态路由
      const  user = setting.takeUser();
      if(user)
      {
        store.dispatch('user/getMenus',user)
        next({...to, replace: true});
      }
      else
      {
        store.dispatch('user/getUser').then(() => {
          store.dispatch('user/getMenus',user)
          next({...to, replace: true});
        })
      }
    } else {
      next();
    }
  } else if (setting.whiteList.indexOf(to.path) !== -1) {
    next();  // 在无需登录的白名单内
  } else {
    // 未登录跳转登录页面
    next({path: '/login', query: to.path === '/' ? {} : {from: to.path}});
  }
});

router.afterEach(() => {
  setTimeout(() => {
    NProgress.done(true);
  }, 300);
});

export default router;

/**
 * 更新浏览器标题
 * @param route 路由
 */
function updateTitle(route) {
  let names = [];
  if (route && route.meta && route.meta.title) {
    names.push(route.meta.title);
  }
  const appName = process.env.VUE_APP_NAME;
  if (appName) {
    names.push(appName);
  }
  document.title = names.join(' - ');
}
