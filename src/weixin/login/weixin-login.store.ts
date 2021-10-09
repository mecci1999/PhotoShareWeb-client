import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface LoginStep {
  name: string;
  title: string;
  description: string;
  component?: string;
}

export interface WeixinLoginStoreState {
  currentLoginStepName: string;
  loading: boolean;
  loginSteps: Array<LoginStep>;
}

export interface WeixinLoginConnectOptions {
  data?: null;
}

export const weixinLoginStoreModule: Module<
  WeixinLoginStoreState,
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
    currentLoginStepName: 'connectAccount',
    loading: false,
    loginSteps: [
      {
        name: 'waitForUserConfimation',
        title: '微信登录',
        description: '用微信扫描下面的二维码',
        component: 'WeixinLoginIframe',
      },
      {
        name: 'connectAccount',
        title: '关联账户',
        description: '关联您的微信账户与已创建的账户',
        component: 'WeixinLoginConnect',
      },
      {
        name: 'verifyAccount',
        title: '关联已有账户',
        description: '请输入本站已有用户相关信息并确定关联',
        component: 'WeixinLoginAccount',
      },
      {
        name: 'createAccount',
        title: '关联新账户',
        description: '创建新的账户并与您的微信账户关联',
        component: 'WeixinLoginAccount',
      },
      {
        name: 'connectAccountCompleted',
        title: '关联成功',
        description: '成功关联了您的微信账户与已创建的账户',
      },
    ],
  } as WeixinLoginStoreState,

  /**
   * 获取器
   */
  getters: {
    currentLoginStepName(state) {
      return state.currentLoginStepName;
    },

    loading(state) {
      return state.loading;
    },

    currentLoginStep(state) {
      return state.loginSteps.find(
        step => step.name === state.currentLoginStepName,
      );
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setCurrentLoginStepName(state, data) {
      state.currentLoginStepName = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async weixinLoginConnect(
      { commit },
      options: WeixinLoginConnectOptions = {},
    ) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`resources`);
        commit('setLoading', false);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as any;

        commit('setLoading', false);

        throw _error.response;
      }
    },
  },

  /**
   * 模块
   */
  modules: {},
};
