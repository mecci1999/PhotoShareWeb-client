<template>
  <div class="product-price">
    <div class="price through" v-if="saved">
      <span class="symbol">{{ symbol }}</span>
      <span class="value">{{ price }}</span>
      <span class="unit" v-if="unit">/ {{ unit }}</span>
    </div>
    <div class="price sale">
      <span class="symbol">{{ symbol }}</span>
      <span class="value">{{ salePrice }}</span>
      <span class="unit" v-if="unit">/ {{ unit }}</span>
      <span class="saved" v-if="saved">节省: {{ saved }}%</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductPrice',

  /**
   * 属性
   */
  props: {
    symbol: {
      type: String,
      default: '¥',
    },

    unit: {
      type: String,
    },

    price: {
      type: String,
      default: '0.00',
    },

    salePrice: {
      type: String,
      default: '0.00',
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
    saved() {
      const salePrice = parseFloat(this.salePrice).toFixed(2);
      const price = parseFloat(this.price).toFixed(2);

      return Math.round(100 - (salePrice / price).toFixed(2) * 100);
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
  components: {},
});
</script>

<style scoped>
@import './styles/product-price.css';
</style>
