import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';
import { File } from '../../file/create/file-create.store';

export interface PostCreateStoreState {
  unsaved: boolean;
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
  file?: File;
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
    unsaved: false,
    loading: false,
    title: '',
    content: '',
    postId: null,
  } as PostCreateStoreState,

  /**
   * 获取器
   */
  getters: {
    unsaved(state) {
      return state.unsaved;
    },

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
    setUnsaved(state, data) {
      state.unsaved = data;
    },

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
    async createPost({ commit, dispatch }, options: CreatePostOptions = {}) {
      commit('setLoading', true);

      const { data, file } = options;

      try {
        const response = await apiHttpClient.post(`/posts`, data);

        commit('setLoading', false);

        commit('setPostId', response.data.insertId);

        if (file) {
          dispatch(
            'file/create/createFile',
            {
              file: file,
              postId: response.data.insertId,
            },
            {
              root: true,
            },
          );
        }

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
