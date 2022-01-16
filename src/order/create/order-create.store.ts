import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface Order {
  id?: number;
  userId?: number;
  status?: string;
  payment?: string;
  productId?: number;
  totalAmount?: string;
}

export interface OrderCreateStoreState {
  subscriptionOrder: {
    [subscriptionType: string]: Order;
  } | null;
  licenseOrder: Order | null;
  licenseOrderResourceId: number | null;
  loading: boolean;
}

export interface CreateOrderOptions {
  data?: null;
}

export const orderCreateStoreModule: Module<
  OrderCreateStoreState,
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
    subscriptionOrder: null,
    licenseOrder: null,
    licenseOrderResourceId: null,
    loading: false,
  } as OrderCreateStoreState,

  /**
   * 获取器
   */
  getters: {
    subscriptionOrder(state) {
      return state.subscriptionOrder;
    },

    licenseOrder(state) {
      return state.licenseOrder;
    },

    licenseOrderResourceId(state) {
      return state.licenseOrderResourceId;
    },

    loading(state) {
      return state.loading;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setSubscriptionOrder(state, data) {
      state.subscriptionOrder = data;
    },

    setLicenseOrder(state, data) {
      state.licenseOrder = data;
    },

    setLicenseOrderResourceId(state, data) {
      state.licenseOrderResourceId = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async createOrder({ commit }, options: CreateOrderOptions = {}) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.post(`/orders`);
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
