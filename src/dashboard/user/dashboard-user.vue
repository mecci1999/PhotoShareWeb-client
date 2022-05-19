<template>
  <div class="dashboard-user">
    <div class="dashboard-user-left">
      <DashboardUserInfo />
    </div>
    <div class="dashboard-user-right">
      <DashboardHeadbar :selectTypeMenu="menuList"></DashboardHeadbar>
      <DashboardContentCardList :list="userDataList" />
      <DashboardContentPanelChartUser />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import DashboardUserInfo from './components/dashboard-user-info.vue';
import DashboardHeadbar from '@/dashboard/components/dashboard-headbar.vue';
import DashboardContentCardList from '@/dashboard/components/content/card/dashboard-content-card-list.vue';
import DashboardContentPanelChartUser from './components/dashboard-content-panel-chart-user.vue';

export default defineComponent({
  name: 'DashboardUser',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      menuList: [
        {
          name: 'post',
          text: '作品',
        },
        {
          name: 'other',
          text: '其它',
        },
      ],
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      dateTimeRange: 'dashboard/user/dateTimeRange',
      currentAction: 'dashboard/user/currentAction',
      currentRange: 'dashboard/user/currentRange',
      userDataList: 'dashboard/user/userDataList',
    }),
  },

  watch: {
    dateTimeRange() {
      this.updateRouterQuery();
      this.submitGetAccessCounts();
    },

    currentAction() {
      this.updateRouterQuery();
    },

    currentRange() {
      this.updateRouterQuery();
      this.submitGetAccessCounts();
    },

    $route(value) {
      const {
        name,
        query: { dateTimeRange, range },
      } = value;

      if (name === 'dashboardAccessCount' && !dateTimeRange) {
        this.setDateTimeRange('1-day');
      }

      if (name === 'dashboardAccessCount' && !range) {
        this.setCurrentRange('post');
      }
    },
  },

  /**
   * 已创建
   */
  async created() {
    // 组件初始化时，将useAdmin设置为false
    this.setUseAdmin(false);

    // 给路由添加range参数
    const {
      query: { dateTimeRange, range, action },
    } = this.$route;

    this.updateRouterQuery();

    if (range && range !== 'post') {
      this.setCurrentRange(range);
    } else {
      await this.submitGetAccessCounts();
    }

    if (dateTimeRange && dateTimeRange !== '1-day') {
      this.setDateTimeRange(dateTimeRange);
    } else {
      await this.submitGetAccessCounts();
    }

    if (action) {
      this.setCurrentAction(action);
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setUseAdmin: 'user/setUseAdmin',
      setDateTimeRange: 'dashboard/user/setDateTimeRange',
      setCurrentAction: 'dashboard/user/setCurrentAction',
      setCurrentRange: 'dashboard/user/setCurrentRange',
    }),

    ...mapActions({
      pushMessage: 'notification/pushMessage',
      getAccessCounts: 'dashboard/user/getAccessCounts',
    }),

    async submitGetAccessCounts() {
      try {
        await this.getAccessCounts({
          dateTimeRange: this.dateTimeRange,
          range: this.currentRange,
        });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    updateRouterQuery() {
      this.$router.replace({
        query: {
          dateTimeRange: this.dateTimeRange,
          action: this.currentAction,
          range: this.currentRange,
        },
      });
    },
  },

  /**
   * 使用组件
   */
  components: {
    DashboardUserInfo,
    DashboardHeadbar,
    DashboardContentCardList,
    DashboardContentPanelChartUser,
  },
});
</script>

<style scoped>
@import './styles/dashboard-user.css';
</style>
