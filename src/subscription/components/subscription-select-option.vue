<template>
  <div class="subscription-select-option">
    <SubscriptionIcon />
    <ProductPrice />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ProductPrice from '@/product/components/product-price.vue';
import SubscriptionIcon from '@/subscription/components/subscription-icon.vue';

export default defineComponent({
  name: 'SubscriptionSelectOption',

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
    SubscriptionIcon,
    ProductPrice,
  },
});
</script>

<style scoped>
@import './styles/subscription-select-option.css';
</style>
