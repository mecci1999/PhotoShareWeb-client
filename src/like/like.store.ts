import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

import {
  LikeCreateStoreState,
  likeCreateStoreModule,
} from './create/like-create.store';

import {
  LikeDestroyStoreState,
  likeDestroyStoreModule,
} from '@/like/destroy/like-destroy.store';

export interface LikeStoreState {
  destroy: LikeDestroyStoreState;
  name: string;
  create: LikeCreateStoreState;
}

export const likeStoreModule: Module<LikeStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    name: 'likeStoreModule',
  } as LikeStoreState,

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

  /**
   * 模块
   */
  modules: {
    destroy: likeDestroyStoreModule,
    create: likeCreateStoreModule,
  },
};
