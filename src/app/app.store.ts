import { createStore } from 'vuex';
import { authStoreModule, AuthStoreState } from '../auth/auth.store';
import {
  commentStoreModule,
  CommentStoreState,
} from '../comment/comment.store';
import { fileStoreModule, FileStoreState } from '../file/file.store';
import { postStoreModule, PostStoreState } from '../post/post.store';
import { userStoreModule, UserStoreState } from '../user/user.store';
import { LocalStorageStroePlugin } from './app.store.plugin';
import { layoutStoreModule, LayoutStoreState } from './layout/layout.store';
import {
  appNotificationStoreModule,
  AppNotificationStoreState,
} from './notification/app-notification.store';
import {
  appToolbarStoreModule,
  AppToolbarStoreState,
} from './toolbar/app-toolbar.store';

export interface RootState {
  appName: string;
  post: PostStoreState;
  layout: LayoutStoreState;
  auth: AuthStoreState;
  notification: AppNotificationStoreState;
  user: UserStoreState;
  toolbar: AppToolbarStoreState;
  file: FileStoreState;
  comment: CommentStoreState;
}

/**
 * 创建 Store
 */
const store = createStore({
  state: {
    appName: '宁皓网',
  } as RootState,

  modules: {
    post: postStoreModule,
    layout: layoutStoreModule,
    auth: authStoreModule,
    notification: appNotificationStoreModule,
    user: userStoreModule,
    toolbar: appToolbarStoreModule,
    file: fileStoreModule,
    comment: commentStoreModule,
  },

  plugins: [LocalStorageStroePlugin],
});

/**
 * 默认导出
 */
export default store;
