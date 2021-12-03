<template>
  <div class="post-side-sheet-content">
    <PostSideSheetContentMeta />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import PostSideSheetContentMeta from '@/post/side-sheet/components/post-side-sheet-content-meta.vue';

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
    PostSideSheetContentMeta,
  },
});
</script>

<style scoped>
@import './styles/post-side-sheet-content.css';
</style>
