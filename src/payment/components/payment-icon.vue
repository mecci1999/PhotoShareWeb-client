<template>
  <i :class="paymentIconClasses" :style="paymentIconStyles"></i>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PaymentIcon',

  /**
   * 属性
   */
  props: {
    name: {
      type: String,
      default: 'wxpay',
    },

    size: {
      type: Number,
      default: 24,
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
    paymentIconClasses() {
      return ['payment-icon', this.name];
    },

    paymentIconStyles() {
      return {
        fontSize: `${this.size}px`,
      };
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
  components: {},
});
</script>

<style scoped>
@import './styles/payment-icon.css';
</style>
