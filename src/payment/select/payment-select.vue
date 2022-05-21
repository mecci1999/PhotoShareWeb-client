<template>
  <div class="payment-select" v-if="isUseAmountPayment">
    <CheckboxField
      v-for="{ name, meta: { buttonText, color } } in payments"
      :key="name"
      :class="['outline', color]"
      :value="name"
      :text="buttonText"
      name="status"
      type="radio"
      v-model="currentPayment"
    >
      <PaymentIcon class="extra" :name="name"></PaymentIcon>
    </CheckboxField>
  </div>
  <div class="payment-select" v-if="!isUseAmountPayment">
    <CheckboxField
      v-for="{ name, meta: { buttonText, color } } in onlyWeiAndAliPay"
      :key="name"
      :class="['outline', color]"
      :value="name"
      :text="buttonText"
      name="status"
      type="radio"
      v-model="currentPayment"
    >
      <PaymentIcon class="extra" :name="name"></PaymentIcon>
    </CheckboxField>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import PaymentIcon from '@/payment/components/payment-icon.vue';
import CheckboxField from '@/app/components/checkbox-field.vue';

export default defineComponent({
  name: 'PaymentSelect',

  /**
   * 属性
   */
  props: {
    isUseAmountPayment: {
      type: Boolean,
      default: false,
    },
  },

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
      payments: 'payment/index/payments',
      selectedPaymentName: 'payment/select/selectedPaymentName',
      onlyWeiAndAliPay: 'payment/index/onlyWeiAndAliPay',
    }),

    currentPayment: {
      get() {
        return this.selectedPaymentName;
      },
      set(value) {
        this.setSelectedPaymentName(value);
      },
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
    ...mapMutations({
      setSelectedPaymentName: 'payment/select/setSelectedPaymentName',
    }),

    ...mapActions({
      getPayments: 'payment/index/getPayments',
    }),
  },

  /**
   * 使用组件
   */
  components: {
    CheckboxField,
    PaymentIcon,
  },
});
</script>

<style scoped>
@import './styles/payment-select.css';
</style>
