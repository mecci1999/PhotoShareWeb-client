<template>
  <div class="dashboard-access-count-panel">
    <div class="header">
      {{ accessCount.title }}
    </div>
    <div class="content">
      {{ accessCount.value }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DashboardAccessCountPanel',

  /**
   * 属性
   */
  props: {
    accessCount: {
      type: Object,
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
  components: {},
});
</script>

<style scoped>
@import './styles/dashboard-access-count-panel.css';
</style>
