<template>
  <div
    :class="subscriptionSelectOption"
    @click="onClickSubscriptionSelectOption(option.meta.subscriptionType)"
  >
    <div class="header">
      <div class="title">
        {{ option.title }}
      </div>
      <div class="meta">
        <ProductPrice
          class="small right saved-bottom"
          :price="option.price"
          :salePrice="option.salePrice"
          :unit="option.meta.unit"
        />
      </div>
    </div>
    <div class="content">
      <div class="description">
        <div
          class="line"
          v-for="(line, index) in option.description"
          :key="index"
        >
          {{ line }}
        </div>
      </div>
      <div class="icon">
        <SubscriptionIcon :color="option.meta.color" />
      </div>
    </div>
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
  props: {
    option: {
      type: Object,
    },

    isActive: {
      type: Boolean,
    },
  },

  emits: ['change'],

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
    subscriptionSelectOption() {
      return ['subscription-select-option', { active: this.isActive }];
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
  methods: {
    onClickSubscriptionSelectOption(type) {
      this.$emit('change', type);
    },
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
@import './styles/subscription-select-option.css';
</style>
