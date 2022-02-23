import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface OrderListItem {
  data: null;
}

export type Orders = Array<OrderListItem>;

export interface OrderIndexStoreState {
  nextPage: number;
  totalPages: number;
  dateTimeRange: string;
  queryString: string;
  filter: string;
  orderCount: string;
  loading: boolean;
  orders: Orders | null;
}

export interface GetOrdersOptions {
  data?: null;
}

export const orderIndexStoreModule: Module<OrderIndexStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    nextPage: 1,
    totalPages: 1,
    dateTimeRange: '',
    queryString: '',
    filter: '',
    orderCount: '',
    loading: false,
    orders: null,
  } as OrderIndexStoreState,

  /**
   * 获取器
   */
  getters: {
    nextPage(state) {
      return state.nextPage;
    },

    totalPages(state) {
      return state.totalPages;
    },

    dateTimeRange(state) {
      return state.dateTimeRange;
    },

    queryString(state) {
      return state.queryString;
    },

    filter(state) {
      return state.filter;
    },

    orderCount(state) {
      return state.orderCount;
    },

    loading(state) {
      return state.loading;
    },

    orders(state) {
      return state.orders;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setNextPage(state, data) {
      state.nextPage = data;
    },

    setTotalPages(state, data) {
      state.totalPages = data;
    },

    setDateTimeRange(state, data) {
      state.dateTimeRange = data;
    },

    setQueryString(state, data) {
      state.queryString = data;
    },

    setFilter(state, data) {
      state.filter = data;
    },

    setOrderCount(state, data) {
      state.orderCount = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },

    setOrders(state, data) {
      state.orders = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getOrders({ commit, dispatch }, options: GetOrdersOptions = {}) {
      dispatch('getOrdersPreProcess', options);

      try {
        const response = await apiHttpClient.get(`resources`);

        dispatch('getOrdersPostProcess', response);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    async getOrdersPreProcess({ commit }, options: GetOrdersOptions = {}) {
      commit('setLoading', true);
    },

    async getOrdersPostProcess({ commit }, response) {
      commit('setLoading', false);
      commit('setOrders', response.data);
    },
  },

  /**
   * 模块
   */
  modules: {},
};
