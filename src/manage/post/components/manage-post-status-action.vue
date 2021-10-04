<template>
  <div class="manage-post-status-action">
    <CircleButton
      :icon="postStatusIcon"
      @click="onClickStatusButton"
      :active="isActive"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import CircleButton from '@/app/components/circle-button.vue';

export default defineComponent({
  name: 'ManagePostStatusAction',

  /**
   * 属性
   */
  props: {
    post: {
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
      hasSelected: 'manage/select/hasSelected',
    }),

    postStatusIcon() {
      let icon;

      switch (this.post.status) {
        case 'draft':
          icon = 'public_off';
          break;
        case 'published':
          icon = 'public';
          break;
      }

      return icon;
    },

    isActive() {
      return this.post && this.post.status === 'published';
    },
  },

  /**
   * 已创建
   */
  created() {
    //
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setPostItem: 'post/index/setPostItem',
    }),

    ...mapActions({
      updatePost: 'post/edit/updatePost',
      pushMessage: 'notification/pushMessage',
      getSelectedPosts: 'manage/select/getSelectedPosts',
    }),

    async onClickStatusButton() {
      const status = this.post.status === 'draft' ? 'published' : 'draft';

      try {
        await this.updatePost({
          postId: this.post.id,
          data: {
            status,
          },
        });

        this.setPostItem({
          id: this.post.id,
          status,
        });

        if (this.hasSelected) {
          this.getSelectedPosts();
        }
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    CircleButton,
  },
});
</script>

<style scoped>
@import './styles/manage-post-status-action.css';
</style>
