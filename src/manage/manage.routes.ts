import { RouteRecordRaw } from 'vue-router';
import Manage from './manage.vue';
import ManagePost from './post/manage-post.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'manage',
    path: '/manage',
    component: Manage,
    props: true,
    children: [
      {
        name: 'managePost',
        path: 'post',
        component: ManagePost,
      },
    ],
  },
];

/**
 * 默认导出
 */
export default routes;
