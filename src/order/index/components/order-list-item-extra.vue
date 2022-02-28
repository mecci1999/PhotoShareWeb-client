<template>
  <div class="order-list-item-extra">
    <component :is="extraComponentName" :order="item"></component>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import OrderLicenseItem from '@/order/index/components/order-license-item.vue';
import OrderSubscriptionItem from '@/order/index/components/order-subscription-item.vue';

export default defineComponent({
  name: 'OrderListItemExtra',

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
  computed: {
    extraComponentName() {
      let extraComponentName = '';

      if (this.item.product.type === 'license') {
        extraComponentName = 'OrderLicenseItem';
      }

      if (this.item.product.type === 'subscription') {
        extraComponentName = 'OrderSubscriptionItem';
      }

      return extraComponentName;
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
    OrderLicenseItem,
    OrderSubscriptionItem,
  },
});
</script>

<style scoped>
@import './styles/order-list-item-extra.css';
</style>
