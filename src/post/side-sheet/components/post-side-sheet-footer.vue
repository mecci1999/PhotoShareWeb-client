<template>
  <div class="post-side-sheet-footer" v-if="showPostSideSheetFooter">
    <ProductPrice
      v-if="showProductPrice"
      :price="selectedProduct.price"
      :salePrice="selectedProduct.salePrice"
    />
    <a
      class="button"
      target="_blank"
      :href="prePay.offSiteUrl"
      v-if="showPaymentLink"
      >立即支付</a
    >
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import ProductPrice from '@/product/components/product-price.vue';

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
      prePay: 'order/pay/prePay',
    }),

    showProductPrice() {
      return !this.canDownload && this.selectedProduct ? true : false;
    },

    showPaymentLink() {
      return this.prePay && this.prePay.offSiteUrl ? true : false;
    },

    showPostSideSheetFooter() {
      return !this.canDownload && this.showProductPrice;
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
