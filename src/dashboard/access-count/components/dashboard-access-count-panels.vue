<template>
  <div class="dashboard-access-count-panels">
    <DashboardAccessCountPanelChart />
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
import DashboardAccessCountPanelChart from '@/dashboard/access-count/components/dashboard-access-count-panel-chart.vue';

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
      dateTimeRange: 'dashboard/accessCount/dateTimeRange',
      currentAction: 'dashboard/accessCount/currentAction',
    }),
  },

  /**
   * 已创建
   */
  created() {
    const {
      query: { dateTimeRange, action },
    } = this.$route;

    this.updateRouterQuery();

    if (dateTimeRange && dateTimeRange !== '1-day') {
      this.setDateTimeRange(dateTimeRange);
    } else {
      this.submitGetAccessCounts();
    }

    if (action) {
      this.setCurrentAction(action);
    }
  },

  watch: {
    dateTimeRange() {
      this.updateRouterQuery();
      this.submitGetAccessCounts();
    },

    currentAction() {
      this.updateRouterQuery();
    },

    $route(value) {
      const {
        name,
        query: { dateTimeRange },
      } = value;

      if (name === 'dashboardAccessCount' && !dateTimeRange) {
        this.setDateTimeRange('1-day');
      }
    },
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setDateTimeRange: 'dashboard/accessCount/setDateTimeRange',
      setCurrentAction: 'dashboard/accessCount/setCurrentAction',
    }),

    ...mapActions({
      getAccessCounts: 'dashboard/accessCount/getAccessCounts',
      pushMessage: 'notification/pushMessage',
    }),

    async submitGetAccessCounts() {
      try {
        await this.getAccessCounts({ dateTimeRange: this.dateTimeRange });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    updateRouterQuery() {
      this.$router.replace({
        query: {
          dateTimeRange: this.dateTimeRange,
          action: this.currentAction,
        },
      });
    },
  },

  /**
   * 使用组件
   */
  components: {
    DashboardAccessCountPanelChart,
    DashboardAccessCountPanel,
  },
});
</script>

<style scoped>
@import './styles/dashboard-access-count-panels.css';
</style>
