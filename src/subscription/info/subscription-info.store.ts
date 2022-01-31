import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';
import { SubscriptionProduct } from '../../product/show/product-show.store';

export interface ValidSubscription {
  id: number;
  userId: number;
  type: string;
  status: string;
  created: string;
  expired: string;
  isExpired: boolean;
  daysRemaining: number;
  weeklyDownloads: number;
  weeklyDownloadsLimit: number;
}

export interface SubscriptionInfoStoreState {
  validSubscription: ValidSubscription | null;
  loading: boolean;
}

export interface GetValidSubscriptionOptions {
  data?: null;
}

export const subscriptionInfoStoreModule: Module<
  SubscriptionInfoStoreState,
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
    validSubscription: null,
    loading: false,
  } as SubscriptionInfoStoreState,

  /**
   * 获取器
   */
  getters: {
    validSubscription(state) {
      return state.validSubscription;
    },

    loading(state) {
      return state.loading;
    },

    subscription(state, getters, rootState, rootGetters) {
      const subscriptionProducts = rootGetters[
        'product/show/subscriptionProducts'
      ] as Array<SubscriptionProduct>;

      const subscriptionType = state.validSubscription
        ? state.validSubscription.type
        : '';

      return subscriptionProducts.find(
        product => product.meta.subscriptionType === subscriptionType,
      );
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setValidSubscription(state, data) {
      state.validSubscription = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getValidSubscription(
      { commit, dispatch },
      options: GetValidSubscriptionOptions = {},
    ) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`/valid-subscription`);
        commit('setLoading', false);

        commit('setValidSubscription', response.data);

        dispatch('product/show/getSubscriptionProducts', null, { root: true });

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
