<template>
  <div class="post-create">
    <FileCreate @change="onChangeFileCreate" />
    <PostTitleField />
    <PostContentField />
    <PostTagField :postId="postId" v-if="postId" />
    <PostStatusField />
    <PostActions
      @update="submitUpdatePost"
      @create="submitCreatePost"
      size="large"
      :useDeleteButton="postId ? true : false"
      @delete="onDeletePost"
    />
    <PostMeta :post="postCache" v-if="postCache" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import PostTagField from '@/post/components/post-tag-field.vue';
import PostTitleField from '@/post/components/post-title-field.vue';
import PostContentField from '@/post/components/post-content-field.vue';
import PostActions from '@/post/components/post-actions.vue';
import PostMeta from '@/post/components/post-meta.vue';
import FileCreate from '@/file/create/file-create.vue';
import { getImageBase64 } from '@/file/file.service';
import PostStatusField from '@/post/components/post-status-field.vue';

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
    return {
      postCache: null,
    };
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
      selectedFile: 'file/create/selectedFile',
      isLoggedIn: 'auth/isLoggedIn',
      status: 'post/create/status',
    }),
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

    title() {
      if (!this.title) {
        this.setUnsaved(false);
      }
    },

    content() {
      if (!this.content) {
        this.setUnsaved(false);
      }
    },

    post(newValue) {
      if (newValue) {
        this.postCache = newValue;
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
      setUnsaved: 'post/create/setUnsaved',
      setSelectedFile: 'file/create/setSelectedFile',
      setPreviewImage: 'file/create/setPreviewImage',
      setStatus: 'post/create/setStatus',
      setAudit: 'post/create/setAudit',
    }),

    ...mapActions({
      createPost: 'post/create/createPost',
      pushMessage: 'notification/pushMessage',
      getPostById: 'post/show/getPostById',
      updatePost: 'post/edit/updatePost',
      deletePost: 'post/destroy/deletePost',
      createFile: 'file/create/createFile',
    }),

    async submitCreatePost() {
      if (!this.isLoggedIn) {
        return this.pushMessage({ content: '请先登录' });
      }

      try {
        const status = this.status ? this.status : 'draft';

        await this.createPost({
          data: {
            title: this.title,
            content: this.content,
            status,
          },
          file: this.selectedFile,
        });

        this.$router.push({
          name: 'postCreate',
          query: { post: this.postId },
        });

        this.setUnsaved(false);

        this.getPost(this.postId);
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    async getPost(postId) {
      try {
        await this.getPostById(postId);

        const { title, content, tags, file, status, audit } = this.post;

        this.setTitle(title);
        this.setContent(content);
        this.setPostId(postId);
        this.setTags(tags);
        this.setStatus(status);
        this.setAudit(audit);

        if (file) {
          const imageData = await getImageBase64(file.size.large);

          this.setPreviewImage(imageData);
        }
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    reset() {
      this.setTitle('');
      this.setContent('');
      this.setPostId(null);
      this.setTags(null);
      this.setUnsaved(false);
      this.setSelectedFile(null);
      this.setPreviewImage(null);
      this.postCache = null;
      this.setStatus(null);
      this.setAudit(null);
    },

    async submitUpdatePost() {
      const status = this.status ? this.status : 'draft';

      try {
        await this.updatePost({
          postId: this.postId,
          data: {
            title: this.title,
            content: this.content,
            status,
          },
          file: this.selectedFile,
        });

        this.pushMessage({ content: '内容更新完成' });

        this.setUnsaved(false);

        this.getPost(this.postId);
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    async onDeletePost() {
      try {
        await this.deletePost({ postId: this.postId });

        this.$router.push({ name: 'postCreate' });

        this.pushMessage({ content: '成功删除内容' });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    onChangeFileCreate(files) {
      const file = files[0];

      if (!file) return;

      if (!this.title) {
        this.setTitle(file.name.split('.')[0]);
      }
    },

    async submitCreateFile() {
      if (!this.isLoggedIn) {
        return this.pushMessage({ content: '请先登录' });
      }

      try {
        await this.createFile({ postId: this.postId, file: this.selectedFile });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    PostStatusField,
    FileCreate,
    PostMeta,
    PostActions,
    PostContentField,
    PostTitleField,
    PostTagField,
  },
});
</script>

<style scoped>
@import './styles/post-create.css';
</style>
