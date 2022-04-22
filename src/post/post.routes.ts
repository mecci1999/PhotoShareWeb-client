import { RouteRecordRaw } from 'vue-router';
import PostIndex from './index/post-index.vue';
import PostShow from './show/post-show.vue';
import PostCreate from '@/post/create/post-create.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'postIndex',
    path: '/posts',
    component: PostIndex,
    props: route => {
      return {
        sort: 'latest',
        filter: route.query,
      };
    },
  },
  {
    name: 'postShow',
    path: '/posts/:postId',
    component: PostShow,
    props: true,
  },
  {
    name: 'postIndexPopular',
    path: '/popular',
    component: PostIndex,
    props: route => {
      return {
        sort: 'mostComment',
        filter: route.query,
      };
    },
  },
  {
    name: 'postCreate',
    path: '/create',
    component: PostCreate,
    meta: {
      requireAuth: true,
    },
  },
];

/**
 * 默认导出
 */
export default routes;
