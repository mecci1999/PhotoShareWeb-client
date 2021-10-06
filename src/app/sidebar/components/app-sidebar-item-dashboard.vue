<template>
  <div class="app-sidebar-item dashboard">
    <router-link class="link" :to="dashboardLinkTo">
      <AppIcon name="analytics"></AppIcon>
      <div class="text">数据</div>
    </router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'AppSidebarItemDashboard',

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
    dashboardLinkTo() {
      return {
        name: 'dashboardAccessCount',
      };
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
@import './styles/app-sidebar-item-dashboard.css';
</style>
