import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';
import { USERS_PER_PAGE } from '@/app/app.config';

export interface UserListItem {
  user: {
    id: number;
    name: string;
    avatar: number | null;
  };
  subscription: {
    type: string;
    status: string;
  } | null;
  postAmount: number;
  commentAmount: number;
  status: string;
}

export type Users = Array<UserListItem>;

export interface UserBanStoreState {
  users: Users;
  nextPage: number;
  totalPages: number;
  loading: false;
}

export const userBanStoreModule: Module<UserBanStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    users: [],
    nextPage: 1,
    totalPages: 1,
    loading: false,
  } as UserBanStoreState,

  /**
   * 获取器
   */
  getters: {
    users(state) {
      return state.users;
    },

    nextPage(state) {
      return state.nextPage;
    },

    totalPages(state) {
      return state.totalPages;
    },

    loading(state) {
      return state.loading;
    },

    hasMore(state) {
      return state.totalPages - state.nextPage >= 0;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setUsers(state, data) {
      state.users = data;
    },

    setNextPage(state, data) {
      if (data) {
        state.nextPage = data;
      } else {
        state.nextPage++;
      }
    },

    setTotalPages(state, data) {
      state.totalPages = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getUsers({ commit, dispatch, state }) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(
          `/users?page=${state.nextPage}`,
        );

        dispatch('getUsersProcess', response.data);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    async getUsersProcess({ commit, state }, response) {
      // 根据页数来分配请求
      if (state.nextPage === 1) {
        commit('setUsers', response);
      } else {
        commit('setUsers', [...state.users, ...response]);
      }

      commit('setLoading', false);

      // 从响应头部拿到整个订单数量
      const total =
        response.headers['X-Total-Count'] || response.headers['x-total-count'];

      // 计算出订单总页数,并向上取整
      const totalPages = Math.ceil(total / USERS_PER_PAGE);

      commit('setTotalPages', totalPages);

      commit('setNextPage');
    },
  },

  /**
   * 模块
   */
  modules: {},
};
