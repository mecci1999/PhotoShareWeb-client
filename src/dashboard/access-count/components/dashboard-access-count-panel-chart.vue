<template>
  <div class="dashboard-access-count-panel chart large">
    <div class="header">
      {{ chartPanelTitle }}
    </div>
    <div class="media">
      <canvas width="400" height="260" ref="accessCountChartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Chart from 'chart.js';

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
    return {
      accessCountChart: null,
    };
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
   * 挂载
   */
  mounted() {
    this.createChart();
  },

  /**
   * 监视
   */
  watch: {
    accessCount() {
      this.updateChart();
    },

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

    createChart() {
      const context = this.$refs.accessCountChartCanvas;

      const type = 'line';

      const data = {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
          },
        ],
      };

      const options = {
        legend: {
          display: false,
        },
      };

      this.accessCountChart = new Chart(context, { type, data, options });
    },

    updateChart() {
      const [datetimeArray, valueArray] = this.accessCount.dateset;

      this.accessCountChart.data.labels = datetimeArray;
      this.accessCountChart.data.datasets[0].data = valueArray;
      this.accessCountChart.update();
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
