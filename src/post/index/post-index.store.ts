import { Module } from 'vuex';
import { apiHttpClient } from '../../app/app.service';
import { RootState } from '../../app/app.store';
import { User } from '../../user/show/user-show.store';

export interface PostListItem {
  id: number;
  title: string;
  content: string;
  user: User;
  totalComments: number;
  totalLikes: number;
  files: {
    id: number;
    width: number;
    height: number;
    orientation: string;
    size: {
      thumbnail: string;
      medium: string;
      large: string;
    };
  };
  tags: [
    {
      id: number;
      name: string;
    },
  ];
}

export interface PostIndexStoreState {
  loading: boolean;
  posts: Array<PostListItem>;
}

export const postIndexStoreModule: Module<PostIndexStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false,
    posts: [],
  } as PostIndexStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },

    posts(state) {
      return state.posts;
    },
  },

  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setPosts(state, data) {
      state.posts = data;
    },
  },

  actions: {
    async getPosts({ commit }) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get('/posts');
        commit('setPosts', response.data);
        commit('setLoading', false);

        return response;
      } catch (error) {
        commit('setLoading', false);
        throw error.response;
      }
    },
  },
};
