import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface ManageStoreState {
  name: string;
}

export const manageStoreModule: Module<ManageStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    name: 'manageStoreModule',
  } as ManageStoreState,

  /**
   * 获取器
   */
  getters: {
   
  },

  /**
   * 修改器
   */
  mutations: {

  },

  /**
   * 动作
   */
  actions: {

  },

  /**
   * 模块
   */
  modules: {
  },
};
