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
      dateTimeRange: 'dashboard/accessCount/dateTimeRange',
    }),
  },

  /**
   * 已创建
   */
  created() {
    const {
      query: { dateTimeRange },
    } = this.$route;

    this.$router.replace({ query: { dateTimeRange: this.dateTimeRange } });

    if (dateTimeRange && dateTimeRange !== '1-day') {
      this.setDateTimeRange(dateTimeRange);
    } else {
      this.submitGetAccessCounts();
    }
  },

  watch: {
    dateTimeRange(value) {
      this.$router.replace({ query: { dateTimeRange: value } });
      this.submitGetAccessCounts();
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
