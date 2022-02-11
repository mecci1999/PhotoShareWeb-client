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

export interface SubscriptionHistoryItem {
  id: number;
  action: string;
  meta: any;
  created: number;
  totalAmount: string;
  content?: string;
}

export interface SubscriptionInfoStoreState {
  subscriptionHistory: Array<SubscriptionHistoryItem>;
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
    subscriptionHistory: [],
    validSubscription: null,
    loading: false,
  } as SubscriptionInfoStoreState,

  /**
   * 获取器
   */
  getters: {
    subscriptionHistory(state) {
      return state.subscriptionHistory.map(item => {
        let action = '';

        switch (item.action) {
          case 'create':
            action = '创建';
            break;
          case 'renewed':
            action = '续订';
            break;
          case 'upgraded':
            action = '升级';
            break;
          case 'resubscribed':
            action = '重订';
            break;
        }

        if (item.action === 'create') {
          if (item.meta.subscriptionType === 'standard') {
            item.content = `${action}标准版订阅`;
          }
          if (item.meta.subscriptionType === 'pro') {
            item.content = `${action}专业版订阅`;
          }
        } else {
          if (item.meta.subscriptionType === 'standard') {
            item.content = `${action}标准版订阅`;
          }

          if (item.meta.subscriptionType === 'pro') {
            item.content = `${action}专业版订阅`;
          }
        }

        return item;
      });
    },

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
    setSubscriptionHistory(state, data) {
      state.subscriptionHistory = data;
    },

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
    async getValidSubscription({ commit, dispatch }) {
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

    async getSubscriptionHistory({ commit, state }) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(
          `/subscriptions/${state.validSubscription?.id}/history`,
        );

        commit('setLoading', false);

        commit('setSubscriptionHistory', response.data);
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
