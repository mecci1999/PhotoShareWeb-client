import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';
import { Order } from '../create/order-create.store';

export interface PrePay {
  codeUrl?: string;
  payment?: string;
  offSiteUrl?: string;
}

export interface OrderPayStoreState {
  loading: boolean;
  prePay: PrePay | null;
}

export const orderPayStoreModule: Module<OrderPayStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    prePay: null,
  } as OrderPayStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    prePay(state) {
      return state.prePay;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setPrepay(state, data) {
      state.prePay = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async payOrder({ commit }, orderId: number) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.post(`orders/${orderId}/pay`);

        commit('setPrepay', response.data);
        commit('setLoading', false);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    // 使用余额完成订单支付
    async useAccountAmountPayOrder({ commit }, order: Order) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.post(`payments/accountpay`, {
          order,
        });
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
