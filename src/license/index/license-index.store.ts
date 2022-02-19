import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';
import { LICENSES_PER_PAGE } from '../../app/app.config';

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
  totalPages: number;
  nextPage: number;
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
    totalPages: 1,
    nextPage: 1,
    loading: false,
    licenses: [],
  } as LicenseIndexStoreState,

  /**
   * 获取器
   */
  getters: {
    totalPages(state) {
      return state.totalPages;
    },

    nextPage(state) {
      return state.nextPage;
    },

    loading(state) {
      return state.loading;
    },

    licenses(state) {
      return state.licenses;
    },

    hasMore(state) {
      return state.totalPages - state.nextPage >= 0;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setNextPage(state, data) {
      if (data) {
        state.nextPage = data;
      } else {
        state.nextPage++;
      }
    },

    setTotalPages(state, data) {
      state.totalPages = data;
    },

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
    async getLicenses({ commit, state, dispatch }) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(
          `licenses?page=${state.nextPage}`,
        );

        dispatch('getLicensesPostProcess', response);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    getLicensesPostProcess({ commit, state }, response) {
      if (state.nextPage === 1) {
        commit('setLicenses', response.data);
      } else {
        commit('setLicenses', [...state.licenses, ...response.data]);
      }

      commit('setLoading', false);

      const total =
        response.headers['X-Total-Count'] || response.headers['x-total-count'];

      const totalPages = Math.ceil(total / LICENSES_PER_PAGE);

      commit('setTotalPages', totalPages);

      commit('setNextPage');
    },
  },

  /**
   * 模块
   */
  modules: {},
};
