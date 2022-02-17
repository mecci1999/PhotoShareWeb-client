import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { LicenseValidStoreState, licenseValidStoreModule } from '@/license/valid/license-valid.store';
import { LicenseIndexStoreState, licenseIndexStoreModule } from '@/license/index/license-index.store';

export interface LicenseStoreState {
  index: LicenseIndexStoreState;
  valid: LicenseValidStoreState;
  name: string;
}

export const licenseStoreModule: Module<LicenseStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    name: 'licenseStoreModule',
  } as LicenseStoreState,

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
    index: licenseIndexStoreModule,
    valid: licenseValidStoreModule,
  },
};
