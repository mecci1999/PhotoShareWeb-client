<template>
  <div class="order-payment-filter">
    <div class="header">支付</div>
    <div class="content">
      <CheckboxField
        class="compact"
        :useIcon="false"
        v-for="{ text, value } in fields"
        :key="text"
        :text="text"
        :value="value"
        name="payment"
        type="radio"
        v-model="payment"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import CheckboxField from '@/app/components/checkbox-field.vue';

export default defineComponent({
  name: 'OrderPaymentFilter',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      fields: [
        {
          value: '',
          text: '全部',
        },
        {
          value: 'wxpay',
          text: '微信支付',
        },
        {
          value: 'alipay',
          text: '支付宝',
        },
      ],

      payment: '',
    };
  },

  /**
   * 监视
   */
  watch: {
    payment(value) {
      // 解构query
      const query = { ...this.$route.query };

      if (query) {
        query.payment = value;
      } else {
        delete query.payment;
      }

      this.$router.replace({ query });
    },
  },

  /**
   * 计算属性
   */
  computed: {},

  /**
   * 已创建
   */
  created() {
    const {
      query: { payment },
    } = this.$route;

    if (payment) {
      this.payment = payment;
    }
  },

  /**
   * 组件方法
   */
  methods: {},

  /**
   * 使用组件
   */
  components: {
    CheckboxField,
  },
});
</script>

<style scoped>
@import './styles/order-payment-filter.css';
</style>
