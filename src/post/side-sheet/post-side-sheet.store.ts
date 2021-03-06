import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface PostFileMetadataItem {
  title: string;
  value: string;
}

export interface PostSideSheetStoreState {
  name: string;
}

export const postSideSheetStoreModule: Module<
  PostSideSheetStoreState,
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
    name: 'postSideSheetStoreModule',
  } as PostSideSheetStoreState,

  /**
   * 获取器
   */
  getters: {
    postFileMetadata(state, getters, rootState) {
      const metadata: Array<PostFileMetadataItem> = [];

      const { title } = rootState.post.show.post;

      if (title) {
        metadata.push({ title: '标题', value: title });
      }

      if (rootState.file.show.fileMetadata) {
        const {
          size,
          width,
          height,
          metadata: { Make, Model, LensMake, LensModel, Software },
        } = rootState.file.show.fileMetadata;

        if (size) {
          metadata.push({
            title: '大小',
            value: `${Math.ceil(size / 1024 / 1024)} M`,
          });
        }

        if (width & height) {
          metadata.push({ title: '尺寸', value: `${width} x ${height}` });
        }

        if (Make) {
          metadata.push({ title: '相机', value: `${Make} ${Model}` });
        }

        if (LensMake) {
          metadata.push({ title: '镜头', value: `${LensMake} ${LensModel}` });
        }

        if (Software) {
          metadata.push({ title: '软件', value: Software });
        }
      }
      return metadata;
    },
  },

  /**
   * 修改器
   */
  mutations: {},

  /**
   * 动作
   */
  actions: {
    async initialize({ dispatch, rootGetters, commit }) {
      // 检查下载权限
      await dispatch('download/getDownloadPermission', null, { root: true });
      if (rootGetters['download/canDownload']) return;

      // 获取支付方法
      if (!rootGetters['download/canDownload']) {
        await dispatch('payment/index/getPayments', null, { root: true });
      }

      // 获取许可产品
      if (!rootGetters['product/show/hasLicenseProduct']) {
        await dispatch('product/show/getLicenseProduct', null, { root: true });
      }

      // 获取充值产品
      if (!rootGetters['product/show/hasRechargeProduct']) {
        await dispatch('product/show/getRechargeProduct', null, { root: true });
      }

      // 获取订阅产品
      if (!rootGetters['product/show/hasSubscriptionProducts']) {
        await dispatch('product/show/getSubscriptionProducts', null, {
          root: true,
        });
      }

      // 处理订单
      const order = await dispatch('order/create/createOrderResolver', null, {
        root: true,
      });

      // 支付方法
      const selectedPaymentName =
        rootGetters['payment/select/selectedPaymentName'];

      if (selectedPaymentName !== order.payment) {
        commit('payment/select/setSelectedPaymentName', order.payment, {
          root: true,
        });
      }

      // 支付订单
      await dispatch('order/pay/payOrder', order.id, { root: true });
    },
  },

  /**
   * 模块
   */
  modules: {},
};
