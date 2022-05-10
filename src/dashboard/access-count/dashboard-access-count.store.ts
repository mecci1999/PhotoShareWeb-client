import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient, queryStringProcess } from '@/app/app.service';

export interface AccessCountListItem {
  action: string;
  title: string;
  value: number;
}

export interface ResultType {
  data: {
    title?: string;
    icon?: string;
    value?: number;
    sumCount?: number;
  };
}

// 定义后端响应数据类型
export type ResponseType = Array<ResultType>;

export interface AccessCount {
  title: string;
  action: string;
  dateset: [Array<string>, Array<number>];
}

export interface DashboardAccessCountStoreState {
  currentAction: string;
  dateTimeRange: string;
  currentRange: string;
  accessCount: AccessCount | null;
  accessCountList: Array<AccessCountListItem>;
  adminDataList: ResponseType;
  loading: boolean;
}

export interface GetAccessCountsOptions {
  dateTimeRange?: string;
  range?: string;
}

export interface GetAccessCountByActionOptions {
  dateTimeRange?: string;
  action?: string;
  range?: string;
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
    currentRange: 'global',
    accessCount: null,
    accessCountList: [],
    adminDataList: [],
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

    currentRange(state) {
      return state.currentRange;
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

    adminDataList(state) {
      return state.adminDataList;
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

    setCurrentRange(state, data) {
      state.currentRange = data;
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

      if (state.accessCount && state.accessCount.action === data) {
        const [datetimeArray, valueArray] = state.accessCount.dateset;

        valueArray[valueArray.length - 1]++;

        state.accessCount = {
          ...state.accessCount,
          dateset: [datetimeArray, valueArray],
        };
      }
    },

    setAdminDataList(state, data) {
      state.adminDataList = data;
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

    // 获取不同范围下的访问次数
    async getAdminDataByRange(
      { commit },
      options: GetAccessCountsOptions = {},
    ) {
      // 改变loading
      commit('setLoading', true);

      // 处理请求接口查询符
      const { dateTimeRange = '1-year', range = 'global' } = options;
      const getAccessCountsQueryStringOnlyDate = queryStringProcess({
        dateTimeRange,
      });
      const getAccessCountsQueryString = queryStringProcess({
        dateTimeRange,
        range,
      });

      // 向后端发送请求，得到数据
      try {
        // 拿到不同range下的数据
        const adminData = await apiHttpClient.get(
          `dashboard/admin/access-counts?${getAccessCountsQueryString}`,
        );

        // 如果range为全站，需要将收益push到数组中
        if (range === 'global') {
          const incomeData = await apiHttpClient.get(
            `dashboard/admin/income?${getAccessCountsQueryStringOnlyDate}`,
          );

          const result = adminData.data as ResponseType;
          result.push(incomeData.data);
          commit('setLoading', false);
          commit('setAdminDataList', result);
        } else {
          commit('setLoading', false);
          commit('setAdminDataList', adminData.data);
        }
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
