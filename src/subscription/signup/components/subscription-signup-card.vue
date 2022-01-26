<template>
  <div class="subscription-signup-card">
    <SubscriptionIcon />
    <ProductPrice />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import ProductPrice from '@/product/components/product-price.vue';
import SubscriptionIcon from '@/subscription/components/subscription-icon.vue';

export default defineComponent({
  name: 'SubscriptionSignupCard',

  /**
   * 属性
   */
  props: {
    product: {
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
    ...mapGetters({}),
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
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
  },

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
@import './styles/subscription-signup-card.css';
</style>
