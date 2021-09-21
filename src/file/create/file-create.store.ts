import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface File {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
}

export interface FileCreateStoreState {
  uploadProgress: number;
  previewImage: string;
  selectedFile: File | null;
  loading: boolean;
}

export interface CreateFileOptions {
  file?: File;
  postId?: number;
}

export const fileCreateStoreModule: Module<FileCreateStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    uploadProgress: 0,
    previewImage: '',
    selectedFile: null,
    loading: false,
  } as FileCreateStoreState,

  /**
   * 获取器
   */
  getters: {
    uploadProgress(state) {
      return state.uploadProgress;
    },

    previewImage(state) {
      return state.previewImage;
    },

    selectedFile(state) {
      return state.selectedFile;
    },

    loading(state) {
      return state.loading;
    },

    uploading(state) {
      return state.uploadProgress !== 0 && state.uploadProgress !== 100
        ? true
        : false;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setUploadProgress(state, data) {
      state.uploadProgress = data;
    },

    setPreviewImage(state, data) {
      state.previewImage = data;
    },

    setSelectedFile(state, data) {
      state.selectedFile = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async createFile({ commit, dispatch }, options: CreateFileOptions = {}) {
      commit('setLoading', true);

      const { file, postId } = options;

      const formData = new FormData();

      formData.append('file', file as any);

      try {
        const response = await apiHttpClient.post(
          `/files?post=${postId}`,
          formData,
          {
            onUploadProgress: event => {
              const uploadProgress = Math.round(
                (event.loaded * 100) / event.total,
              );

              if (uploadProgress === 100) {
                dispatch(
                  'notification/pushMessage',
                  { content: '上传成功，开始处理照片...' },
                  { root: true },
                );
              }

              commit('setUploadProgress', uploadProgress);
            },
          },
        );

        commit('setLoading', false);

        dispatch(
          'notification/pushMessage',
          { content: '照片处理完成' },
          { root: true },
        );

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
