import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface FileMetadata {
  id: number;
  size: number;
  width: number;
  height: number;
  metadata: {
    Make: string;
    Model: string;
    LensMake: string;
    LensModel: string;
    Software: string;
    Orientation: number;
    CreateDate: number;
    ModifyDate: number;
    FNumber: number;
    FocalLength: number;
    ExposureTime: number;
    ISO: number;
  };
}

export interface FileShowStoreState {
  loading: boolean;
  fileMetadata: FileMetadata | null;
}

export const fileShowStoreModule: Module<FileShowStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    fileMetadata: null,
  } as FileShowStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    fileMetadata(state) {
      return state.fileMetadata;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setFileMetadata(state, data) {
      state.fileMetadata = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getFileById({ commit }, fileId) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`/files/${fileId}/metadata`);
        commit('setFileMetadata', response.data);
        commit('setLoading', false);

        return response;
      } catch (error) {
        const _error = error as any;
        commit('setLoading', false);

        throw _error.response;
      }
    },
  },
};
