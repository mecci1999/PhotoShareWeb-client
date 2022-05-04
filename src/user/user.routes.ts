import { RouteRecordRaw } from 'vue-router';
import UserShow from './show/user-show.vue';
import UserPosts from './show/components/user-posts.vue';
import UserLiked from './show/components/user-liked.vue';
import UserComments from './show/components/user-comments.vue';
import UserReplies from './show/components/user-replies.vue';
import UserAccount from './account/user-account.vue';
import UserCreate from '@/user/create/user-create.vue';
import UserBan from '@/user/ban/index/ban-index.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'userShow',
    path: '/users/:userId',
    component: UserShow,
    props: true,
    children: [
      {
        name: 'userPosts',
        path: '',
        component: UserPosts,
        props: route => {
          return {
            sort: 'latest',
            filter: {
              user: route.params.userId,
              action: 'published',
            },
          };
        },
      },
      {
        name: 'userLiked',
        path: 'liked',
        component: UserLiked,
        props: route => {
          return {
            sort: 'latest',
            filter: {
              user: route.params.userId,
              action: 'liked',
            },
          };
        },
      },
      {
        name: 'userComments',
        path: 'comments',
        component: UserComments,
        props: route => {
          return {
            filter: {
              user: route.params.userId,
              action: 'published',
            },
          };
        },
      },
      {
        name: 'userReplies',
        path: 'replies',
        component: UserReplies,
        props: route => {
          return {
            filter: {
              user: route.params.userId,
              action: 'replied',
            },
          };
        },
      },
      {
        name: 'userAccount',
        path: 'account',
        component: UserAccount,
      },
    ],
  },
  {
    name: 'userCreate',
    path: '/register',
    component: UserCreate,
  },
  {
    name: 'userBan',
    path: '/ban',
    component: UserBan,
    meta: {
      authManagerGuard: true,
    },
  },
];

/**
 * 默认导出
 */
export default routes;
