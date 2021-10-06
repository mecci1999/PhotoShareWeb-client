<template>
  <div class="dashboard-access-count">
    <DashboardAccessCountPanels />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import DashboardAccessCountPanels from '@/dashboard/access-count/components/dashboard-access-count-panels.vue';

export default defineComponent({
  name: 'DashboardAccessCount',

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
  async created() {
    //
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({}),
  },

  /**
   * 使用组件
   */
  components: {
    DashboardAccessCountPanels,
  },
});
</script>

<style scoped>
@import './styles/dashboard-access-count.css';
</style>
