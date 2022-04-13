import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface OrderEditStoreState {
  loading: boolean;
}

export interface UpdateOrderData {
  payment?: string;
  amount?: number;
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
    async updateOrder({ commit, rootGetters }, options: UpdateOrderOptions) {
      commit('setLoading', true);

      const { data, orderId } = options;

      try {
        const response = await apiHttpClient.patch(`orders/${orderId}`, data);
        commit('setLoading', false);

        if (rootGetters['product/select/selectedProductType'] === 'recharge') {
          commit(
            'order/create/setRechargeOrder',
            { ...response.data.newOrder },
            { root: true },
          );
        }

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    async updateOrderResolver({ dispatch, rootGetters, commit }) {
      if (rootGetters['product/select/selectedProductType'] === 'recharge') {
        const order = await dispatch('order/create/createRechargeOrder', null, {
          root: true,
        });

        // 支付方法
        const payment = rootGetters['payment/select/selectedPaymentName'];

        // 防止更新同样的支付方法
        if (order.payment === payment) return;

        // 更新订单
        await dispatch('updateOrder', {
          orderId: order.id,
          data: {
            payment,
          },
        });

        // 支付订单
        await dispatch('order/pay/payOrder', order.id, { root: true });
      } else {
        // 订单 ID
        const order = await dispatch('order/create/createOrderResolver', null, {
          root: true,
        });

        // 支付方法
        const payment = rootGetters['payment/select/selectedPaymentName'];

        // 防止更新同样的支付方法
        if (order.payment === payment) return;

        // 产品类型
        const selectedProductType =
          rootGetters['product/select/selectedProductType'];

        // 订阅类型
        const selectedSubscriptionType =
          rootGetters['product/select/selectedSubscriptionType'];

        // 更新许可订单
        if (selectedProductType === 'license') {
          commit(
            'order/create/setLicenseOrder',
            { ...order, payment },
            { root: true },
          );
        }

        // 更新订阅订单
        if (selectedProductType === 'subscription') {
          commit(
            'order/create/setSubscriptionOrders',
            { [selectedSubscriptionType]: { ...order, payment } },
            { root: true },
          );
        }

        // 更新订单
        await dispatch('updateOrder', {
          orderId: order.id,
          data: {
            payment,
          },
        });

        // 支付订单
        await dispatch('order/pay/payOrder', order.id, { root: true });
      }
    },
  },

  /**
   * 模块
   */
  modules: {},
};
