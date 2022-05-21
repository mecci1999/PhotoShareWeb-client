<template>
  <div class="post-side-sheet-header">
    <div class="media">
      <img class="image" :src="post.file.size.medium" />
    </div>
    <div class="content">
      <PostSideSheetHeaderPayment v-if="!canDownload" />
      <PostSideSheetHeaderDownload v-if="canDownload" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import PostSideSheetHeaderDownload from '@/post/side-sheet/components/post-side-sheet-header-download.vue';
import PostSideSheetHeaderPayment from '@/post/side-sheet/components/post-side-sheet-header-payment.vue';

export default defineComponent({
  name: 'PostSideSheetHeader',

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
      canDownload: 'download/canDownload',
    }),

    post() {
      return this.sideSheetProps.post;
    },
  },

  /**
   * 已创建
   */
  async created() {
    await this.getDownloadPermission();
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({}),
    ...mapActions({
      getDownloadPermission: 'download/getDownloadPermission',
    }),
  },

  /**
   * 使用组件
   */
  components: {
    PostSideSheetHeaderPayment,
    PostSideSheetHeaderDownload,
  },
});
</script>

<style scoped>
@import './styles/post-side-sheet-header.css';
</style>
