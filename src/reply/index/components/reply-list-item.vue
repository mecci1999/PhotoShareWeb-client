<template>
  <div class="reply-list-item">
    <div class="thumbnail">
      <UserAvatar :user="item.user" link="user"></UserAvatar>
    </div>
    <div class="content">
      <ReplyListItemMeta :item="item"></ReplyListItemMeta>
      <ReplyListItemContent
        :item="reply"
        @click="onClickReplyListItemContent"
        v-if="!isEditing"
      ></ReplyListItemContent>
      <CommentEdit
        v-if="isEditing"
        :comment="item"
        @updated="onUpdatedReply"
      ></CommentEdit>
      <ReplyListItemActions
        :item="item"
        :showOperation="showOperation"
        :comment="comment"
        :isEditing="isEditing"
        @editing="onEditingReply"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import ReplyListItemMeta from './reply-list-item-meta.vue';
import ReplyListItemContent from './reply-list-item-content.vue';
import ReplyListItemActions from '@/reply/index/components/reply-list-item-actions.vue';
import CommentEdit from '@/comment/edit/comment-edit.vue';

export default defineComponent({
  name: 'ReplyListItem',

  /**
   * 属性
   */
  props: {
    item: {
      type: Object,
    },

    comment: {
      type: Object,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      showOperation: false,
      isEditing: false,
      reply: this.item,
    };
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
    onClickReplyListItemContent() {
      this.showOperation = !this.showOperation;
    },

    onEditingReply() {
      this.isEditing = !this.isEditing;
    },

    onUpdatedReply(data) {
      this.reply.content = data;
      this.isEditing = false;
    },
  },

  /**
   * 使用组件
   */
  components: {
    ReplyListItemActions,
    UserAvatar,
    ReplyListItemMeta,
    ReplyListItemContent,
    CommentEdit,
  },
});
</script>

<style scoped>
@import './styles/reply-list-item.css';
</style>
