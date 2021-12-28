<template>
  <div class="post-side-sheet">
    <PostSideSheetHeader />
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
      canDownload: 'download/canDownload',
      sideSheetProps: 'layout/sideSheetProps',
    }),
  },

  /**
   * 已创建
   */
  async created() {
    await this.getDownloadPermission();
  },

  /**
   * 监视
   */
  watch: {
    async sideSheetProps() {
      await this.getDownloadPermission();
    },
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      getDownloadPermission: 'download/getDownloadPermission',
    }),
  },

  /**
   * 使用组件
   */
  components: {
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
