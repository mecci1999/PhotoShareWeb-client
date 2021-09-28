<template>
  <PostListFilters
    v-if="filterItems.length"
    :filters="filterItems"
  ></PostListFilters>
  <PostList :sort="sort" :filter="filter" />
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
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
    }),
  },

  created() {
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
