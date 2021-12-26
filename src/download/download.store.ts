import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { DownloadCreateStoreState, downloadCreateStoreModule } from '@/download/create/download-create.store';

export interface DownloadStoreState {
  create: DownloadCreateStoreState;
  name: string;
}

export const downloadStoreModule: Module<DownloadStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    name: 'downloadStoreModule',
  } as DownloadStoreState,

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
    create: downloadCreateStoreModule,
  },
};
