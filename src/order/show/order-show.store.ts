import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface OrderShowStoreState {
  loading: boolean;
}

export interface GetOrderLicenseItemOptions {
  orderId: number;
}

export interface GetOrderSubscriptionItemOptions {
  orderId: number;
  type: string;
}

export const orderShowStoreModule: Module<OrderShowStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
  } as OrderShowStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    // 获得许可订单列表动作
    async getOrderLicenseItem({ commit }, options: GetOrderLicenseItemOptions) {
      commit('setLoading', true);

      // 获得订单 ID
      const { orderId } = options;

      try {
        const response = await apiHttpClient.get(
          `orders/${orderId}/license-item`,
        );
        commit('setLoading', false);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    // 获得订阅订单订阅动作
    async getOrderSubscriptionItem(
      { commit },
      options: GetOrderSubscriptionItemOptions,
    ) {
      commit('setLoading', true);

      // 获得订单 ID,订阅类型
      const { orderId, type } = options;

      try {
        const response = await apiHttpClient.get(
          `orders/${orderId}/subscription-item?type=${type}`,
        );
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
