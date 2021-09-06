<template>
  <div :class="postListClasses">
    <PostListItem v-for="post in posts" :item="post" :key="post.id" />
    <template v-if="loading">
      <PostListItemSkeleton
        v-for="number in 20"
        :key="number"
      ></PostListItemSkeleton>
    </template>
  </div>
</template>

<script>
import { getStroage } from '@/app/app.service';
import { defineComponent } from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import PostListItem from './post-list-item.vue';
import PostListItemSkeleton from './post-list-item-skeleton.vue';

export default defineComponent({
  props: {
    sort: {
      type: String,
    },

    filter: {
      type: Object,
    },
  },

  data() {
    return {
      prevScrollTop: 0,
    };
  },

  /**
   * 监视
   */
  watch: {
    filter() {
      this.getPosts({ sort: this.sort, filter: this.filter });
    },
  },

  async created() {
    await this.getPosts({ sort: this.sort, filter: this.filter });

    // 从本地存储中，获取内容页面布局数据
    const layout = getStroage('post-list-layout');

    // 进行判断
    if (layout) {
      this.setLayout(layout);
    } else {
      this.setLayout('flow');
    }

    if (window) {
      window.addEventListener('scroll', this.onScrollWindow);
      window.scrollTo({ top: 0 });
    }
  },

  // 取消挂载
  unmounted() {
    if (window) {
      window.removeEventListener('scroll', this.onScrollWindow);
    }
  },

  computed: {
    ...mapGetters({
      loading: 'post/index/loading',
      posts: 'post/index/posts',
      layout: 'post/index/layout',
      hasMore: 'post/index/hasMore',
    }),

    postListClasses() {
      return ['post-list', this.layout];
    },
  },

  methods: {
    ...mapActions({
      getPosts: 'post/index/getPosts',
    }),

    ...mapMutations({
      setLayout: 'post/index/setLayout',
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
          this.getPosts({ sort: this.sort, filter: this.filter });
        }

        this.prevScrollTop = scrollTop;
      }
    },
  },

  components: {
    PostListItem,
    PostListItemSkeleton,
  },
});
</script>
<style scoped>
@import './styles/post-list.css';
</style>
