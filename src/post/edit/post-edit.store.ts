import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';
import { File } from '../../file/create/file-create.store';

export interface PostEditStoreState {
  loading: boolean;
  tags: Array<TagItem>;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  status?: string;
}

export interface UpdatePostOptions {
  postId?: number;
  data?: UpdatePostData;
  file?: File;
}

export interface TagItem {
  id?: number;
  name?: string;
}

export interface CreatePostTagOptions {
  postId?: number;
  data?: TagItem;
}

export interface DeletePostTagOptions {
  postId?: number;
  tagId?: number;
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

    hasTags(state) {
      return state.tags && state.tags.length ? true : false;
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
    async updatePost({ commit, dispatch }, options: UpdatePostOptions = {}) {
      commit('setLoading', true);

      const { data, postId, file } = options;

      try {
        const response = await apiHttpClient.patch(`posts/${postId}`, data);

        if (file) {
          dispatch(
            'file/create/createFile',
            {
              postId,
              file,
            },
            {
              root: true,
            },
          );
        }

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

        const { data: post } = await dispatch('post/show/getPostById', postId, {
          root: true,
        });

        commit('setTags', post.tags);

        commit('setLoading', false);

        commit('post/index/setPostItem', post, { root: true });

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    async deletePostTag(
      { commit, dispatch },
      options: DeletePostTagOptions = {},
    ) {
      commit('setLoading', true);

      const { tagId, postId } = options;

      try {
        const response = await apiHttpClient.delete(`posts/${postId}/tag`, {
          data: { tagId },
        });

        const { data: post } = await dispatch('post/show/getPostById', postId, {
          root: true,
        });

        commit('setTags', post.tags);

        commit('setLoading', false);

        commit('post/index/setPostItem', post, { root: true });

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
