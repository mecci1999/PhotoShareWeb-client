<template>
  <div class="order-index">
    <div class="header">
      <OrderCounter />
    </div>
    <div class="content">
      <OrderList :filter="filter" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import OrderList from '@/order/index/components/order-list.vue';
import OrderCounter from '@/order/index/components/order-counter.vue';

export default defineComponent({
  name: 'OrderIndex',

  /**
   * 订单
   */
  title() {
    return '订单';
  },

  /**
   * 属性
   */
  props: {
    filter: {
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
  computed: {
    ...mapGetters({
      useAdmin: 'user/useAdmin',
    }),
  },

  /**
   * 已创建
   */
  created() {
    this.setSideSheetComponent('OrderIndexSideSheet');

    const { admin } = this.$route.query;

    if (admin === 'true') {
      this.setUseAdmin(true);
    }

    if (this.useAdmin) {
      const query = { ...this.$route.query, admin: true };

      this.$router.replace({ query });
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setSideSheetComponent: 'layout/setSideSheetComponent',
      setUseAdmin: 'user/setUseAdmin',
    }),

    ...mapActions({}),
  },

  /**
   * 使用组件
   */
  components: {
    OrderCounter,
    OrderList,
  },
});
</script>

<style scoped>
@import './styles/order-index.css';
</style>
