<template>
  <div class="order-list-header">
    <div class="id">ID</div>
    <div class="user">用户</div>
    <div class="payment">支付</div>
    <div class="total-amount">金额</div>
    <div class="status">状态</div>
    <div class="created">日期</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OrderListHeader',

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
  components: {},
});
</script>

<style scoped>
@import './styles/order-list-header.css';
</style>
