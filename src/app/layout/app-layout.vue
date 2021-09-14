<template>
  <div :class="['page', theme]">
    <PageHeader></PageHeader>
    <PageAside></PageAside>
    <div class="page-main">
      <slot></slot>
      <PageSideSheet
        @scroll="onScrollPageSideSheet"
        ref="pageSideSheet"
      ></PageSideSheet>
    </div>
    <AppNotification></AppNotification>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import PageHeader from '@/app/layout/components/page-header.vue';
import PageAside from '@/app/layout/components/page-aside.vue';
import AppNotification from '@/app/notification/app-notification.vue';
import { getStroage } from '../app.service';
import PageSideSheet from './components/page-side-sheet.vue';

export default defineComponent({
  name: 'AppLayout',

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
      theme: 'layout/theme',
    }),
  },

  /**
   * 已创建
   */
  created() {
    // 主题
    const theme = getStroage('theme');

    if (theme) {
      this.setTheme(theme);
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setTheme: 'layout/setTheme',
      setSideSheetTouchDown: 'layout/setSideSheetTouchDown',
    }),

    onScrollPageSideSheet() {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = this.$refs.pageSideSheet.$el;

      if (scrollTop + clientHeight === scrollHeight) {
        this.setSideSheetTouchDown(true);
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    PageHeader,
    PageAside,
    AppNotification,
    PageSideSheet,
  },
});
</script>

<style scoped></style>
