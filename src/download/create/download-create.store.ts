import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface DownloadCreateStoreState {
  fileDownloadUrl: string;
  download: string;
  loading: boolean;
}

export interface CreateDownloadOptions {
  data?: null;
}

export const downloadCreateStoreModule: Module<
  DownloadCreateStoreState,
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
    fileDownloadUrl: '',
    download: '',
    loading: false,
  } as DownloadCreateStoreState,

  /**
   * 获取器
   */
  getters: {
    fileDownloadUrl(state) {
      return state.fileDownloadUrl;
    },

    download(state) {
      return state.download;
    },

    loading(state) {
      return state.loading;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setFileDownloadUrl(state, data) {
      state.fileDownloadUrl = data;
    },

    setDownload(state, data) {
      state.download = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async createDownload({ commit }, options: CreateDownloadOptions = {}) {
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
