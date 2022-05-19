<template>
  <div class="dashboard-content-panel-chart-user">
    <div class="header">
      <div class="title">{{ showHeaderTitle }}</div>
      <div class="data-name">
        <div class="data-name-blue">
          {{ showDataName }}
        </div>
      </div>
    </div>
    <div class="media">
      <canvas width="480" height="180" ref="UserChartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Chart from 'chart.js';

export default defineComponent({
  name: 'DashboardContentPanelChartUser',

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
      accessCount: 'dashboard/user/accessCount',
      currentRange: 'dashboard/user/currentRange',
      currentAction: 'dashboard/user/currentAction',
      dateTimeRange: 'dashboard/user/dateTimeRange',
      // sumAccessCount: 'dashboard/accessCount/sumAccessCount',
    }),

    // 根据时间和动作显示相应的文字
    showHeaderTitle() {
      let yTitle = '';
      let xTitle = '';
      switch (this.currentAction) {
        case 'addIncome':
          yTitle = '收益情况(元)';
          break;
        case 'getPostById':
          yTitle = '作品访问量(次)';
          break;
        case 'createDownload':
          yTitle = '作品下载量(次)';
          break;
        case 'createComment':
          yTitle = '作品新增评论(条)';
          break;
        case 'createUserLikePost':
          yTitle = '作品新增点赞(次)';
          break;
        case 'createPost':
          yTitle = '作品发布量(个)';
          break;
      }

      switch (this.dateTimeRange) {
        case '1-day':
          xTitle = '小时';
          break;
        case '7-day':
          xTitle = '天数';
          break;
        case '1-month':
          xTitle = '天数';
          break;
        case '3-month':
          xTitle = '月数';
          break;
        case '6-month':
          xTitle = '月数';
          break;
        case '1-year':
          xTitle = '月数';
          break;
      }

      return `${yTitle}/${xTitle}`;
    },

    showDataName() {
      let name = '';

      switch (this.currentAction) {
        case 'createPost':
          name = '作品发布量';
          break;
        case 'addIncome':
          name = '收益情况';
          break;
        case 'getPostById':
          name = '作品访问量';
          break;
        case 'createDownload':
          name = '作品下载量';
          break;
        case 'createComment':
          name = '作品新增评论';
          break;
        case 'createUserLikePost':
          name = '作品新增点赞';
          break;
      }

      return name;
    },
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

    // sumAccessCount() {
    //   this.updateChart();
    // },

    isActive(value) {
      if (value) {
        this.updateChart();
      } else {
        this.updateChart();
      }
    },
  },

  /**
   * 已创建
   */
  created() {
    this.submitGetAccessCountByAction();
  },

  mounted() {
    this.createChart();
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      getAccessCountByAction: 'dashboard/user/getAccessCountByAction',
      pushMessage: 'notification/pushMessage',
      // getSumAccessCount: 'dashboard/accessCount/getSumAccessCount',
    }),

    async submitGetAccessCountByAction() {
      try {
        await this.getAccessCountByAction({
          dateTimeRange: this.dateTimeRange,
          action: this.currentAction,
        });

        // await this.getSumAccessCount({
        //   dateTimeRange: this.dateTimeRange,
        //   action: this.currentActionAdmin,
        // });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    createChart() {
      const context = this.$refs.UserChartCanvas;

      const type = 'line';

      const data = {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: 'rgba(46,91,255,0.4)',
            borderColor: 'rgba(46,91,255)',
            pointBackgroundColor: 'rgba(255,255,255)',
            pointBorderColor: 'rgba(46,91,255)',
          },
          // {
          //   label: '',
          //   data: [],
          //   backgroundColor: 'rgba(140,84,255,0.4)',
          //   borderColor: 'rgba(140,84,255)',
          //   pointBackgroundColor: 'rgba(255,255,255)',
          //   pointBorderColor: 'rgba(140,84,255)',
          // },
        ],
      };

      const options = {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
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
@import './styles/dashboard-content-panel-chart-user.css';
</style>
