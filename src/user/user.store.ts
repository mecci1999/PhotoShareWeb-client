import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import {
  userShowStoreModule,
  UserShowStoreState,
} from './show/user-show.store';

export interface UserStoreState {
  show: UserShowStoreState;
}

export const userStoreModule: Module<UserStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {} as UserStoreState,

  /**
   * 获取器
   */
  getters: {},

  /**
   * 修改器
   */
  mutations: {},

  /**
   * 动作
   */
  actions: {},

  modules: {
    show: userShowStoreModule,
  },
};
