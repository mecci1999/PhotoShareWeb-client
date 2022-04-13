import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface RechargeStoreState {
  selectedAmount: string;
  paymentVisiable: boolean;
}

export const rechargeStoreModule: Module<RechargeStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    selectedAmount: '10.00',
    paymentVisiable: false,
  } as RechargeStoreState,

  /**
   * 获取器
   */
  getters: {
    selectedAmount(state) {
      return state.selectedAmount;
    },

    paymentVisiable(state) {
      return state.paymentVisiable;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setSelectedAmount(state, data) {
      state.selectedAmount = data;
    },

    setPaymentVisiable(state) {
      state.paymentVisiable = !state.paymentVisiable;
    },
  },

  /**
   * 动作
   */
  actions: {},
};
