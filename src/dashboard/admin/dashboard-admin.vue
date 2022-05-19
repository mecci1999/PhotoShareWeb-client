<template>
  <div class="dashboard-admin">
    <DashboardHeadbar :selectTypeMenu="menuList"></DashboardHeadbar>
    <DashboardContent></DashboardContent>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import DashboardHeadbar from '../components/dashboard-headbar.vue';
import DashboardContent from '../components/content/dashboard-content.vue';

export default defineComponent({
  name: 'DashboardAdmin',

  /**
   * 标题
   */
  title() {
    return '后台数据-管理员';
  },

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
          name: 'user',
          text: '用户',
        },
        {
          name: 'post',
          text: '素材',
        },
        {
          name: 'global',
          text: '全站',
        },
      ],
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      accessCountList: 'dashboard/accessCount/accessCountList',
      dateTimeRangeAdmin: 'dashboard/accessCount/dateTimeRangeAdmin',
      currentActionAdmin: 'dashboard/accessCount/currentActionAdmin',
      currentRangeAdmin: 'dashboard/accessCount/currentRangeAdmin',
    }),
  },

  /**
   * 已创建
   */
  async created() {
    // 刷新后给UseAdmin赋值
    this.setUseAdmin(true);

    // 给路由添加range参数
    const {
      query: { dateTimeRange, range, action },
    } = this.$route;

    this.updateRouterQuery();

    if (range && range !== 'global') {
      this.setCurrentRangeAdmin(range);
    } else {
      await this.submitGetAccessCounts();
    }

    if (dateTimeRange && dateTimeRange !== '1-day') {
      this.setDateTimeRangeAdmin(dateTimeRange);
    } else {
      await this.submitGetAccessCounts();
    }

    if (action) {
      this.setCurrentActionAdmin(action);
    }
  },

  watch: {
    dateTimeRangeAdmin() {
      this.updateRouterQuery();
      this.submitGetAccessCounts();
    },

    currentActionAdmin() {
      this.updateRouterQuery();
    },

    currentRangeAdmin() {
      this.updateRouterQuery();
      this.submitGetAccessCounts();
    },

    $route(value) {
      const {
        name,
        query: { dateTimeRange, range },
      } = value;

      if (name === 'dashboardAdmin' && !dateTimeRange) {
        this.setDateTimeRangeAdmin('1-day');
      }

      if (name === 'dashboardAdmin' && !range) {
        this.setCurrentRangeAdmin('global');
      }
    },
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setUseAdmin: 'user/setUseAdmin',
      setDateTimeRangeAdmin: 'dashboard/accessCount/setDateTimeRange',
      setCurrentActionAdmin: 'dashboard/accessCount/setCurrentActionAdmin',
      setCurrentRangeAdmin: 'dashboard/accessCount/setCurrentRangeAdmin',
    }),

    ...mapActions({
      pushMessage: 'notification/pushMessage',
      getAdminDataByRange: 'dashboard/accessCount/getAdminDataByRange',
    }),

    async submitGetAccessCounts() {
      try {
        await this.getAdminDataByRange({
          dateTimeRange: this.dateTimeRangeAdmin,
          range: this.currentRangeAdmin,
        });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    updateRouterQuery() {
      this.$router.replace({
        query: {
          dateTimeRange: this.dateTimeRangeAdmin,
          action: this.currentActionAdmin,
          range: this.currentRangeAdmin,
        },
      });
    },
  },

  /**
   * 使用组件
   */
  components: {
    DashboardHeadbar,
    DashboardContent,
  },
});
</script>

<style scoped>
@import './styles/dashboard-admin.css';
</style>
