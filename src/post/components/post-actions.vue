<template>
  <div class="post-actions">
    <button
      :class="deleteButtonClasses"
      @click="onClickDeleteButton"
      v-if="useDeleteButton"
    >
      {{ deleteButtonText }}
    </button>
    <button :class="submitButtonClasses" @click="onClickSubmitButton">
      {{ submitButtonText }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  name: 'PostActions',

  /**
   * 属性
   */
  props: {
    size: {
      type: String,
    },

    useDeleteButton: {
      type: Boolean,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      confirmDelete: false,
      timeoutId: null,
    };
  },

  emits: ['update', 'create', 'delete'],

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      postId: 'post/create/postId',
      title: 'post/create/title',
      unsaved: 'post/create/unsaved',
      selectedFile: 'file/create/selectedFile',
    }),

    submitButtonText() {
      return this.postId ? '更新' : '发布';
    },

    submitButtonClasses() {
      return ['button', this.size, { outline: this.unsaved }];
    },

    deleteButtonText() {
      return this.confirmDelete ? '确定删除' : '删除';
    },

    deleteButtonClasses() {
      return ['button', this.size, 'red', { outline: !this.confirmDelete }];
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
    ...mapActions({
      pushMessage: 'notification/pushMessage',
    }),

    onClickSubmitButton() {
      if (!this.selectedFile) {
        this.pushMessage({ content: '请选择上传文件' });
        return;
      }

      if (!this.title.trim()) {
        this.pushMessage({ content: '请输入内容标题' });
        return;
      }

      if (this.postId) {
        this.$emit('update');
      } else {
        this.$emit('create');
      }
    },

    onClickDeleteButton() {
      if (this.timeoutId) {
        clearInterval(this.timeoutId);
      }

      if (this.confirmDelete) {
        this.$emit('delete');
      }

      this.confirmDelete = !this.confirmDelete;

      if (this.confirmDelete) {
        this.timeoutId = setTimeout(() => {
          this.confirmDelete = !this.confirmDelete;
        }, 3000);
      }
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/post-actions.css';
</style>
