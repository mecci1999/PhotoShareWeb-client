import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import {
  User,
  userShowStoreModule,
  UserShowStoreState,
} from './show/user-show.store';

import {
  userAccountStoreModule,
  UserAccountStoreState,
} from './account/user-account.store';

import {
  UserCreateStoreState,
  userCreateStoreModule,
} from '@/user/create/user-create.store';

import {
  UserBanStoreState,
  userBanStoreModule,
} from '@/user/ban/user-ban.store';

export interface UserStoreState {
  ban: UserBanStoreState;
  socketId: string;
  create: UserCreateStoreState;
  useAdmin: boolean;
  currentUser: User | null;
  show: UserShowStoreState;
  account: UserAccountStoreState;
}

export const userStoreModule: Module<UserStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    socketId: '',
    useAdmin: false,
    currentUser: null,
  } as UserStoreState,

  /**
   * 获取器
   */
  getters: {
    socketId(state) {
      return state.socketId;
    },

    useAdmin(state) {
      return state.useAdmin;
    },

    currentUser(state) {
      return state.currentUser;
    },

    // 当前用户是否为管理员
    isAdmin(state) {
      return state.currentUser && state.currentUser.id === 1;
    },

    // 是否使用管理员模式
    canUseAdmin(state) {
      return state.currentUser && state.currentUser.id === 1 && state.useAdmin;
    },

    // 判断当前用户是否含有有效订阅
    hasValidSubscription(state) {
      return (
        state.currentUser &&
        state.currentUser.subscription &&
        state.currentUser.subscription.status === 'valid'
      );
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setSocketId(state, data) {
      state.socketId = data;
    },

    setUseAdmin(state, data) {
      state.useAdmin = data;
    },

    setCurrentUser(state, data) {
      state.currentUser = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getCurrentUser({ commit, dispatch, getters }, userId) {
      try {
        const response = await dispatch('user/show/getUserById', userId, {
          root: true,
        });

        commit('setCurrentUser', response.data);

        if (getters.currentUser && getters.currentUser.status === 'banned') {
          dispatch(
            'notification/pushMessage',
            { content: '您因发布违规内容，当前账号处于封禁状态。' },
            {
              root: true,
            },
          );
        }

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        throw _error.response;
      }
    },
  },

  modules: {
    ban: userBanStoreModule,
    create: userCreateStoreModule,
    show: userShowStoreModule,
    account: userAccountStoreModule,
  },
};
