<template>
  <div class="recharge-info-card">
    <div class="header">
      <div class="text">钱包充值</div>
      <div class="showAmount">金额: ¥{{ selectedAmount }}</div>
    </div>
    <div class="content">
      <RechargeAmountSelectButton></RechargeAmountSelectButton>
      <div class="btn">
        <button :class="rechargeButtonClasses" @click="onClickRechargeButton">
          {{ changeRechangeContent ? '取消' : '充值' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import RechargeAmountSelectButton from './recharge-amount-select-button.vue';

export default defineComponent({
  name: 'RechargeInfoCard',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      changeRechangeContent: false,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      selectedAmount: 'recharge/selectedAmount',
    }),

    rechargeButtonClasses() {
      return ['button', 'outline', { cancel: this.changeRechangeContent }];
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
  methods: {
    ...mapMutations({
      setPaymentVisiable: 'recharge/setPaymentVisiable',
      setSelectedSubscriptionType: 'product/select/setSelectedSubscriptionType',
    }),

    onClickRechargeButton() {
      this.changeRechangeContent = !this.changeRechangeContent;

      this.setPaymentVisiable();

      this.setSelectedSubscriptionType('recharge');
    },
  },

  /**
   * 使用组件
   */
  components: {
    RechargeAmountSelectButton,
  },
});
</script>

<style scoped>
@import './styles/recharge-info-card.css';
</style>
