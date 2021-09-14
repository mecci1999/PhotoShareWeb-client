<template>
  <div class="comment-list-item-actions">
    <div class="action" v-if="item.totalReplies">
      <button class="button basic" @click="onClickTotalRepliesButton">
        {{ item.totalReplies }} 条回复
        <AppIcon :name="totalRepliesIconName"></AppIcon>
      </button>
    </div>
    <div class="action" v-if="showOwnCommentOperation">
      <button class="button basic" @click="onClickDeleteButton">
        {{ deleteButtonText }}
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'CommentListItemActions',

  /**
   * 属性
   */
  props: {
    item: {
      type: Object,
    },

    showOperation: {
      type: Boolean,
    },
  },

  /**
   * 事件
   */
  emits: ['toggle-replies'],

  /**
   * 数据
   */
  data() {
    return {
      showReplies: false,
      confimDelete: false,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
    }),

    totalRepliesIconName() {
      return this.showReplies ? 'arrow_drop_up' : 'arrow_drop_down';
    },

    showOwnCommentOperation() {
      return (
        this.currentUser &&
        this.currentUser.id === this.item.user.id &&
        this.showOperation
      );
    },

    deleteButtonText() {
      return this.confimDelete ? '确定删除' : '删除';
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
    ...mapMutations({
      removeCommentItem: 'comment/index/removeCommentItem',
    }),

    ...mapActions({
      pushMessage: 'notification/pushMessage',
      getComments: 'comment/index/getComments',
      deleteComment: 'comment/destroy/deleteComment',
    }),

    onClickTotalRepliesButton() {
      this.showReplies = !this.showReplies;
      this.$emit('toggle-replies', this.showReplies);
    },

    async onClickDeleteButton() {
      if (this.confimDelete) {
        try {
          await this.deleteComment({ commentId: this.item.id });
          this.removeCommentItem(this.item.id);
        } catch (error) {
          this.pushMessage({ content: error.data.message });
        }
      }

      this.confimDelete = !this.confimDelete;
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
@import './styles/comment-list-item-actions.css';
</style>
