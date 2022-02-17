import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface LicenseListItem {
  id: number;
  created: string;
  user: {
    id: number;
    name: string;
    avatar: number | null;
  };
  order: {
    id: number;
    payment: string;
    totalAmount: number;
  };
  resource: {
    id: number;
    type: string;
    user: {
      id: number;
      name: string;
      avatar: number | null;
    };
    file: {
      id: number;
      width: number;
      height: number;
    };
  };
}

export interface LicenseIndexStoreState {
  loading: boolean;
  licenses: Array<LicenseListItem>;
}

export interface GetLicensesOptions {
  data?: null;
}

export const licenseIndexStoreModule: Module<
  LicenseIndexStoreState,
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
    licenses: [],
  } as LicenseIndexStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    licenses(state) {
      return state.licenses;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setLicenses(state, data) {
      state.licenses = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getLicenses({ commit }) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`licenses`);

        commit('setLicenses', response.data);
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
