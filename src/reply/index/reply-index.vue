<template>
  <div class="reply-index">
    <ReplyList :list="replies(comment.id)" :comment="comment"></ReplyList>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import ReplyList from './components/reply-list.vue';
import { socket } from '@/app/app.service';

export default defineComponent({
  name: 'ReplyIndex',

  /**
   * 属性
   */
  props: {
    comment: {
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
      loading: 'reply/index/loading',
      replies: 'reply/index/replies',
    }),
  },

  /**
   * 已创建
   */
  created() {
    // 获取回复列表
    this.getReplies(this.comment.id);

    socket.on('commentReplyCreated', this.onCommentReplyCreated);
    socket.on('commentReplyDeleted', this.onCommentReplyDeleted);
    socket.on('commentReplyUpdated', this.onCommentReplyUpdated);
  },

  /**
   * 取消挂载
   */
  unmounted() {
    socket.off('commentReplyCreated', this.onCommentReplyCreated);
    socket.off('commentReplyDeleted', this.onCommentReplyDeleted);
    socket.off('commentReplyUpdated', this.onCommentReplyUpdated);
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      getReplies: 'reply/index/getReplies',
    }),

    ...mapMutations({
      addReplyItem: 'reply/index/addReplyItem',
      removeReplyItem: 'reply/index/removeReplyItem',
      setReplyItemContent: 'reply/index/setReplyItemContent',
    }),

    onCommentReplyCreated({ reply, socketId }) {
      if (socket.id === socketId) return;

      this.addReplyItem(reply);
    },

    onCommentReplyDeleted({ reply, socketId }) {
      if (socket.id === socketId) return;

      const {
        id: replyId,
        repliedComment: { id: commentId },
      } = reply;

      this.removeReplyItem({ replyId, commentId });
    },

    onCommentReplyUpdated({ reply, socketId }) {
      if (socket.id === socketId) return;

      this.setReplyItemContent(reply);
    },
  },

  /**
   * 使用组件
   */
  components: {
    ReplyList,
  },
});
</script>

<style scoped>
@import './styles/reply-index.css';
</style>
