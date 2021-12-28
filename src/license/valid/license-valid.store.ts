import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient, queryStringProcess } from '@/app/app.service';

export interface License {
  id: number;
  userId: number;
  orderId: number;
  resourceId: number;
  resourceType: string;
  status: string;
  created: string;
}

export interface LicenseValidStoreState {
  validLicense: License | null;
  loading: boolean;
}

export interface GetValidLicenseOptions {
  resourceId: number;
  resourceType: string;
}

export const licenseValidStoreModule: Module<
  LicenseValidStoreState,
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
    validLicense: null,
    loading: false,
  } as LicenseValidStoreState,

  /**
   * 获取器
   */
  getters: {
    validLicense(state) {
      return state.validLicense;
    },

    loading(state) {
      return state.loading;
    },

    hasValidLicense(state) {
      return state.validLicense ? true : false;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setValidLicense(state, data) {
      state.validLicense = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getValidLicense({ commit }, options: GetValidLicenseOptions) {
      commit('setLoading', true);

      const { resourceId, resourceType } = options;

      const queryString = queryStringProcess({ resourceId, resourceType });

      try {
        const response = await apiHttpClient.get(
          `valid-license?${queryString}`,
        );
        commit('setLoading', false);

        commit('setValidLicense', response.data);

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
