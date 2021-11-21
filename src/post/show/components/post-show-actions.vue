<template>
  <div class="post-show-actions">
    <PostLikeAction class="action" :post="post"></PostLikeAction>
    <PostCommentAction class="action" :post="post" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import PostLikeAction from '@/post/components/post-like-action.vue';
import PostCommentAction from '@/post/components/post-comment-action.vue';

export default defineComponent({
  name: 'PostShowActions',

  /**
   * 属性
   */
  props: {
    post: {
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
    ...mapGetters({
      sideSheetComponent: 'layout/sideSheetComponent',
    }),
  },

  /**
   * 已创建
   */
  created() {
    if (!this.sideSheetComponent) {
      this.setSideSheetComponent('PostSideSheet');
    }

    if (this.sideSheetComponent === 'CommentSideSheet') {
      this.setSideSheetProps({
        filter: { post: this.post.id },
      });
    }

    if (this.sideSheetComponent === 'PostSideSheet') {
      this.setSideSheetProps({
        post: this.post,
        disableCloseButton: true,
      });
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setSideSheetComponent: 'layout/setSideSheetComponent',
      setSideSheetProps: 'layout/setSideSheetProps',
    }),
  },

  /**
   * 使用组件
   */
  components: {
    PostCommentAction,
    PostLikeAction,
  },
});
</script>

<style scoped>
@import './styles/post-show-actions.css';
</style>
