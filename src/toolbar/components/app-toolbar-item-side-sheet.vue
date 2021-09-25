<template>
  <div class="app-toolbar-item-side-sheet">
    <button class="button basic" @click="onClickSideSheetButton">
      <AppIcon name="vertical_split"></AppIcon>
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'AppToolbarItemSideSheet',

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
  computed: {},

  /**
   * 已创建
   */
  created() {
    if (window) {
      window.addEventListener('keydown', this.onKeyDownWindow);
    }
  },

  /**
   * 取消挂载
   */
  unmounted() {
    if (window) {
      window.removeEventListener('keydown', this.onKeyDownWindow);
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      switchSideSheet: 'layout/switchSideSheet',
    }),

    onKeyDownWindow(event) {
      const isCommandB = event.mataKey && event.key === 'b';
      const isCtrlB = event.ctrlKey && event.key === 'b';

      if (isCommandB || isCtrlB) {
        this.switchSideSheet();
      }
    },

    onClickSideSheetButton() {
      this.switchSideSheet();
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppIcon,
  },
});
</script>

<style scoped>
@import './styles/app-toolbar-item-side-sheet.css';
</style>
