import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { PostListItem } from '../../post/index/post-index.store';
import { TagItem } from '../../post/edit/post-edit.store';

export interface ManageSelectStoreState {
  selectedPosts: Array<PostListItem>;
  selectedItems: Array<number>;
  name: string;
}

export interface ManageSelectedItemsOptions {
  resourceType: string;
  item: number;
  actionType: string;
}

export const manageSelectStoreModule: Module<
  ManageSelectStoreState,
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
    selectedPosts: [],
    selectedItems: [],
    name: 'manageSelectStoreModule',
  } as ManageSelectStoreState,

  /**
   * 获取器
   */
  getters: {
    selectedPosts(state) {
      return state.selectedPosts;
    },

    selectedItems(state) {
      return state.selectedItems;
    },

    isSelected: state => (id: number) => {
      return state.selectedItems.some(item => item === id);
    },

    isSingleSelect(state) {
      return state.selectedItems.length === 1 ? true : false;
    },

    isMultiSelect(state) {
      return state.selectedItems.length > 1 ? true : false;
    },

    hasSelected(state) {
      return state.selectedItems.length ? true : false;
    },

    currentEditedPost(state) {
      return state.selectedPosts[state.selectedPosts.length - 1];
    },

    selectedPostsTags(state) {
      const tags = state.selectedPosts.reduce((accumulator, post) => {
        return post.tags ? [...accumulator, ...post.tags] : accumulator;
      }, [] as Array<TagItem>);

      return Array.from(new Set(tags.map(tag => tag.id))).map(tagId =>
        tags.find(tag => tag.id === tagId),
      );
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setSelectedPosts(state, data) {
      state.selectedPosts = data;
    },

    setSelectedItems(state, data) {
      state.selectedItems = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    getSelectedPosts({ state, commit, rootGetters, getters }) {
      const selectedPosts = state.selectedItems.map(item =>
        rootGetters['post/index/posts'].find(
          (post: PostListItem) => post.id === item,
        ),
      );

      commit('setSelectedPosts', selectedPosts);

      commit('post/edit/setTags', getters.selectedPostsTags, { root: true });

      return selectedPosts;
    },

    manageSelectedItems(
      { commit, state, dispatch },
      options: ManageSelectedItemsOptions,
    ) {
      // 解构数据
      const { resourceType, item, actionType } = options;

      let items: Array<number>;

      switch (actionType) {
        case 'add':
          items = [...state.selectedItems, item];
          break;
        case 'remove':
          items = state.selectedItems.filter(
            selectedItem => selectedItem !== item,
          );
          break;
        case 'reset':
          items = [];
          break;
        default:
          items = [item];
          break;
      }

      commit('setSelectedItems', items);

      switch (resourceType) {
        case 'post':
          dispatch('getSelectedPosts');
          break;
      }
    },

    async deleteSelectedPosts({ commit, dispatch, getters }) {
      const posts = getters.selectedPosts as Array<PostListItem>;

      if (!posts.length) return;

      for (const post of posts) {
        try {
          await dispatch(
            'post/destroy/deletePost',
            { postId: post.id },
            { root: true },
          );

          await dispatch('manageSelectedItems', {
            resourceType: 'post',
            item: post.id,
            actionType: 'remove',
          });

          commit('post/index/removePostItem', post, { root: true });
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const _error = error as any;

          dispatch(
            'notification/pushMessage',
            { content: _error.data.message },
            { root: true },
          );
        }
      }
    },
  },

  /**
   * 模块
   */
  modules: {},
};
