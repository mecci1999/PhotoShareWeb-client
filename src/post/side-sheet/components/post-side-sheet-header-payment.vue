<template>
  <div class="post-side-sheet-header-payment" v-if="selectedPayment">
    <div class="media">
      <div class="image">
        <AppQrcode
          :content="qrcodeContent"
          v-show="!isUseAmountPayment"
        ></AppQrcode>
      </div>
    </div>
    <div class="header">
      {{ headerText }}
    </div>
    <div class="description">
      {{ selectedPayment.description }}
    </div>
    <div class="amount" v-show="isUseAmountPayment">
      {{ amountShow }}
    </div>
    <div class="amountButton" v-show="isUseAmountPayment">
      <button class="button" @click="onClickUseAmountButton">
        {{ amountButtonText }}
      </button>
      <button
        class="button"
        @click="onClickCancelPayment"
        v-show="isShowCancelButton"
      >
        取消支付
      </button>
    </div>
    <div class="action">
      <button class="button basic" @click="onClickPaymentIconButton">
        <PaymentIcon :name="selectedPayment.name" :size="32"></PaymentIcon>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AppQrcode from '@/app/components/app-qrcode.vue';
import PaymentIcon from '@/payment/components/payment-icon.vue';

export default defineComponent({
  name: 'PostSideSheetHeaderPayment',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      isShowCancelButton: false,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      selectedPayment: 'payment/select/selectedPayment',
      selectedPaymentName: 'payment/select/selectedPaymentName',
      payments: 'payment/index/payments',
      selectedProduct: 'product/select/selectedProduct',
      prePay: 'order/pay/prePay',
      currentUser: 'user/currentUser',
      loading: 'order/pay/loading',
      currentOrder: 'order/create/currentOrder',
    }),

    headerText() {
      let headerText;

      if (this.selectedProduct) {
        headerText = `支付${this.selectedProduct.title}`;
      }

      return headerText;
    },

    qrcodeContent() {
      return this.prePay ? this.prePay.codeUrl : null;
    },

    isUseAmountPayment() {
      return this.selectedPayment.name === 'amount';
    },

    amountShow() {
      if (!this.iseEoughPayment) {
        return '您的账户余额不足，请充值余额或请使用其他三方支付方式完成支付';
      } else {
        return `您当前账户余额为${this.currentUser.amount}元`;
      }
    },

    //
    iseEoughPayment() {
      return (
        parseFloat(this.currentUser.amount) >=
        parseFloat(this.selectedProduct.salePrice)
      );
    },

    amountButtonText() {
      if (!this.iseEoughPayment) {
        return '充值';
      } else {
        if (this.isShowCancelButton) {
          return '确认支付';
        }

        if (this.loading) {
          return '支付中';
        }

        return '支付';
      }
    },
  },

  /**
   * 已创建
   */
  created() {
    // 组件创建后
    this.setSelectedProductType('license');
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setSelectedPaymentName: 'payment/select/setSelectedPaymentName',
      setSelectedProductType: 'product/select/setSelectedProductType',
    }),

    ...mapActions({
      closeSideSheet: 'layout/closeSideSheet',
      useAccountAmountPayOrder: 'order/pay/useAccountAmountPayOrder',
      getCurrentUser: 'user/getCurrentUser',
      pushMessage: 'notification/pushMessage',
      getDownloadPermission: 'download/getDownloadPermission',
    }),

    onClickPaymentIconButton() {
      // 当前支付方法索引值
      let index = this.payments.findIndex(
        payment => payment.name === this.selectedPaymentName,
      );

      // 往后移一个或重新开始
      if (index + 1 === this.payments.length) {
        index = 0;
      } else {
        index++;
      }

      // 设置选择的支付方法
      this.setSelectedPaymentName(this.payments[index].name);
    },

    async onClickUseAmountButton() {
      // 余额不足充值，跳转至充值页面
      if (!this.iseEoughPayment) {
        this.$router.replace('/recharge');
        this.closeSideSheet();
      } else {
        if (this.isShowCancelButton) {
          try {
            // 获取当前订单
            await this.useAccountAmountPayOrder(this.currentOrder);

            // 更新订单状态和用户信息
            await this.getCurrentUser(this.currentUser.id);
            await this.getDownloadPermission();
            this.pushMessage({ content: '支付完成' });
            return;
          } catch (error) {
            this.pushMessage({
              content: error.data.message,
            });
            return;
          }
        } else {
          // 显示取消充值按钮和确认充值按钮
          this.isShowCancelButton = true;
        }
      }
    },

    // 取消支付按钮事件
    onClickCancelPayment() {
      this.isShowCancelButton = false;
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppQrcode,
    PaymentIcon,
  },
});
</script>

<style scoped>
@import './styles/post-side-sheet-header-payment.css';
</style>
