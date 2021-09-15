import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient, queryStringProcess } from '@/app/app.service';
import { filterProcess } from '../../post/post.service';
import { StringifiableRecord } from 'query-string';
import { COMMENTS_PRE_PAGE } from '../../app/app.config';

export interface CommentListItem {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
    avatar: number;
  };
  post: {
    id: number;
    title: string;
  };
  totalReplies: number | null;
}

export type Comments = Array<CommentListItem>;

export interface CommentIndexStoreState {
  loading: boolean;
  comments: Comments;
  filter: { [name: string]: string } | null;
  queryString: string;
  nextPage: number;
  totalPages: number;
}

export interface GetCommentsOptions {
  filter: { [name: string]: string };
}

export const commentIndexStoreModule: Module<
  CommentIndexStoreState,
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
    comments: [],
    filter: null,
    queryString: '',
    nextPage: 1,
    totalPages: 1,
  } as CommentIndexStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    comments(state) {
      return state.comments;
    },
    hasMore(state) {
      return state.totalPages - state.nextPage >= 0;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setComments(state, data) {
      state.comments = data;
    },

    setFilter(state, data) {
      const filter = filterProcess(data);
      state.filter = filter;
    },

    setQueryString(state, data) {
      state.queryString = data;
    },

    setNextPage(state, data) {
      if (data) {
        state.nextPage = data;
      } else {
        state.nextPage++;
      }
    },

    setTotalPages(state, data) {
      state.totalPages = data;
    },

    removeCommentItem(state, data) {
      state.comments = state.comments.filter(item => item.id !== data);
    },

    increaseTotalReplies(state, data) {
      state.comments = state.comments.map(item => {
        if (item.id === data) {
          if (item.totalReplies) {
            item.totalReplies++;
          } else {
            item.totalReplies = 1;
          }
        }

        return item;
      });
    },

    decreaseTotalReplies(state, data) {
      state.comments = state.comments.map(item => {
        if (item.id === data) {
          if (item.totalReplies) {
            item.totalReplies--;
          }
        }

        return item;
      });
    },
  },

  /**
   * 动作
   */
  actions: {
    async getComments(
      { commit, dispatch, state },
      options: GetCommentsOptions,
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let getCommentsQueryString = '';

      if (Object.keys(options).length) {
        getCommentsQueryString = await dispatch(
          'getCommentsPreProcess',
          options,
        );
      } else {
        getCommentsQueryString = state.queryString;
      }

      try {
        const response = await apiHttpClient.get(
          `/comments?page=${state.nextPage}&${state.queryString}`,
        );

        dispatch('getCommentsPostProcess', response);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },

    // 获取评论数据前期处理动作
    getCommentsPreProcess({ commit, state }, options: GetCommentsOptions) {
      commit('setLoading', true);

      commit('setFilter', options.filter);

      // 准备转化为查询符的过滤数据
      const getCommentsQueryObject: StringifiableRecord = {
        ...state.filter,
      };

      const getCommentsQueryString = queryStringProcess(getCommentsQueryObject);

      // 如果更换过滤数据，重第一页开始浏览
      if (state.queryString !== getCommentsQueryString) {
        commit('setNextPage', 1);
      }

      commit('setQueryString', getCommentsQueryString);

      return getCommentsQueryString;
    },

    // 获取评论数据后期处理动作
    getCommentsPostProcess({ commit, state }, response) {
      if (state.nextPage === 1) {
        commit('setComments', response.data);
      } else {
        commit('setComments', [...state.comments, ...response.data]);
      }

      commit('setLoading', false);

      // 从请求头部中获取评论总数量
      const total =
        response.headers['X-Total-Count'] || response.headers['x-total-count'];

      // 总页数
      const totalPages = Math.ceil(total / COMMENTS_PRE_PAGE);

      commit('setTotalPages', totalPages);

      commit('setNextPage');

      commit('layout/setSideSheetTouchDown', false, { root: true });
    },
  },
};
