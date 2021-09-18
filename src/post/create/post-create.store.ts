import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface PostCreateStoreState {
  loading: boolean;
  title: string;
  content: string;
  postId: number | null;
}

export interface CreatePostData {
  title: string;
  content?: string;
}

export interface CreatePostOptions {
  data?: CreatePostData;
}

export const postCreateStoreModule: Module<PostCreateStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    title: '',
    content: '',
    postId: null,
  } as PostCreateStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    title(state) {
      return state.title;
    },

    content(state) {
      return state.content;
    },

    postId(state) {
      return state.postId;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setTitle(state, data) {
      state.title = data;
    },

    setContent(state, data) {
      state.content = data;
    },

    setPostId(state, data) {
      state.postId = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async createPost({ commit }, options: CreatePostOptions = {}) {
      commit('setLoading', true);

      const { data } = options;

      try {
        const response = await apiHttpClient.post(`/posts`, data);

        commit('setLoading', false);

        commit('setPostId', response.data.insertId);

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
