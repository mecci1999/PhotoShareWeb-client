import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { ProductShowStoreState, productShowStoreModule } from '@/product/show/product-show.store';

export interface ProductStoreState {
  show: ProductShowStoreState;
  name: string;
}

export const productStoreModule: Module<ProductStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    name: 'productStoreModule',
  } as ProductStoreState,

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
    show: productShowStoreModule,
  },
};
