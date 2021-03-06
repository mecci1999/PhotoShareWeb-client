import { createRouter, createWebHistory } from 'vue-router';
import appRoutes from './app.routes';
import postRoutes from '@/post/post.routes';
import authRoutes from '@/auth/auth.routes';
import userRoutes from '@/user/user.routes';
import manageRoutes from '@/manage/manage.routes';
import dashboardRoutes from '@/dashboard/dashboard.routes';
import weixinRoutes from '@/weixin/weixin.routes';
import subscriptionRoutes from '@/subscription/subscription.routes';
import licenseRoutes from '@/license/license.routes';
import orderRoutes from '@/order/order.routes';
import rechargeRoutes from '@/recharge/recharge.routes';
import { appToolbarItemGuard, authGuard } from './app.router.guard';

/**
 * 创建路由器
 */
const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...appRoutes,
    ...postRoutes,
    ...authRoutes,
    ...userRoutes,
    ...manageRoutes,
    ...dashboardRoutes,
    ...weixinRoutes,
    ...subscriptionRoutes,
    ...licenseRoutes,
    ...orderRoutes,
    ...rechargeRoutes,
  ],
});

/**
 * 工具栏项目路由守卫
 */
router.beforeEach(appToolbarItemGuard);

/**
 * 验证身份路由守卫
 */
router.beforeEach(authGuard);

/**
 * 默认导出
 */
export default router;
