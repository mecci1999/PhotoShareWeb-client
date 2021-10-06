import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient, queryStringProcess } from '@/app/app.service';

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
  dataTimeRange?: string;
}

export interface GetAccessCountByActionOptions {
  dataTimeRange?: string;
  action?: string;
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

    // 实时更新访问次数
    increaseAccessCount(state, data) {
      state.accessCountList = state.accessCountList.map(accessCount => {
        if (accessCount.action === data) {
          accessCount.value++;
        }

        return accessCount;
      });
    },
  },

  /**
   * 动作
   */
  actions: {
    // 获得访问次数列表
    async getAccessCounts({ commit }, options: GetAccessCountsOptions = {}) {
      commit('setLoading', true);

      const { dataTimeRange = '1-day' } = options;
      const getAccessCountsQueryString = queryStringProcess({ dataTimeRange });

      try {
        const response = await apiHttpClient.get(
          `dashboard/access-counts?${getAccessCountsQueryString}`,
        );

        commit('setLoading', false);
        commit('setAccessCountList', response.data);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    // 按动作分时段的访问次数
    async getAccessCountByAction(
      { commit },
      options: GetAccessCountByActionOptions = {},
    ) {
      commit('setLoading', true);

      const { dataTimeRange = '1-day', action } = options;
      const getAccessCountByActionQueryString = queryStringProcess({
        dataTimeRange,
      });

      try {
        const response = await apiHttpClient.get(
          `dashboard/access-counts/${action}?${getAccessCountByActionQueryString}`,
        );

        commit('setLoading', false);
        commit('setAccessCount', response.data);

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
