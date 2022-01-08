import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { PaymentIndexStoreState, paymentIndexStoreModule } from '@/payment/index/payment-index.store';

export interface PaymentStoreState {
  index: PaymentIndexStoreState;
  name: string;
}

export const paymentStoreModule: Module<PaymentStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    name: 'paymentStoreModule',
  } as PaymentStoreState,

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
    index: paymentIndexStoreModule,
  },
};
