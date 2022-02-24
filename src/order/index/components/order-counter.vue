<template>
  <div class="order-counter" v-if="ordersCount">
    <div class="item">
      <div class="title">数量</div>
      <div class="value">{{ ordersCount.count }}</div>
    </div>
    <div class="item">
      <div class="title">总额</div>
      <div class="value">{{ ordersCount.totalAmount || '0.00' }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'OrderCounter',

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
      ordersCount: 'order/index/ordersCount',
    }),
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
@import './styles/order-counter.css';
</style>
