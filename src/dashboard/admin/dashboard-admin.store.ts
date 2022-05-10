import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface DashboardAdminStoreState {
  loading: boolean;
  selectedRange: string;
}

export const dashboardAdminStoreModule: Module<
  DashboardAdminStoreState,
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
    selectedRange: 'global',
  } as DashboardAdminStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    selectedRange(state) {
      return state.selectedRange;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setSelectedRange(state, data) {
      state.selectedRange = data;
    },
  },

  /**
   * 动作
   */
  actions: {},

  /**
   * 模块
   */
  modules: {},
};
