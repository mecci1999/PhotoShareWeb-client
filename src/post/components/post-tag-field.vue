<template>
  <div class="post-tag-field">
    <div class="content">
      <TextField
        placeholder="标签"
        v-model="name"
        @keyup.enter="onKeyUpEnterTag"
      />
      <button class="button basic" @click="onClickAddButton">
        <AppIcon name="add" />
      </button>
    </div>
    <div class="meta" v-if="hasTags">
      <transition-group name="post-tag">
        <PostTag
          v-for="tag in tags"
          :key="tag.id"
          :tag="tag"
          useDeleteButton
          @delete="onDeletePostTag"
        ></PostTag>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';
import TextField from '@/app/components/text-field.vue';
import PostTag from './post-tag.vue';

export default defineComponent({
  name: 'PostTagField',

  /**
   * 属性
   */
  props: {
    postId: {
      type: Number,
    },

    posts: {
      type: Array,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      name: '',
    };
  },

  emits: ['updated'],

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      tags: 'post/edit/tags',
      hasTags: 'post/edit/hasTags',
    }),
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
    ...mapMutations({}),

    ...mapActions({
      createPostTag: 'post/edit/createPostTag',
      pushMessage: 'notification/pushMessage',
      deletePostTag: 'post/edit/deletePostTag',
    }),

    onClickAddButton() {
      if (this.posts) {
        this.batchCreatePostTag();
      } else {
        this.onSubmitCreatePostTag();
      }
    },

    onKeyUpEnterTag() {
      if (this.posts) {
        this.batchCreatePostTag();
      } else {
        this.onSubmitCreatePostTag();
      }
    },

    async batchCreatePostTag() {
      for (const post of this.posts) {
        // 如果要打上的标签存在于当前选中项目的标签列表中，则跳过当前循环。
        if (post.tags && post.tags.some(tag => tag.name === this.name.trim()))
          continue;

        try {
          // 给内容打上标签
          await this.createPostTag({
            postId: post.id,
            data: {
              name: this.name,
            },
          });
        } catch (error) {
          continue;
        }
      }

      this.$emit('updated');
      this.name = '';
    },

    async onSubmitCreatePostTag() {
      try {
        await this.createPostTag({
          postId: this.postId,
          data: {
            name: this.name,
          },
        });

        this.pushMessage({ content: `成功给内容添加 [${this.name}] 标签` });

        this.name = '';
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    async onDeletePostTag(tagId) {
      try {
        await this.deletePostTag({ postId: this.postId, tagId });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    TextField,
    AppIcon,
    PostTag,
  },
});
</script>

<style scoped>
@import './styles/post-tag-field.css';
</style>
