<template>
  <div class="order-index-side-sheet">
    <OrderDateTimeFilter class="filter" />
    <OrderStatusFilter class="filter" />
    <OrderPaymentFilter class="filter" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import OrderDateTimeFilter from '@/order/index/components/order-date-time-filter.vue';
import OrderStatusFilter from '@/order/index/components/order-status-filter.vue';
import OrderPaymentFilter from '@/order/index/components/order-payment-filter.vue';

export default defineComponent({
  name: 'OrderIndexSideSheet',

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
  components: {
    OrderPaymentFilter,
    OrderStatusFilter,
    OrderDateTimeFilter,
  },
});
</script>

<style scoped>
@import './styles/order-index-side-sheet.css';
</style>
