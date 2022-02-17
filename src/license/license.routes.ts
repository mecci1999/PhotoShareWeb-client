import { RouteRecordRaw } from 'vue-router';
import LicenseIndex from './index/license-index.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'licenseIndex',
    path: '/licenses',
    component: LicenseIndex,
    props: true,
  },
];

/**
 * 默认导出
 */
export default routes;
