import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface LayoutStoreState {
  isSideSheetActive: boolean;
  sideSheetTouchDown: boolean;
  theme: string;
  sideSheetComponent: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sideSheetProps: any;
}

export const layoutStoreModule: Module<LayoutStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    isSideSheetActive: false,
    sideSheetTouchDown: false,
    theme: 'light',
    sideSheetComponent: '',
    sideSheetProps: null,
  } as LayoutStoreState,

  /**
   * 获取器
   */
  getters: {
    isSideSheetActive(state) {
      return state.isSideSheetActive;
    },

    sideSheetTouchDown(state) {
      return state.sideSheetTouchDown;
    },

    theme(state) {
      return state.theme;
    },

    sideSheetComponent(state) {
      return state.sideSheetComponent;
    },

    sideSheetProps(state) {
      return state.sideSheetProps;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setIsSideSheetActive(state, data) {
      state.isSideSheetActive = data;
    },

    setSideSheetTouchDown(state, data) {
      state.sideSheetTouchDown = data;
    },

    setTheme(state, data) {
      state.theme = data;
    },

    setSideSheetComponent(state, data) {
      state.sideSheetComponent = data;
    },

    resetSideSheet(state) {
      state.sideSheetComponent = '';
      state.sideSheetProps = null;
    },

    setSideSheetProps(state, data) {
      state.sideSheetProps = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    switchSideSheet({ commit, state }) {
      commit('setIsSideSheetActive', !state.isSideSheetActive);
    },

    closeSideSheet({ commit }) {
      commit('setIsSideSheetActive', false);
    },

    openSideSheet({ commit }) {
      commit('setIsSideSheetActive', true);
    },
  },
};
