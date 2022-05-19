import { RouteRecordRaw } from 'vue-router';
import Dashboard from '@/dashboard/dashboard.vue';
import DashboardAdmin from './admin/dashboard-admin.vue';
import DashboardUser from './user/dashboard-user.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
    meta: {
      requireAuth: true,
    },
    props: true,
    children: [
      {
        name: 'dashboardAccessCount',
        path: '',
        component: DashboardUser,
      },
    ],
  },
  {
    name: 'dashboardAdmin',
    path: '/dashboard/admin',
    component: DashboardAdmin,
    props: true,
    meta: {
      requireAuth: true,
      authManagerGuard: true,
    },
  },
];

/**
 * 默认导出
 */
export default routes;
