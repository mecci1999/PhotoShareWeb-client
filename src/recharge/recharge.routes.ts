import { RouteRecordRaw } from 'vue-router';
import Recharge from './recharge.vue';
/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'recharge',
    path: '/recharge',
    component: Recharge,
    props: true,
  },
];

/**
 * 默认导出
 */
export default routes;
