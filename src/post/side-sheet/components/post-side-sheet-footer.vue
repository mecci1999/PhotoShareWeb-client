<template>
  <div class="post-side-sheet-footer">
    <ProductPrice
      v-if="showProductPrice"
      :price="selectedProduct.price"
      :salePrice="selectedProduct.salePrice"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import ProductPrice from '@/product/components/product-price';

export default defineComponent({
  name: 'PostSideSheetFooter',

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
      canDownload: 'download/canDownload',
      selectedProduct: 'product/select/selectedProduct',
    }),

    showProductPrice() {
      return !this.canDownload && this.selectedProduct ? true : false;
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
    ...mapMutations({}),
    ...mapActions({}),
  },

  /**
   * 使用组件
   */
  components: {
    ProductPrice,
  },
});
</script>

<style scoped>
@import './styles/post-side-sheet-footer.css';
</style>
