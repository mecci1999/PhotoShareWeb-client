<template>
  <div class="payment-name">
    <div class="icon">
      <PaymentIcon :name="name"></PaymentIcon>
    </div>
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import PaymentIcon from './payment-icon.vue';

export default defineComponent({
  name: 'PaymentName',

  /**
   * 属性
   */
  props: {
    name: {
      type: String,
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
    title() {
      let title = '';

      switch (this.name) {
        case 'wxpay':
          title = '微信支付';
          break;
        case 'alipay':
          title = '支付宝';
          break;
      }

      return title;
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
    PaymentIcon,
  },
});
</script>

<style scoped>
@import './styles/payment-name.css';
</style>
