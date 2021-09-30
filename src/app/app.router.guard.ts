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
      break;
  }

  appStore.commit(
    'toolbar/setShowPostListLayoutSwitcher',
    showPostListLayoutSwitcher,
  );

  appStore.commit('toolbar/setShowPostShowNavigator', showPostShowNavigator);

  appStore.commit('toolbar/setShowSideSheetItem', showSideSheetItem);

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
    } else {
      // 下一步
      next();
    }
  } else {
    // 下一步
    next();
  }
};
