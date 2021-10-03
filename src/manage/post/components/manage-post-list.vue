<template>
  <div class="manage-post-list" ref="managePostList">
    <ManagePostListItem v-for="post in posts" :key="post.id" :item="post" />
    <template v-if="loading">
      <ManagePostListItemSkeleton v-for="number in 20" :key="number" />
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import ManagePostListItem from '@/manage/post/components/manage-post-list-item.vue';
import ManagePostListItemSkeleton from '@/manage/post/components/manage-post-list-item-skeleton.vue';

export default defineComponent({
  name: 'ManagePostList',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      prevScrollTop: 0,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      loading: 'post/index/loading',
      posts: 'post/index/posts',
      hasMore: 'post/index/hasMore',
    }),

    filter() {
      return {
        user: this.currentUser ? this.currentUser.id : null,
        action: 'published',
      };
    },
  },

  /**
   * 已创建
   */
  created() {
    if (this.currentUser) {
      this.getManagedPosts();
    }

    if (window) {
      window.addEventListener('scroll', this.onScrollWindow);
      window.scroll({ top: 0 });
      window.addEventListener('keydown', this.onKeyDownWindow);
    }
  },

  /**
   * 取消挂载
   */
  unmounted() {
    if (window) {
      window.removeEventListener('scroll', this.onScrollWindow);
      window.removeEventListener('keydown', this.onKeyDownWindow);
    }
  },

  /**
   * 已更新
   */
  updated() {
    if (document) {
      // 内容高度
      const { clientHeight: documentHeight } = document.documentElement;

      // 组件高度
      const { clientHeight: componentHeight } = this.$refs.managePostList;

      // 做出判断
      if (
        componentHeight < documentHeight + 200 &&
        this.hasMore &&
        !this.loading
      ) {
        this.getManagedPosts();
      }
    }
  },

  watch: {
    filter() {
      this.getManagedPosts();
    },
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({}),
    ...mapActions({
      getPosts: 'post/index/getPosts',
      deleteSelectedPosts: 'manage/select/deleteSelectedPosts',
    }),

    onScrollWindow() {
      if (document) {
        const {
          scrollTop,
          scrollHeight,
          clientHeight,
        } = document.documentElement;

        const height = clientHeight + scrollTop + 200;
        const touchDown = scrollHeight - height < 0;
        const scrollDown = scrollTop > this.prevScrollTop;

        if (scrollDown && touchDown && !this.loading && this.hasMore) {
          this.getManagedPosts();
        }

        this.prevScrollTop = scrollTop;
      }
    },

    onKeyDownWindow(event) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Backspace') {
        this.deleteSelectedPosts();
      }
    },

    getManagedPosts() {
      this.getPosts({ filter: this.filter, manage: 'true' });
    },
  },

  /**
   * 使用组件
   */
  components: {
    ManagePostListItemSkeleton,
    ManagePostListItem,
  },
});
</script>

<style scoped>
@import './styles/manage-post-list.css';
</style>
