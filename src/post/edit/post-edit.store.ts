import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface PostEditStoreState {
  loading: boolean;
  tags: Array<TagItem>;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
}

export interface UpdatePostOptions {
  postId?: number;
  data?: UpdatePostData;
}

export interface TagItem {
  id?: number;
  name?: string;
}

export interface CreatePostTagOptions {
  postId?: number;
  data?: TagItem;
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
    tags: [],
  } as PostEditStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    tags(state) {
      return state.tags;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setTags(state, data) {
      state.tags = data;
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

    async createPostTag(
      { commit, dispatch },
      options: CreatePostTagOptions = {},
    ) {
      commit('setLoading', true);

      const { data, postId } = options;

      try {
        const response = await apiHttpClient.post(`posts/${postId}/tag`, data);

        const {
          data: { tags },
        } = await dispatch('post/show/getPostById', postId, {
          root: true,
        });

        commit('setTags', tags);

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
