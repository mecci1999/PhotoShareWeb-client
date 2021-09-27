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
    <div class="actions">
      <DeleteButton></DeleteButton>
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
    ...mapMutations({
      setPostItem: 'post/index/setPostItem',
    }),

    ...mapActions({
      updatePost: 'post/edit/updatePost',
      pushMessage: 'notification/pushMessage',
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
  },

  /**
   * 使用组件
   */
  components: {
    SubmitButton,
    TextField,
    TextareaField,
    DeleteButton,
  },
});
</script>

<style scoped>
@import './styles/manage-post-edit-form.css';
</style>
