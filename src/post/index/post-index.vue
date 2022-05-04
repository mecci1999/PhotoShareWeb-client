<template>
  <PostListFilters
    v-if="filterItems.length"
    :filters="filterItems"
  ></PostListFilters>
  <PostList :sort="sort" :filter="filter" />
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import PostList from './components/post-list.vue';
import PostListFilters from './components/post-list-filters.vue';
import { socket } from '@/app/app.service';

export default defineComponent({
  props: {
    sort: {
      type: String,
    },

    filter: {
      type: Object,
    },
  },

  computed: {
    ...mapGetters({
      filterItems: 'post/index/filterItems',
      currentUser: 'user/currentUser',
    }),
  },

  created() {
    // 用户封禁状态
    if (this.currentUser && this.currentUser.status === 'banned') {
      // 提示用户已被封禁
      this.pushMessage({ content: '您因发布违规内容，当前账号处于封禁状态。' });
    }

    socket.on('userLikePostCreated', this.onUserLikePostCreated);
    socket.on('userLikePostDeleted', this.onUserLikePostDeleted);
    socket.on('commentCreated', this.onCommentCreated);
    socket.on('commentDeleted', this.onCommentDeleted);
  },

  /**
   * 取消挂载
   */
  unmounted() {
    socket.off('userLikePostCreated', this.onUserLikePostCreated);
    socket.off('userLikePostDeleted', this.onUserLikePostDeleted);
    socket.off('commentCreated', this.onCommentCreated);
    socket.off('commentDeleted', this.onCommentDeleted);
  },

  title() {
    let title;
    if (this.$route.name === 'postIndexPopular') {
      title = '热门';
    } else {
      title = '最近';
    }
    return title;
  },

  methods: {
    ...mapMutations({
      setPostItemTotalLikes: 'post/index/setPostItemTotalLikes',
      setPostItemTotalComments: 'post/index/setPostItemTotalComments',
    }),

    ...mapActions({
      pushMessage: 'notification/pushMessage',
    }),

    onUserLikePostCreated({ postId, socketId }) {
      if (socket.id === socketId) return;

      this.setPostItemTotalLikes({
        postId,
        actionType: 'increase',
      });
    },

    onUserLikePostDeleted({ postId, socketId }) {
      if (socket.id === socketId) return;

      this.setPostItemTotalLikes({
        postId,
        actionType: 'decrease',
      });
    },

    onCommentCreated({ comment }) {
      this.setPostItemTotalComments({
        postId: comment.post.id,
        actionType: 'increase',
      });
    },

    onCommentDeleted({ comment }) {
      this.setPostItemTotalComments({
        postId: comment.post.id,
        actionType: 'decrease',
      });
    },
  },

  components: {
    PostList,
    PostListFilters,
  },
});
</script>
