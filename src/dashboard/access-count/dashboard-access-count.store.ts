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
  dateset: [Array<string>, Array<number>];
}

export interface DashboardAccessCountStoreState {
  currentAction: string;
  dateTimeRange: string;
  accessCount: AccessCount | null;
  accessCountList: Array<AccessCountListItem>;
  loading: boolean;
}

export interface GetAccessCountsOptions {
  dateTimeRange?: string;
}

export interface GetAccessCountByActionOptions {
  dateTimeRange?: string;
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
    currentAction: 'getPosts',
    dateTimeRange: '1-day',
    accessCount: null,
    accessCountList: [],
    loading: false,
  } as DashboardAccessCountStoreState,

  /**
   * 获取器
   */
  getters: {
    currentAction(state) {
      return state.currentAction;
    },

    dateTimeRange(state) {
      return state.dateTimeRange;
    },

    accessCount(state) {
      const { accessCount } = state;

      if (accessCount) {
        const [datetimeArray] = accessCount.dateset;

        accessCount.dateset[0] = datetimeArray.map(item => item.slice(-2));
      }

      return accessCount;
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
    setCurrentAction(state, data) {
      state.currentAction = data;
    },

    setDateTimeRange(state, data) {
      state.dateTimeRange = data;
    },

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

      const { dateTimeRange = '1-day' } = options;
      const getAccessCountsQueryString = queryStringProcess({ dateTimeRange });

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

      const { dateTimeRange = '1-day', action } = options;
      const getAccessCountByActionQueryString = queryStringProcess({
        dateTimeRange,
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
