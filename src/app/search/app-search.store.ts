import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface AppSearchStoreState {
  searchKeyword: string;
  searchResults: null;
  searchOption: SearchOption;
  loading: boolean;
}

export interface SearchOption {
  title: string;
  value: string;
  query: string;
}

export const appSearchStoreModule: Module<AppSearchStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    searchKeyword: '',
    searchResults: null,
    searchOption: {
      title: '标签',
      value: 'tags',
      query: 'name',
    },
    loading: false,
  } as AppSearchStoreState,

  /**
   * 获取器
   */
  getters: {
    searchKeyword(state) {
      return state.searchKeyword;
    },

    searchResults(state) {
      return state.searchResults;
    },

    searchOption(state) {
      return state.searchOption;
    },

    loading(state) {
      return state.loading;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setSearchKeyword(state, data) {
      state.searchKeyword = data;
    },

    setSearchResults(state, data) {
      state.searchResults = data;
    },

    setSearchOption(state, data) {
      state.searchOption = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async search({ commit, state }) {
      commit('setLoading', true);

      const {
        searchOption: { value, query },
        searchKeyword,
      } = state;

      try {
        const response = await apiHttpClient.get(
          `/search/${value}?${query}=${searchKeyword}`,
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
