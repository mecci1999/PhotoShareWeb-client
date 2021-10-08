<template>
  <div class="post-comment-action">
    <div class="icon">
      <button class="button basic" @click.stop="onClickCommentButton">
        <AppIcon name="comment"></AppIcon>
      </button>
    </div>
    <div class="text">
      {{ post.totalComments }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapMutations } from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'PostCommentAction',

  /**
   * 属性
   */
  props: {
    post: {
      type: Object,
    },

    actionType: {
      type: String,
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
  computed: {},

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
    ...mapMutations({
      setSideSheetComponent: 'layout/setSideSheetComponent',
      setSideSheetProps: 'layout/setSideSheetProps',
    }),

    ...mapActions({
      openSideSheet: 'layout/openSideSheet',
      switchSideSheet: 'layout/switchSideSheet',
    }),

    onClickCommentButton() {
      this.setSideSheetComponent('CommentSideSheet');
      this.setSideSheetProps({ filter: { post: this.post.id } });

      if (this.actionType === 'switch') {
        this.switchSideSheet();
      } else {
        this.openSideSheet();
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppIcon,
  },
});
</script>

<style scoped>
@import './styles/post-comment-action.css';
</style>
