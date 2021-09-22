import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface LikeCreateStoreState {
  loading: boolean;
}

export interface CreateUserLikePostOptions {
  postId?: number;
}

export const likeCreateStoreModule: Module<LikeCreateStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
  } as LikeCreateStoreState,

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
    async createUserLikePost(
      { commit },
      options: CreateUserLikePostOptions = {},
    ) {
      commit('setLoading', true);

      const { postId } = options;

      try {
        const response = await apiHttpClient.post(`/posts/${postId}/like`);
        commit('setLoading', false);

        commit(
          'post/index/setPostItemLiked',
          { postId, liked: 1 },
          { root: true },
        );

        commit(
          'post/index/setPostItemTotalLikes',
          { postId, actionType: 'increase' },
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
