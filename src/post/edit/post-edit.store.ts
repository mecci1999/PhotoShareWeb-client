import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface PostEditStoreState {
  loading: boolean;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
}

export interface UpdatePostOptions {
  postId?: number;
  data?: UpdatePostData;
}

export const postEditStoreModule: Module<PostEditStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
  } as PostEditStoreState,

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
    async updatePost({ commit }, options: UpdatePostOptions = {}) {
      commit('setLoading', true);

      const { data, postId } = options;

      try {
        const response = await apiHttpClient.patch(`posts/${postId}`, data);
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
