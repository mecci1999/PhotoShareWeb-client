<template>
  <div class="order-subscription-item" v-if="orderSubscriptionItem">
    <div class="thumbnail">
      <SubscriptionIcon size="large" :color="color" />
    </div>
    <div class="content">
      <div class="header">
        {{ title }}
      </div>
      <div class="meta">
        <OrderItemSales :sales="sales" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import SubscriptionIcon from '@/subscription/components/subscription-icon.vue';
import OrderItemSales from '@/order/index/components/order-item-sales.vue';

export default defineComponent({
  name: 'OrderSubscriptionItem',

  /**
   * 属性
   */
  props: {
    order: {
      type: Object,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      orderSubscriptionItem: null,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    title() {
      return this.orderSubscriptionItem.title;
    },

    color() {
      return this.orderSubscriptionItem.meta.color;
    },

    sales() {
      return this.orderSubscriptionItem.sales;
    },

    totalAmount() {
      return this.orderSubscriptionItem.totalAmount;
    },
  },

  /**
   * 已创建
   */
  async created() {
    try {
      const response = await this.getOrderSubscriptionItem({
        orderId: this.order.id,
        type: this.order.product.meta.subscriptionType,
      });

      this.orderSubscriptionItem = response.data;
    } catch (error) {
      this.pushMessage({ content: error.data.message });
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      getOrderSubscriptionItem: 'order/show/getOrderSubscriptionItem',
      pushMessage: 'notification/pushMessage',
    }),
  },

  /**
   * 使用组件
   */
  components: {
    SubscriptionIcon,
    OrderItemSales,
  },
});
</script>

<style scoped>
@import './styles/order-subscription-item.css';
</style>
