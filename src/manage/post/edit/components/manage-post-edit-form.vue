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
      :rows="1"
      v-model="currentEditedPost.content"
      placeholder="描述"
      @dirty="onDirty"
      v-if="isSingleSelect"
    ></TextareaField>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import TextField from '@/app/components/text-field.vue';
import TextareaField from '@/app/components/textarea-field.vue';

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
    onDirty() {
      this.unsaved = true;
    },
  },

  /**
   * 使用组件
   */
  components: {
    TextField,
    TextareaField,
  },
});
</script>

<style scoped>
@import './styles/manage-post-edit-form.css';
</style>
