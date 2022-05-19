import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import {
  DashboardAccessCountStoreState,
  dashboardAccessCountStoreModule,
} from '@/dashboard/access-count/dashboard-access-count.store';
import {
  dashboardAdminStoreModule,
  DashboardAdminStoreState,
} from './admin/dashboard-admin.store';
import {
  dashboardUserStoreModule,
  DashboardUserStoreState,
} from './user/dashboard-user.store';

//定义仪表盘内容卡片数据类型
export interface DashboardContentCardItem {
  icon?: string;
  title: string;
  amount: number;
  sum?: number;
}

export interface DashboardStoreState {
  admin: DashboardAdminStoreState;
  accessCount: DashboardAccessCountStoreState;
  user: DashboardUserStoreState;
  name: string;
}

export const dashboardStoreModule: Module<DashboardStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    name: 'dashboardStoreModule',
  } as DashboardStoreState,

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
    accessCount: dashboardAccessCountStoreModule,
    admin: dashboardAdminStoreModule,
    user: dashboardUserStoreModule,
  },
};
