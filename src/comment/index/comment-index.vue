<template>
  <div class="comment-index">
    <CommentList :filter="filter"></CommentList>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import CommentList from './components/comment-list.vue';
import { socket } from '@/app/app.service';

export default defineComponent({
  name: 'CommentIndex',

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
    }),

    filter() {
      return this.sideSheetProps.filter;
    },
  },

  /**
   * 已创建
   */
  created() {
    socket.on('commentCreated', this.onCommentCreated);
  },

  /**
   * 取消挂载
   */
  unmounted() {
    socket.off('commentCreated', this.onCommentCreated);
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      addCommentItem: 'comment/index/addCommentItem',
    }),

    onCommentCreated({ socketId, comment }) {
      if (socket.id === socketId) return;

      this.addCommentItem(comment);
    },
  },

  /**
   * 使用组件
   */
  components: {
    CommentList,
  },
});
</script>

<style scoped>
@import './styles/comment-index.css';
</style>
