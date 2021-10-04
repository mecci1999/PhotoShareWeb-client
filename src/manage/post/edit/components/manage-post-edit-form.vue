<template>
  <div class="manage-post-edit-form">
    <TextField
      v-model="currentEditedPost.title"
      placeholder="标题"
      @dirty="onDirty"
      v-if="isSingleSelect"
    ></TextField>
    <TextareaField
      class="bordered"
      :rows="2"
      v-model="currentEditedPost.content"
      placeholder="描述"
      @dirty="onDirty"
      v-if="isSingleSelect"
    ></TextareaField>
    <PostTagField
      :posts="selectedPosts"
      @updated="onUpdatedPostTagField"
    ></PostTagField>
    <div class="section status">
      <CheckboxField
        v-for="{ text, value } in statusFields"
        :key="value"
        :value="value"
        :text="text"
        name="status"
        type="radio"
        v-model="postStatus"
      />
    </div>
    <div class="actions">
      <DeleteButton @delete="onDeleteButton"></DeleteButton>
      <SubmitButton text="更新" :unsaved="unsaved" @submit="onSubmitButton" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import TextField from '@/app/components/text-field.vue';
import TextareaField from '@/app/components/textarea-field.vue';
import SubmitButton from '@/app/components/submit-button.vue';
import DeleteButton from '@/app/components/delete-button.vue';
import PostTagField from '@/post/components/post-tag-field.vue';
import CheckboxField from '@/app/components/checkbox-field.vue';

export default defineComponent({
  name: 'ManagePostEditForm',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      unsaved: false,

      statusFields: [
        {
          value: 'draft',
          text: '仅自己可见',
        },
        {
          value: 'published',
          text: '公开',
        },
      ],

      selectedStatus: null,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      currentEditedPost: 'manage/select/currentEditedPost',
      isSingleSelect: 'manage/select/isSingleSelect',
      getEditedPost: 'manage/select/getEditedPost',
      selectedPosts: 'manage/select/selectedPosts',
      isMultiSelect: 'manage/select/isMultiSelect',
    }),

    postStatus: {
      get() {
        return this.isMultiSelect
          ? this.selectedStatus
          : this.currentEditedPost.status;
      },

      set(value) {
        if (this.isMultiSelect) {
          this.selectedStatus = value;
        } else {
          this.currentEditedPost.status = value;
        }

        this.unsaved = true;
      },
    },
  },

  /**
   * 已创建
   */
  created() {
    if (this.isMultiSelect) {
      this.selectedStatus = null;
    } else {
      this.selectedStatus = this.currentEditedPost.status;
    }
  },

  /**
   * 监视
   */
  watch: {
    isMultiSelect(value) {
      if (value) {
        this.selectedStatus = null;
      } else {
        this.unsaved = false;
      }
    },
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
      deleteSelectedPosts: 'manage/select/deleteSelectedPosts',
      getSelectedPosts: 'manage/select/getSelectedPosts',
    }),

    onDirty() {
      this.unsaved = true;
    },

    async onSubmitButton() {
      if (!this.unsaved) {
        this.pushMessage({ content: '内容没有发生改变，请继续修改内容' });
        this.unsaved = false;
        return;
      }

      if (this.isMultiSelect) {
        await this.batchUpdatePost();
      } else {
        await this.submitUpdatePost();
      }
    },

    async submitUpdatePost() {
      try {
        await this.updatePost({
          postId: this.currentEditedPost.id,
          data: this.currentEditedPost,
        });

        this.setPostItem(this.currentEditedPost);

        this.unsaved = false;

        this.pushMessage({ content: '更新内容成功' });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    async batchUpdatePost() {
      if (!this.selectedStatus) return;

      for (const post of this.selectedPosts) {
        if (post.status === this.selectedStatus) continue;

        try {
          await this.updatePost({
            postId: post.id,
            data: {
              status: this.selectedStatus,
            },
          });

          this.setPostItem({ id: post.id, status: this.selectedStatus });

          this.unsaved = false;
        } catch (error) {
          continue;
        }
      }

      this.getSelectedPosts();
    },

    onDeleteButton() {
      this.deleteSelectedPosts();
    },

    onUpdatedPostTagField() {
      this.getSelectedPosts();
    },
  },

  /**
   * 使用组件
   */
  components: {
    CheckboxField,
    SubmitButton,
    TextField,
    TextareaField,
    DeleteButton,
    PostTagField,
  },
});
</script>

<style scoped>
@import './styles/manage-post-edit-form.css';
</style>
