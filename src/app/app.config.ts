/**
 * 应用名字
 */
export const APP_NAME = process.env.VUE_APP_APP_NAME;

/**
 * 服务接口基本地址
 */
export const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

/**
 * 内容分页
 */
export const POSTS_PER_PAGE = parseInt(process.env.VUE_APP_POSTS_PER_PAGE, 10);

/**
 * 评论分页
 */
export const COMMENTS_PER_PAGE = parseInt(
  process.env.VUE_APP_COMMENTS_PER_PAGE,
  10,
);

/**
 * 订阅
 */
export const STANDARD_SUBSCRIPTION_COLOR =
  process.env.VUE_APP_STANDARD_SUBSCRIPTION_COLOR || '#43a047';
export const PRO_SUBSCRIPTION_COLOR =
  process.env.VUE_APP_PRO_SUBSCRIPTION_COLOR || '#6e64ef';

/**
 * 许可
 */
export const LICENSES_PER_PAGE = parseInt(
  process.env.VUE_APP_LICENSES_PER_PAGE,
  10,
);

/**
 * 订单
 */
export const ORDERS_PER_PAGE = parseInt(
  process.env.VUE_APP_ORDERS_PER_PAGE,
  10,
);

/**
 * 用户
 */
export const USERS_PER_PAGE = parseInt(process.env.VUE_APP_USERS_PER_PAGE, 10);
