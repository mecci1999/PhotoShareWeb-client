import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface OrderEditStoreState {
  loading: boolean;
}

export interface UpdateOrderData {
  payment?: string;
}

export interface UpdateOrderOptions {
  orderId: number;
  data: UpdateOrderData;
}

export const orderEditStoreModule: Module<OrderEditStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
  } as OrderEditStoreState,

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
    async updateOrder({ commit }, options: UpdateOrderOptions) {
      commit('setLoading', true);

      const { data, orderId } = options;

      try {
        const response = await apiHttpClient.patch(`orders/${orderId}`, data);
        commit('setLoading', false);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    async updateOrderResolver({ dispatch, rootGetters }) {
      // 订单 ID
      const { id: orderId } = await dispatch(
        'order/create/createOrderResolver',
        null,
        { root: true },
      );

      // 支付方法
      const payment = rootGetters['payment/select/selectedPaymentName'];

      // 更新订单
      await dispatch('updateOrder', {
        orderId,
        data: {
          payment,
        },
      });

      // 支付订单
      await dispatch('order/pay/payOrder', orderId, { root: true });
    },
  },

  /**
   * 模块
   */
  modules: {},
};
