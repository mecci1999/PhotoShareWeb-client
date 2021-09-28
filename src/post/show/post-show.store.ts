import { Module } from 'vuex';
import appRouter from '../../app/app.router';
import { apiHttpClient } from '../../app/app.service';
import { RootState } from '../../app/app.store';
import { User } from '../../user/show/user-show.store';
import { postFileProcess } from '../post.service';

export interface Post {
  id: number;
  title: string;
  content: string;
  user: User;
  totalComments: number;
  totalLikes: number;
  liked: number;
  file: {
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

export interface PostShowStoreState {
  loading: boolean;
  post: Post;
  layout: string;
}

export const postShowStoreModule: Module<PostShowStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false,
    post: {},
    layout: '',
  } as PostShowStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },

    post(state) {
      return Object.keys(state.post).length
        ? postFileProcess(state.post)
        : null;
    },

    layout(state) {
      return state.layout;
    },

    // 当前内容在内容列表中的位置
    currentPostIndex(state, _, rootState) {
      return rootState.post.index.posts.findIndex(
        item => item.id === state.post.id,
      );
    },

    // 本页面的上一个内容页面
    prevPost(_, getters, rootState) {
      return rootState.post.index.posts[getters.currentPostIndex - 1];
    },

    // 本页面的下一个内容页面
    nextPost(_, getters, rootState) {
      return rootState.post.index.posts[getters.currentPostIndex + 1];
    },

    // 可以去到上一个位置内容页面
    canNavigateBack(_, getters, rootState) {
      return (
        rootState.post.index.posts.length > 0 && getters.currentPostIndex !== 0
      );
    },

    // 可以去到下一个位置内容页面
    canNavigateForward(_, getters, rootState) {
      return (
        rootState.post.index.posts.length > 0 &&
        rootState.post.index.posts.length !== getters.currentPostIndex + 1
      );
    },

    // 当前是否还有未加载的内容页面
    canGetMorePosts(_, getters, rootState, rootGetters) {
      return (
        rootGetters['post/index/hasMore'] &&
        rootState.post.index.posts.length - getters.currentPostIndex < 3
      );
    },
  },

  mutations: {
    setLoading(state, data) {
      state.post = data;
    },

    setPost(state, data) {
      state.post = data;
    },

    setLayout(state, data) {
      state.layout = data;
    },

    setPostLiked(state, data) {
      const { postId, liked } = data;

      if (state.post.id === postId) {
        state.post.liked = liked;
      }
    },

    setPostTotalLikes(state, data) {
      const { postId, actionType } = data;

      if (state.post.id === postId) {
        switch (actionType) {
          case 'increase':
            state.post.totalLikes++;
            break;
          case 'decrease':
            state.post.totalLikes--;
            break;
        }
      }
    },

    setPostTotalComments(state, data) {
      const { postId, actionType } = data;

      if (state.post.id === postId) {
        switch (actionType) {
          case 'increase':
            state.post.totalComments++;
            break;
          case 'decrease':
            state.post.totalComments--;
            break;
        }
      }
    },
  },

  actions: {
    async getPostById({ commit }, postId) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`/posts/${postId}`);
        commit('setLoading', false);
        commit('setPost', response.data);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    async goGetPrevPost({ getters, dispatch }) {
      if (!getters.canNavigateBack) return;

      try {
        const prevPostId = getters.prevPost.id;
        const response = await dispatch('getPostById', prevPostId);

        appRouter.replace({
          name: 'postShow',
          params: { postId: prevPostId },
        });

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;
        throw _error.response;
      }
    },

    async goGetNextPost({ getters, dispatch }) {
      if (!getters.canNavigateForward) return;

      // 判断是否还有未加载的内容页面
      if (getters.canGetMorePosts) {
        dispatch('post/index/getPosts', {}, { root: true });
      }

      try {
        const nextPostId = getters.nextPost.id;
        const response = await dispatch('getPostById', nextPostId);

        appRouter.replace({
          name: 'postShow',
          params: { postId: nextPostId },
        });

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;
        throw _error.response;
      }
    },
  },
};
