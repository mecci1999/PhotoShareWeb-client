<template>
  <div class="post-side-sheet-content">
    <component :is="contentComponent"></component>
    <PostSideSheetContentMeta v-if="showContentMeta" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import PostSideSheetContentMeta from '@/post/side-sheet/components/post-side-sheet-content-meta.vue';
import PostSideSheetContentLicense from '@/post/side-sheet/components/post-side-sheet-content-license.vue';
import PostSideSheetContentSubscription from '@/post/side-sheet/components/post-side-sheet-content-subscription.vue';

export default defineComponent({
  name: 'PostSideSheetContent',

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
      selectedProductType: 'product/select/selectedProductType',
      canDownload: 'download/canDownload',
    }),

    contentComponent() {
      let contentComponent;

      if (!this.canDownload) {
        switch (this.selectedProductType) {
          case 'license':
            contentComponent = 'PostSideSheetContentLicense';
            break;
          case 'subscription':
            contentComponent = 'PostSideSheetContentSubscription';
            break;
        }
      }

      return contentComponent;
    },

    showContentMeta() {
      let showContentMeta = true;

      if (this.selectedProductType === 'subscription') {
        showContentMeta = false;
      }

      return showContentMeta;
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
    PostSideSheetContentSubscription,
    PostSideSheetContentLicense,
    PostSideSheetContentMeta,
  },
});
</script>

<style scoped>
@import './styles/post-side-sheet-content.css';
</style>
