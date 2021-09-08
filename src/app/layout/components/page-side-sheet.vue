<template>
  <div class="page-side-sheet" v-if="sideSheetComponent">
    <CloseButton @click="onClickCloseButton"></CloseButton>
    <component :is="sideSheetComponent"></component>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import UserCommentSideSheet from '@/user/comment/components/user-comment-side-sheet.vue';
import CloseButton from '@/app/components/close-button.vue';

export default defineComponent({
  name: 'PageSideSheet',

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
  computed: {
    ...mapGetters({
      sideSheetComponent: 'layout/sideSheetComponent',
    }),
  },

  /**
   * 已创建
   */
  created() {
    // 按下Esc键时关闭页面侧板组件
    if (window) {
      window.addEventListener('keyup', this.onKeyUpWindow);
    }
  },

  /**
   * 取消挂载
   */
  unmounted() {
    if (window) {
      window.removeEventListener('keyup', this.onKeyUpWindow);
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      resetSideSheet: 'layout/resetSideSheet',
    }),

    onClickCloseButton() {
      this.resetSideSheet();
    },

    onKeyUpWindow(event) {
      if (event.key === 'Escape') {
        this.resetSideSheet();
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    UserCommentSideSheet,
    CloseButton,
  },
});
</script>

<style scoped>
@import './styles/page-side-sheet.css';
</style>
