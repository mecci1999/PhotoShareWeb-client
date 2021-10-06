<template>
  <div class="dashboard-access-count-panels">
    <DashboardAccessCountPanel
      v-for="accessCount in accessCountList"
      :key="accessCount.action"
      :accessCount="accessCount"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import DashboardAccessCountPanel from '@/dashboard/access-count/components/dashboard-access-count-panel.vue';

export default defineComponent({
  name: 'DashboardAccessCountPanels',

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
      accessCountList: 'dashboard/accessCount/accessCountList',
    }),
  },

  /**
   * 已创建
   */
  created() {
    this.submitGetAccessCounts();
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({}),

    ...mapActions({
      getAccessCounts: 'dashboard/accessCount/getAccessCounts',
      pushMessage: 'notification/pushMessage',
    }),

    async submitGetAccessCounts() {
      try {
        await this.getAccessCounts();
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    DashboardAccessCountPanel,
  },
});
</script>

<style scoped>
@import './styles/dashboard-access-count-panels.css';
</style>
