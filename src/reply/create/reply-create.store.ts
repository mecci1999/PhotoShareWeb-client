import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface ReplyCreateStoreState {
  loading: boolean;
}

export interface CreateReplyOptions {
  commentId?: number;
  content?: string;
  postId?: number;
}

export const replyCreateStoreModule: Module<
  ReplyCreateStoreState,
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
  } as ReplyCreateStoreState,

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
    async createReply({ commit }, options: CreateReplyOptions = {}) {
      commit('setLoading', true);

      const { commentId, content, postId } = options;

      try {
        const response = await apiHttpClient.post(
          `comments/${commentId}/reply`,
          { content, postId },
        );
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
