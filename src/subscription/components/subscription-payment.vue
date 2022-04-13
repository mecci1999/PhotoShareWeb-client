<template>
  <div class="subscription-payment" v-if="hasPayments">
    <subscription-card
      :class="subscriptionCardClasses"
      :style="subscriptionCardStyles"
    >
      <template #thumbnail>
        <PaymentIcon :size="64" :name="selectedPayment.name" />
      </template>
      <template #header>使用{{ selectedPayment.title }}完成支付</template>
      <template #description>
        {{ selectedPayment.description }}
      </template>
      <template #meta v-if="currentOrder">
        <div class="item">
          <div class="title">应付金额</div>
          <div class="value">¥ {{ currentOrder.totalAmount }}</div>
        </div>
        <div class="action" v-if="paymentLink">
          <a class="button" :href="paymentLink" target="_blank">立即支付</a>
        </div>
      </template>
      <template #action>
        <AppQrcode
          color="#000"
          background="none"
          :padding="0"
          :size="100"
          :content="qrcodeContent"
        />
      </template>
    </subscription-card>
    <PaymentSelect />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AppQrcode from '@/app/components/app-qrcode.vue';
import PaymentIcon from '@/payment/components/payment-icon.vue';
import PaymentSelect from '@/payment/select/payment-select.vue';
import SubscriptionCard from '@/subscription/components/subscription-card.vue';

export default defineComponent({
  name: 'SubscriptionPayment',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {};
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      hasPayments: 'payment/index/hasPayments',
      selectedPayment: 'payment/select/selectedPayment',
      selectedPaymentName: 'payment/select/selectedPaymentName',
      currentOrder: 'order/create/currentOrder',
      prePay: 'order/pay/prePay',
      selectedProductType: 'product/select/selectedProductType',
      selectedAmount: 'recharge/selectedAmount',
    }),

    color() {
      let color = '';

      switch (this.selectedPayment.name) {
        case 'wxpay':
          color = '#09bb07';
          break;
        case 'alipay':
          color = '#06b4fd';
          break;
      }

      return color;
    },

    subscriptionCardClasses() {
      return ['stack', 'bordered-meta', 'colored', 'shadow'];
    },

    subscriptionCardStyles() {
      return { '--color': this.color };
    },

    qrcodeContent() {
      return this.prePay ? this.prePay.codeUrl : '';
    },

    paymentLink() {
      return this.prePay ? this.prePay.offSiteUrl : '';
    },
  },

  /**
   * 已创建
   */
  async created() {
    await this.getPayments();
    if (this.selectedProductType === 'recharge') {
      const order = await this.createRechargeOrder();

      await this.payOrder(order.data.id);
    } else {
      const order = await this.createOrderResolver();

      await this.payOrder(order.id);
    }
  },

  /**
   * 监视
   */
  watch: {
    async selectedPaymentName(value, oldValue) {
      if (oldValue) {
        await this.updateOrderResolver();
      }
    },

    async selectedAmount(value) {
      await this.updateOrder({
        orderId: this.currentOrder.id,
        data: {
          payment: this.currentOrder.payment,
          amount: value,
        },
      });

      console.log(this.currentOrder);
    },
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({}),

    ...mapActions({
      getPayments: 'payment/index/getPayments',
      createOrderResolver: 'order/create/createOrderResolver',
      createRechargeOrder: 'order/create/createRechargeOrder',
      updateOrderResolver: 'order/edit/updateOrderResolver',
      payOrder: 'order/pay/payOrder',
      updateOrder: 'order/edit/updateOrder',
    }),
  },

  /**
   * 使用组件
   */
  components: {
    PaymentIcon,
    AppQrcode,
    PaymentSelect,
    SubscriptionCard,
  },
});
</script>

<style scoped>
@import './styles/subscription-payment.css';
</style>
