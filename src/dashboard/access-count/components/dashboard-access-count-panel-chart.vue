<template>
  <div class="dashboard-access-count-panel chart large">
    <div class="header">
      {{ chartPanelTitle }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default defineComponent({
  name: 'DashboardAccessCountPanelChart',

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
      accessCount: 'dashboard/accessCount/accessCount',
      dateTimeRange: 'dashboard/accessCount/dateTimeRange',
      currentAction: 'dashboard/accessCount/currentAction',
    }),

    chartPanelTitle() {
      return this.accessCount ? `${this.accessCount.title}统计图` : '统计图';
    },
  },

  /**
   * 已创建
   */
  created() {
    this.submitGetAccessCountByAction();
  },

  /**
   * 监视
   */
  watch: {
    dateTimeRange() {
      this.submitGetAccessCountByAction();
    },

    currentAction() {
      this.submitGetAccessCountByAction();
    },
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({}),

    ...mapActions({
      getAccessCountByAction: 'dashboard/accessCount/getAccessCountByAction',
      pushMessage: 'notification/pushMessage',
    }),

    async submitGetAccessCountByAction() {
      try {
        await this.getAccessCountByAction({
          dateTimeRange: this.dateTimeRange,
          action: this.currentAction,
        });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/dashboard-access-count-panel-chart.css';
</style>
