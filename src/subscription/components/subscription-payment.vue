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
      <template #meta></template>
      <template #action>
        <AppQrcode color="#000" background="none" :padding="0" :size="100" />
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
  },

  /**
   * 已创建
   */
  async created() {
    await this.getPayments();
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({}),

    ...mapActions({
      getPayments: 'payment/index/getPayments',
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
