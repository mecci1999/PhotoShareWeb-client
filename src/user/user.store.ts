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

export interface UserStoreState {
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
    useAdmin: false,
    currentUser: null,
  } as UserStoreState,

  /**
   * 获取器
   */
  getters: {
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
  },

  /**
   * 修改器
   */
  mutations: {
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
    async getCurrentUser({ commit, dispatch }, userId) {
      try {
        const response = await dispatch('user/show/getUserById', userId, {
          root: true,
        });

        commit('setCurrentUser', response.data);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        throw _error.response;
      }
    },
  },

  modules: {
    show: userShowStoreModule,
    account: userAccountStoreModule,
  },
};
