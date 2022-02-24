<template>
  <div class="order-list-item">
    <div class="content">
      <div class="id">{{ item.id }}</div>
      <div class="user">
        <UserAvatar :user="item.user" />
        <UserName :user="item.user" />
      </div>
      <div class="payment">
        <PaymentName :name="item.payment" />
      </div>
      <div class="total-amount">
        {{ item.totalAmount }}
      </div>
      <div class="status">
        <OrderStatus :status="item.status" />
      </div>
      <div class="created">
        <AppDatetime :date="item.created" format="short" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppDatetime from '@/app/components/app-datetime.vue';
import OrderStatus from '@/order/components/order-status.vue';
import PaymentName from '@/payment/components/payment-name.vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';

export default defineComponent({
  name: 'OrderListItem',

  /**
   * 属性
   */
  props: {
    item: {
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
  components: {
    UserAvatar,
    UserName,
    PaymentName,
    OrderStatus,
    AppDatetime,
  },
});
</script>

<style scoped>
@import './styles/order-list-item.css';
</style>
