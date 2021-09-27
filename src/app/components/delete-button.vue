<template>
  <button :class="deleteButtonClasses" @click="onClickDeleteButton">
    {{ deleteButtonText }}
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DeleteButton',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      confirmDelete: false,
      timeoutId: null,
    };
  },

  emits: ['delete'],

  /**
   * 计算属性
   */
  computed: {
    deleteButtonText() {
      return this.confirmDelete ? '确定删除' : '删除';
    },

    deleteButtonClasses() {
      return ['button', 'red', { outline: !this.confirmDelete }];
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
          this.confirmDelete = false;
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
@import './styles/delete-button.css';
</style>
