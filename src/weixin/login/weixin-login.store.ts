import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface WeixinLoginStoreState {
  loading: boolean;
}

export interface WeixinLoginConnectOptions {
  data?: null;
}

export const weixinLoginStoreModule: Module<
  WeixinLoginStoreState,
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
    loading: false,
  } as WeixinLoginStoreState,

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
    async weixinLoginConnect(
      { commit },
      options: WeixinLoginConnectOptions = {},
    ) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`resources`);
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
