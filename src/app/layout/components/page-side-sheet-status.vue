<template>
  <div class="page-side-sheet-status">
    <div class="icon">
      <AppIcon name="error_outline"></AppIcon>
    </div>
    <div class="content">{{ content }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'PageSideSheetStatus',

  /**
   * 属性
   */
  props: {
    content: {
      type: String,
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
  computed: {},

  /**
   * 已创建
   */
  created() {
    //
  },

  /**
   * 组件方法
   */
  methods: {},

  /**
   * 使用组件
   */
  components: {
    AppIcon,
  },
});
</script>

<style scoped>
@import './styles/page-side-sheet-status.css';
</style>
