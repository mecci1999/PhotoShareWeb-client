<template>
  <div class="post-side-sheet">
    <PostSideSheetHeader />
    <PostSideSheetTab />
    <PostSideSheetContent />
    <PostSideSheetActions />
    <PostSideSheetFooter />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import PostSideSheetContent from '@/post/side-sheet/components/post-side-sheet-content.vue';
import PostSideSheetHeader from '@/post/side-sheet/components/post-side-sheet-header.vue';
import PostSideSheetActions from '@/post/side-sheet/components/post-side-sheet-actions.vue';
import PostSideSheetFooter from '@/post/side-sheet/components/post-side-sheet-footer.vue';
import PostSideSheetTab from '@/post/side-sheet/components/post-side-sheet-tab.vue';

export default defineComponent({
  name: 'PostSideSheet',

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
      sideSheetProps: 'layout/sideSheetProps',
      selectedProduct: 'product/select/selectedProduct',
    }),
  },

  /**
   * 已创建
   */
  async created() {
    await this.initialize();
  },

  /**
   * 监视
   */
  watch: {
    async sideSheetProps() {
      await this.initialize();
    },

    async selectedProduct(value, oldvalue) {
      if (oldvalue !== null) {
        await this.initialize();
      }
    },
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      initialize: 'post/sideSheet/initialize',
    }),
  },

  /**
   * 使用组件
   */
  components: {
    PostSideSheetTab,
    PostSideSheetFooter,
    PostSideSheetActions,
    PostSideSheetHeader,
    PostSideSheetContent,
  },
});
</script>

<style scoped>
@import './styles/post-side-sheet.css';
</style>
