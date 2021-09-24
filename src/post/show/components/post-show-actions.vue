<template>
  <div class="post-show-actions">
    <PostLikeAction class="action" :post="post"></PostLikeAction>
    <div class="action">
      <div class="icon">
        <button class="button basic" @click="onClickCommentButton">
          <AppIcon name="comment"></AppIcon>
        </button>
      </div>
      <div class="text">
        {{ post.totalComments }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';
import PostLikeAction from '@/post/components/post-like-action.vue';

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
    this.setSideSheetComponent('CommentSideSheet');

    if (this.sideSheetComponent) {
      this.setSideSheetProps({
        filter: { post: this.post.id },
      });
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setSideSheetComponent: 'layout/setSideSheetComponent',
      resetSideSheet: 'layout/resetSideSheet',
      setSideSheetProps: 'layout/setSideSheetProps',
    }),

    ...mapActions({
      switchSideSheet: 'layout/switchSideSheet',
    }),

    onClickCommentButton() {
      this.switchSideSheet();
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppIcon,
    PostLikeAction,
  },
});
</script>

<style scoped>
@import './styles/post-show-actions.css';
</style>
