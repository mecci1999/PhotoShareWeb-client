<template>
  <div class="recharge-info">
    <RechargeInfoCard></RechargeInfoCard>
    <transition name="subscription-payment">
      <SubscriptionPayment v-if="showRechargePayment" />
    </transition>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import RechargeInfoCard from './recharge-info-card.vue';
import SubscriptionPayment from '@/subscription/components/subscription-payment.vue';

export default defineComponent({
  name: 'RechargeInfo',

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
      paymentVisiable: 'recharge/paymentVisiable',
    }),

    showRechargePayment() {
      return this.paymentVisiable;
    },
  },

  /**
   * 已创建
   */
  created() {
    //
  },

  /**
   * 组件方法
   */
  methods: {},

  /**
   * 使用组件
   */
  components: {
    RechargeInfoCard,
    SubscriptionPayment,
  },
});
</script>

<style scoped>
@import './styles/recharge-info.css';
</style>
