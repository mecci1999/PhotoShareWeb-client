import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';
import { SubscriptionProduct } from '../../product/show/product-show.store';

export interface Order {
  id?: number;
  userId?: number;
  status?: string;
  payment?: string;
  productId?: number;
  totalAmount?: string;
}

export interface OrderCreateStoreState {
  subscriptionOrders: {
    [subscriptionType: string]: Order;
  } | null;
  licenseOrder: Order | null;
  licenseOrderResourceId: number | null;
  loading: boolean;
}

export interface CreateOrderData {
  payment: string;
  productId: number;
  resourceType: string;
  resourceId?: number;
}

export interface CreateOrderOptions {
  data?: CreateOrderData;
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
    subscriptionOrders: null,
    licenseOrder: null,
    licenseOrderResourceId: null,
    loading: false,
  } as OrderCreateStoreState,

  /**
   * 获取器
   */
  getters: {
    subscriptionOrders(state) {
      return state.subscriptionOrders;
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

    proSubscriptionOrder(state) {
      return state.subscriptionOrders ? state.subscriptionOrders['pro'] : null;
    },

    standardSubscriptionOrder(state) {
      return state.subscriptionOrders
        ? state.subscriptionOrders['standard']
        : null;
    },

    hasProSubscription(state) {
      return state.subscriptionOrders && 'pro' in state.subscriptionOrders
        ? true
        : false;
    },

    hasStandardSubscription(state) {
      return state.subscriptionOrders && 'standard' in state.subscriptionOrders
        ? true
        : false;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setSubscriptionOrders(state, data) {
      const subscriptionOrders = state.subscriptionOrders;

      if (data) {
        state.subscriptionOrders = { ...subscriptionOrders, ...data };
      } else {
        state.subscriptionOrders = null;
      }
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
    async createOrder({ commit, dispatch }, options: CreateOrderOptions = {}) {
      commit('setLoading', true);

      const { data } = options;

      try {
        const response = await apiHttpClient.post(`/orders`, data);
        commit('setLoading', false);

        dispatch('createOrderPostProcess', { ...data, order: response.data });

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    createOrderPostProcess(
      { commit, rootGetters },
      { resourceType, resourceId, productId, order },
    ) {
      // 许可订单
      if (resourceType === 'post') {
        commit('setLicenseOrder', order);
        commit('setLicenseOrderResourceId', resourceId);
      }

      // 订阅订单
      if (resourceType === 'subscription') {
        const subscriptionProduct = rootGetters[
          'product/show/subscriptionProducts'
        ] as Array<SubscriptionProduct>;

        const orderProduct = subscriptionProduct.find(
          product => product.id === productId,
        ) as SubscriptionProduct;

        commit('setSubscriptionOrders', {
          [orderProduct.meta.subscriptionType]: order,
        });
      }
    },

    // 创建许可订单动作
    createLicenseOrder({ rootGetters, dispatch }) {
      // 产品ID
      const { id: productId } = rootGetters['product/select/selectedProduct'];

      // 支付方法
      const payment = rootGetters['payment/select/selectedPaymentName'];

      // 资源类型
      const resourceType = 'post';

      // 资源ID
      const {
        post: { id: resourceId },
      } = rootGetters['layout/sideSheetProps'];

      // 创建订单
      return dispatch('createOrder', {
        data: { productId, payment, resourceType, resourceId },
      });
    },

    // 创建订阅订单动作
    createSubscriptionOrder({ rootGetters, dispatch }) {
      // 产品ID
      const { id: productId } = rootGetters['product/select/selectedProduct'];

      // 支付方法
      const payment = rootGetters['payment/select/selectedPaymentName'];

      // 资源类型
      const resourceType = 'subscription';

      // 创建订单
      return dispatch('createOrder', {
        data: { productId, payment, resourceType },
      });
    },
  },

  /**
   * 模块
   */
  modules: {},
};
