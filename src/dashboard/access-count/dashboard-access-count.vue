<template>
  <div class="dashboard-access-count">
    <DashboardAccessCountFilterDatetime />
    <DashboardAccessCountPanels />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import { socket } from '@/app/app.service';
import DashboardAccessCountPanels from '@/dashboard/access-count/components/dashboard-access-count-panels.vue';
import DashboardAccessCountFilterDatetime from '@/dashboard/access-count/components/dashboard-access-count-filter-datetime.vue';

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
    socket.on('accessLogCreated', this.onAccessLogCreated);
  },

  /**
   * 取消挂载
   */
  unmounted() {
    socket.off('accessLogCreated', this.onAccessLogCreated);
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      increaseAccessCount: 'dashboard/accessCount/increaseAccessCount',
    }),

    onAccessLogCreated(action) {
      this.increaseAccessCount(action);
    },
  },

  /**
   * 使用组件
   */
  components: {
    DashboardAccessCountFilterDatetime,
    DashboardAccessCountPanels,
  },
});
</script>

<style scoped>
@import './styles/dashboard-access-count.css';
</style>
