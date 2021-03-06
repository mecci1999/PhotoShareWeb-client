import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import appStore from './app.store';

/**
 * 工具栏项目守卫
 */
export const appToolbarItemGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  let showPostListLayoutSwitcher = false;
  let showPostShowNavigator = false;
  let showSideSheetItem = false;
  let showAdminItem = false;

  switch (to.name) {
    case 'home':
    case 'postIndex':
    case 'postIndexPopular':
    case 'userPosts':
    case 'userLiked':
      showPostListLayoutSwitcher = true;
      break;
    case 'postShow':
      showPostShowNavigator = true;
      showSideSheetItem = true;
      break;
    case 'managePost':
      showSideSheetItem = true;
      showAdminItem = true;
      break;
    case 'orderIndex':
      showSideSheetItem = true;
      showAdminItem = true;
      break;
    case 'dashboardAccessCount':
      showAdminItem = true;
      break;
    case 'dashboardAdmin':
      showAdminItem = true;
      break;
  }

  appStore.commit(
    'toolbar/setShowPostListLayoutSwitcher',
    showPostListLayoutSwitcher,
  );

  appStore.commit('toolbar/setShowPostShowNavigator', showPostShowNavigator);

  appStore.commit('toolbar/setShowSideSheetItem', showSideSheetItem);

  appStore.commit('toolbar/setShowAdminItem', showAdminItem);

  // 下一步
  next();
};

/**
 * 身份验证守卫
 */
export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  // 进行判断，路由是否需要身份验证
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断当前用户是否登录
    if (!appStore.getters['auth/isLoggedIn']) {
      appStore.dispatch('notification/pushMessage', { content: '请先登录' });

      // 跳转到登录页面
      next({ name: 'login' });
    }

    // 下一步
    next();
  }

  // 进行判断是否需要验证管理员身份
  if (to.matched.some(record => record.meta.authManagerGuard)) {
    // 如果不是管理员身份，则不能访问，且页面跳转到首页
    if (!appStore.getters['user/isAdmin']) {
      appStore.dispatch('notification/pushMessage', {
        content: '抱歉，您没有权限访问！',
      });

      // 跳转到首页面
      next({ name: 'home' });
    }

    // 下一步
    next();
  }

  // 下一步
  next();
};
