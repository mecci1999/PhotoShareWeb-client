import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface Product {
  id?: number;
  type?: string;
  title?: string;
  description?: Array<string>;
  price?: string;
  salePrice?: string;
}

export interface LicenseProduct extends Product {
  meta: null;
}

export interface RechargeProduct extends Product {
  meta: null;
}

export interface SubscriptionProduct extends Product {
  meta: {
    unit: string;
    color: string;
    billingCycle: string;
    subscriptionType: string;
  };
}

export interface ProductShowStoreState {
  subscriptionProducts: Array<SubscriptionProduct>;
  licenseProduct: LicenseProduct | null;
  rechargeProduct: RechargeProduct | null;
  loading: boolean;
}

export const productShowStoreModule: Module<
  ProductShowStoreState,
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
    subscriptionProducts: [],
    licenseProduct: null,
    rechargeProduct: null,
    loading: false,
  } as ProductShowStoreState,

  /**
   * 获取器
   */
  getters: {
    subscriptionProducts(state) {
      return state.subscriptionProducts;
    },

    licenseProduct(state) {
      return state.licenseProduct;
    },

    rechargeProduct(state) {
      return state.rechargeProduct;
    },

    loading(state) {
      return state.loading;
    },

    hasLicenseProduct(state) {
      return state.licenseProduct ? true : false;
    },

    hasRechargeProduct(state) {
      return state.rechargeProduct ? true : false;
    },

    hasSubscriptionProducts(state) {
      return state.subscriptionProducts.length ? true : false;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setSubscriptionProducts(state, data) {
      state.subscriptionProducts = data;
    },

    setLicenseProduct(state, data) {
      state.licenseProduct = data;
    },

    setRechargeProduct(state, data) {
      state.rechargeProduct = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getLicenseProduct({ commit }) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`/products/license`);
        commit('setLoading', false);
        commit('setLicenseProduct', response.data);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    async getSubscriptionProducts({ commit }) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`/products/subscription`);
        commit('setLoading', false);
        commit('setSubscriptionProducts', response.data);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    // 充值产品
    async getRechargeProduct({ commit }) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`/products/recharge`);
        commit('setLoading', false);
        commit('setRechargeProduct', response.data);

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
