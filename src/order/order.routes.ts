import { RouteRecordRaw } from 'vue-router';
import OrderIndex from '@/order/index/order-index.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'orderIndex',
    path: '/orders',
    component: OrderIndex,
    props: route => {
      return {
        filter: route.query,
      };
    },
  },
];

/**
 * 默认导出
 */
export default routes;
