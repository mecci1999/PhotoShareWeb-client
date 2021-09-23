<template>
  <div class="manage-post-list">
    <div v-for="post in posts" :key="post.id">
      <img :src="post.file.size.thumbnail" style="width: 100%" />
      {{ post.user.name }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

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
    return {};
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
      this.getPosts({ filter: this.filter });
    }
  },

  watch: {
    filter() {
      this.getPosts({ filter: this.filter });
    },
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({}),
    ...mapActions({
      getPosts: 'post/index/getPosts',
    }),
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/manage-post-list.css';
</style>
