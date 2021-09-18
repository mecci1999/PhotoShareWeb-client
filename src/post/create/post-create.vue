<template>
  <div class="post-create">
    <PostTitleField />
    <PostContentField />
    <PostTagField :postId="postId" />
    <button class="button large" @click="onClickSubmitButton">
      {{ submitButtonText }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import PostTagField from '@/post/components/post-tag-field.vue';
import PostTitleField from '@/post/components/post-title-field.vue';
import PostContentField from '@/post/components/post-content-field.vue';

export default defineComponent({
  name: 'PostCreate',

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
      title: 'post/create/title',
      content: 'post/create/content',
      postId: 'post/create/postId',
      post: 'post/show/post',
    }),

    submitButtonText() {
      return this.postId ? '更新' : '发布';
    },
  },

  /**
   * 监视
   */
  watch: {
    $route(to) {
      const { post: postId } = to.query;

      if (postId) {
        this.getPost(parseInt(postId, 10));
      } else {
        this.reset();
      }
    },
  },

  /**
   * 已创建
   */
  created() {
    const { post: postId } = this.$route.query;

    if (postId) {
      this.getPost(parseInt(postId, 10));
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setTags: 'post/edit/setTags',
      setTitle: 'post/create/setTitle',
      setContent: 'post/create/setContent',
      setPostId: 'post/create/setPostId',
    }),

    ...mapActions({
      createPost: 'post/create/createPost',
      pushMessage: 'notification/pushMessage',
      getPostById: 'post/show/getPostById',
      updatePost: 'post/edit/updatePost',
    }),

    onClickSubmitButton() {
      if (!this.title.trim()) {
        this.pushMessage({ content: '内容标题不能为空' });
        return;
      }

      if (this.postId) {
        this.submitUpdatePost();
      } else {
        this.submitCreatePost();
      }
    },

    async submitCreatePost() {
      try {
        await this.createPost({
          data: {
            title: this.title,
            content: this.content,
          },
        });

        this.$router.push({
          name: 'postCreate',
          query: { post: this.postId },
        });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    async getPost(postId) {
      try {
        await this.getPostById(postId);

        const { title, content, tags } = this.post;

        this.setTitle(title);
        this.setContent(content);
        this.setPostId(postId);
        this.setTags(tags);
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    reset() {
      this.setTitle('');
      this.setContent('');
      this.setPostId(null);
    },

    async submitUpdatePost() {
      try {
        await this.updatePost({
          postId: this.postId,
          data: {
            title: this.title,
            content: this.content,
          },
        });

        this.pushMessage({ content: '内容更新完成' });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    PostContentField,
    PostTitleField,
    PostTagField,
  },
});
</script>

<style scoped>
@import './styles/post-create.css';
</style>
