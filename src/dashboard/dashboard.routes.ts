import { RouteRecordRaw } from 'vue-router';
import Dashboard from '@/dashboard/dashboard.vue';
import DashboardAccessCount from './access-count/dashboard-access-count.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'doshboard',
    path: '/dashboard',
    component: Dashboard,
    props: true,
    children: [
      {
        name: 'dashboard-access-count',
        path: '',
        component: DashboardAccessCount,
      },
    ],
  },
];

/**
 * 默认导出
 */
export default routes;
