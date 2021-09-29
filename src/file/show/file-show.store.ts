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

export interface MetaItem {
  title: string;
  value: string;
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

    // 拍摄设备
    kit(state) {
      let kit: Array<MetaItem> = [];

      if (state.fileMetadata) {
        const {
          Make = '',
          Model = '',
          LensMake = '',
          LensModel = '',
        } = state.fileMetadata.metadata;

        const camera = {
          title: '相机',
          value: `${Make} ${Model}`.trim(),
        };

        const lens = {
          title: '镜头',
          value: `${LensMake} ${LensModel}`.trim(),
        };

        kit = [camera, lens];
      }

      return kit.filter(item => item.value !== '');
    },

    // 拍摄参数
    specs(state) {
      let specs: Array<MetaItem> = [];

      if (state.fileMetadata) {
        const {
          FocalLength,
          FNumber,
          ExposureTime,
          ISO,
        } = state.fileMetadata.metadata;

        specs = [
          {
            title: '焦距',
            value: FocalLength ? `${FocalLength}mm` : '',
          },
          {
            title: '光圈',
            value: FNumber ? `f/${FocalLength}` : '',
          },
          {
            title: '曝光',
            value: ExposureTime
              ? ExposureTime >= 1
                ? `${ExposureTime}s`
                : `1/${Math.round(1 / ExposureTime)}s`
              : '',
          },
          {
            title: '感光',
            value: `${ISO ? ISO : ''}`,
          },
        ];
      }

      return specs.filter(item => item.value !== '');
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;
        commit('setLoading', false);

        throw _error.response;
      }
    },
  },
};
