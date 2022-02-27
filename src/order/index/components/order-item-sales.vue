<template>
  <div class="order-item-sales">
    <div class="item">
      <div class="title">订单数量</div>
      <div class="value">{{ sales.count }}</div>
    </div>
    <div class="item">
      <div class="title">销售总额</div>
      <div class="value">{{ sales.totalAmount }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OrderItemSales',

  /**
   * 属性
   */
  props: {
    sales: {
      type: Object,
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
  computed: {},

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
@import './styles/order-item-sales.css';
</style>
