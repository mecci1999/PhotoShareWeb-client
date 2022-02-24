import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient, queryStringProcess } from '@/app/app.service';
import { ORDERS_PER_PAGE } from '../../app/app.config';

export interface OrderListItem {
  id: number;
  payment: string;
  totalAmount: string;
  status: string;
  created: string;
  updated: string;
  user: {
    id: number;
    name: string;
    avatar: number | null;
    subscription: { type: string; status: string } | null;
  };
  product: {
    id: number;
    meta: any;
    type: string;
    title: string;
  };
}

export type Orders = Array<OrderListItem>;

export interface OrderIndexStoreState {
  nextPage: number;
  totalPages: number;
  dateTimeRange: string;
  queryString: string;
  filter: { [name: string]: string } | null;
  ordersCount: {
    count: number;
    totalAmount: string;
  } | null;
  loading: boolean;
  orders: Orders;
}

export interface GetOrdersOptions {
  filter?: { [name: string]: string };
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
    filter: null,
    ordersCount: null,
    loading: false,
    orders: [],
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

    ordersCount(state) {
      return state.ordersCount;
    },

    loading(state) {
      return state.loading;
    },

    orders(state) {
      return state.orders;
    },

    hasMore(state) {
      return state.totalPages - state.nextPage >= 0;
    },
  },

  /**
   * 修改器
   */
  mutations: {
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

    setDateTimeRange(state, data) {
      state.dateTimeRange = data;
    },

    setQueryString(state, data) {
      state.queryString = data;
    },

    setFilter(state, data) {
      state.filter = data;
    },

    setOrdersCount(state, data) {
      state.ordersCount = data;
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
    async getOrders(
      { commit, dispatch, state },
      options: GetOrdersOptions = {},
    ) {
      const getOrdersQueryString = await dispatch(
        'getOrdersPreProcess',
        options,
      );

      try {
        const response = await apiHttpClient.get(
          `orders?page=${state.nextPage}&${getOrdersQueryString}`,
        );

        dispatch('getOrdersPostProcess', response);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    async getOrdersPreProcess(
      { commit, state },
      options: GetOrdersOptions = {},
    ) {
      commit('setLoading', true);

      commit('setFilter', options.filter);

      const getOrdersQueryString = queryStringProcess({ ...state.filter });

      if (state.queryString !== getOrdersQueryString) {
        commit('setNextPage', 1);
      }

      // 赋值给查询符
      commit('setQueryString', getOrdersQueryString);

      // return quertString
      return getOrdersQueryString;
    },

    async getOrdersPostProcess({ commit, state }, response) {
      // 需要解构data中的页数数据
      const {
        data: { orders, ordersCount },
      } = response;

      // 根据页数来分配请求
      if (state.nextPage === 1) {
        commit('setOrders', orders);
      } else {
        commit('setOrders', [...state.orders, ...orders]);
      }

      commit('setOrdersCount', ordersCount);

      commit('setLoading', false);

      // 从响应头部拿到整个订单数量
      const total =
        response.headers['X-Total-Count'] || response.headers['x-total-count'];

      // 计算出订单总页数,并向上取整
      const totalPages = Math.ceil(total / ORDERS_PER_PAGE);

      commit('setTotalPages', totalPages);

      commit('setNextPage');
    },
  },

  /**
   * 模块
   */
  modules: {},
};
