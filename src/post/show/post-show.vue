<template>
  <PostShowSkeleton
    :class="postShowClasses"
    v-if="!showPost"
  ></PostShowSkeleton>
  <div :class="postShowClasses" v-if="showPost">
    <PostShowMedia :post="post" @click="onClickPostShowMedia"></PostShowMedia>
    <div class="section meta actions">
      <PostShowFileMeta :post="post"></PostShowFileMeta>
      <PostShowActions :post="post"></PostShowActions>
    </div>
    <PostShowHeader :post="post"></PostShowHeader>
    <PostShowContent :post="post"></PostShowContent>
    <PostShowTags v-if="post.tags" :tags="post.tags"></PostShowTags>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { defineComponent } from 'vue';
import PostShowMedia from './components/post-show-media.vue';
import { getStroage, socket } from '@/app/app.service';
import PostShowHeader from './components/post-show-header.vue';
import PostShowContent from './components/post-show-content.vue';
import PostShowActions from './components/post-show-actions.vue';
import PostShowFileMeta from './components/post-show-file-meta.vue';
import PostShowTags from './components/post-show-tags.vue';
import PostShowSkeleton from './components/post-show-skeleton.vue';

export default defineComponent({
  title() {
    if (this.showPost) {
      return this.post.title;
    }
  },

  props: {
    postId: String,
  },

  created() {
    this.getPostById(this.postId);

    this.getPosts({});

    this.setShowPostShowNavigator(true);

    //布局
    const layout = getStroage('post-show-layout');

    if (layout) {
      this.setLayout(layout);
    }

    if (window) {
      window.addEventListener('keyup', this.onKeyUpWindow);
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
    if (window) {
      window.removeEventListener('keyup', this.onKeyUpWindow);
    }

    socket.off('userLikePostCreated', this.onUserLikePostCreated);
    socket.off('userLikePostDeleted', this.onUserLikePostDeleted);
    socket.off('commentCreated', this.onCommentCreated);
    socket.off('commentDeleted', this.onCommentDeleted);
  },

  computed: {
    ...mapGetters({
      loading: 'post/show/loading',
      post: 'post/show/post',
      layout: 'post/show/layout',
      sideSheetComponent: 'layout/sideSheetComponent',
      posts: 'post/index/posts',
      isSideSheetActive: 'layout/isSideSheetActive',
      showPostShowNavigator: 'toolbar/showPostShowNavigator',
    }),

    showPost() {
      return !this.loading && this.post;
    },

    postShowClasses() {
      return ['post-show', this.layout, { aside: this.isSideSheetActive }];
    },
  },

  methods: {
    ...mapActions({
      getPostById: 'post/show/getPostById',
      getPosts: 'post/index/getPosts',
    }),

    ...mapMutations({
      setLayout: 'post/show/setLayout',
      setPostTotalLikes: 'post/show/setPostTotalLikes',
      setPostTotalComments: 'post/show/setPostTotalComments',
      setShowPostShowNavigator: 'toolbar/setShowPostShowNavigator',
    }),

    onClickPostShowMedia() {
      this.setLayout(`${this.layout ? '' : 'flow'}`);
    },

    onKeyUpWindow(event) {
      if (event.metaKey || event.ctrlKey) return;

      switch (event.key) {
        case 'b':
          if (this.posts.length) {
            this.$router.back();
          }
          break;
      }
    },

    onUserLikePostCreated({ socketId, postId }) {
      if (socket.id === socketId) return;

      this.setPostTotalLikes({
        postId,
        actionType: 'increase',
      });
    },

    onUserLikePostDeleted({ socketId, postId }) {
      if (socket.id === socketId) return;

      this.setPostTotalLikes({
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
    PostShowMedia,
    PostShowHeader,
    PostShowContent,
    PostShowActions,
    PostShowFileMeta,
    PostShowTags,
    PostShowSkeleton,
  },
});
</script>

<style scoped>
@import './styles/post-show.css';
</style>
