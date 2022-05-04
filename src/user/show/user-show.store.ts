import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface User {
  id: number;
  name: string;
  avatar: number | null;
  subscription: {
    type: string;
    status: string;
  } | null;
  amount: string;
  status: string;
}

export interface UserShowStoreState {
  touchdown: boolean;
  loading: boolean;
  user: User | null;
}

export const userShowStoreModule: Module<UserShowStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    touchdown: false,
    loading: false,
    user: null,
  } as UserShowStoreState,

  /**
   * 获取器
   */
  getters: {
    touchdown(state) {
      return state.touchdown;
    },

    loading(state) {
      return state.loading;
    },

    user(state) {
      return state.user;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setTouchdown(state, data) {
      state.touchdown = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },

    setUser(state, data) {
      state.user = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getUserById({ commit }, userId) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`/users/${userId}`);
        commit('setUser', response.data);
        commit('setLoading', false);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;
        commit('setLoading', false);

        throw _error.response;
      }
    },
  },
};
