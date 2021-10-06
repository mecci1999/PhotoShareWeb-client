import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface AccessCountListItem {
  action: string;
  title: string;
  value: number;
}

export interface AccessCount {
  title: string;
  action: string;
  dataset: [Array<string>, Array<number>];
}

export interface DashboardAccessCountStoreState {
  accessCount: AccessCount | null;
  accessCountList: Array<AccessCountListItem>;
  loading: boolean;
}

export interface GetAccessCountsOptions {
  data?: null;
}

export const dashboardAccessCountStoreModule: Module<
  DashboardAccessCountStoreState,
  RootState
> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    accessCount: null,
    accessCountList: [],
    loading: false,
  } as DashboardAccessCountStoreState,

  /**
   * 获取器
   */
  getters: {
    accessCount(state) {
      return state.accessCount;
    },

    accessCountList(state) {
      return state.accessCountList;
    },

    loading(state) {
      return state.loading;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setAccessCount(state, data) {
      state.accessCount = data;
    },

    setAccessCountList(state, data) {
      state.accessCountList = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getAccessCounts({ commit }, options: GetAccessCountsOptions = {}) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`resources`);
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

  /**
   * 模块
   */
  modules: {},
};
