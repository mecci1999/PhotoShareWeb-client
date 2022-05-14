<template>
  <div class="dashboard-content-panel-chart">
    <div class="header">
      <div class="title">{{ showHeaderTitle }}</div>
      <div class="data-name">
        <div :class="dataNameBlueClasses" @click="onClickChangeToBlue">
          {{ showDataName }}
        </div>
        <div :class="dataNamePurpleClasses" @click="onClickChangeToPurple">
          总数
        </div>
      </div>
    </div>
    <div class="media">
      <canvas width="1000" height="380" ref="AdminChartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Chart from 'chart.js';

export default defineComponent({
  name: 'DashboardContentPanelChart',

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
      isActive: false,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      accessCount: 'dashboard/accessCount/accessCount',
      dateTimeRange: 'dashboard/accessCount/dateTimeRange',
      currentActionAdmin: 'dashboard/accessCount/currentActionAdmin',
      sumAccessCount: 'dashboard/accessCount/sumAccessCount',
    }),

    dataNameBlueClasses() {
      return ['data-name-blue', { active: !this.isActive }];
    },

    dataNamePurpleClasses() {
      return ['data-name-purple', { active: this.isActive }];
    },

    chartPanelTitle() {
      return this.accessCount ? `${this.accessCount.title}统计图` : '统计图';
    },

    // 根据时间和动作显示相应的文字
    showHeaderTitle() {
      let yTitle = '';
      let xTitle = '';
      switch (this.currentActionAdmin) {
        case 'createUser':
          yTitle = '新增用户(个)';
          break;
        case 'createPost':
          yTitle = '新增素材(个)';
          break;
        case 'createOrder':
          yTitle = '新增订单(个)';
          break;
        case 'addIncome':
          yTitle = '新增收益(元)';
          break;
        case 'login':
          yTitle = '用户活跃量(个)';
          break;
        case 'getPosts':
          yTitle = '网站访问量(次)';
          break;
        case 'getPostById':
          yTitle = '素材访问量(次)';
          break;
        case 'createDownload':
          yTitle = '素材下载(次)';
          break;
        case 'createComment':
          yTitle = '新增评论(条)';
          break;
        case 'createUserLikePost':
          yTitle = '新增点赞(次)';
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

      switch (this.currentActionAdmin) {
        case 'createUser':
          name = '新增用户';
          break;
        case 'createPost':
          name = '新增素材';
          break;
        case 'createOrder':
          name = '新增订单';
          break;
        case 'addIncome':
          name = '新增收益';
          break;
        case 'login':
          name = '用户活跃量';
          break;
        case 'getPosts':
          name = '网站访问量';
          break;
        case 'getPostById':
          name = '素材访问量';
          break;
        case 'createDownload':
          name = '素材下载';
          break;
        case 'createComment':
          name = '新增评论';
          break;
        case 'createUserLikePost':
          name = '新增点赞';
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

    currentActionAdmin() {
      this.submitGetAccessCountByAction();
    },

    sumAccessCount() {
      this.updateChart();
    },

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

  /**
   * 挂载
   */
  mounted() {
    this.createChart();
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      getAccessCountAdmin: 'dashboard/accessCount/getAccessCountAdmin',
      pushMessage: 'notification/pushMessage',
      getSumAccessCount: 'dashboard/accessCount/getSumAccessCount',
    }),

    async submitGetAccessCountByAction() {
      try {
        await this.getAccessCountAdmin({
          dateTimeRange: this.dateTimeRange,
          action: this.currentActionAdmin,
        });

        await this.getSumAccessCount({
          dateTimeRange: this.dateTimeRange,
          action: this.currentActionAdmin,
        });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    createChart() {
      const context = this.$refs.AdminChartCanvas;

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
          {
            label: '',
            data: [],
            backgroundColor: 'rgba(140,84,255,0.4)',
            borderColor: 'rgba(140,84,255)',
            pointBackgroundColor: 'rgba(255,255,255)',
            pointBorderColor: 'rgba(140,84,255)',
          },
        ],
      };

      const options = {
        legend: {
          display: false,
        },
        // elements: {
        //   line: {
        //     tension: 0, // 禁用贝塞尔曲线
        //   },
        // },
        scales: {
          // xAxes: [
          //   {
          //     type: 'time',
          //     time: {
          //       unit: '',
          //     },
          //   },
          // ],

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
      // const sumArray = this.sumAccessCount.dataset;

      this.accessCountChart.data.labels = datetimeArray;
      if (this.isActive) {
        this.accessCountChart.data.datasets[0].data = [];
        this.accessCountChart.data.datasets[1].data = this.sumAccessCount.dateset[1];
      }
      if (!this.isActive) {
        this.accessCountChart.data.datasets[0].data = valueArray;
        this.accessCountChart.data.datasets[1].data = [];
      }
      this.accessCountChart.update();
    },

    onClickChangeToBlue() {
      this.isActive = !this.isActive;
    },

    onClickChangeToPurple() {
      this.isActive = !this.isActive;
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/dashboard-content-panel-chart.css';
</style>
