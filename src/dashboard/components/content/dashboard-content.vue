<template>
  <div class="dashboard-content">
    <DashboardContentCardList :list="adminDataList" />
    <DashboardContentPanelChart />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import DashboardContentCardList from './card/dashboard-content-card-list.vue';
import DashboardContentPanelChart from './chart/dashboard-content-panel-chart.vue';

export default defineComponent({
  name: 'DashboardContent',

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
      adminDataList: 'dashboard/accessCount/adminDataList',
    }),

    // testData() {
    //   return [
    //     {
    //       icon: 'perm_identity',
    //       title: '新增用户',
    //       amount: '300',
    //       sumCount: '2,000',
    //     },
    //     {
    //       icon: 'photo_camera',
    //       title: '新增素材',
    //       amount: '1200',
    //       sumCount: '100,000',
    //     },
    //     {
    //       icon: 'cloud_queue',
    //       title: '新增下载',
    //       amount: '600',
    //       sumCount: '500,000',
    //     },
    //     {
    //       icon: 'add_shopping_cart',
    //       title: '新增收益',
    //       amount: '1,000',
    //       sumCount: '50,000',
    //     },
    //   ];
    // },
  },

  /**
   * 已创建
   */
  created() {
    //
  },

  /**
   * 组件方法
   */
  methods: {},

  /**
   * 使用组件
   */
  components: {
    DashboardContentCardList,
    DashboardContentPanelChart,
  },
});
</script>

<style scoped>
@import './styles/dashboard-content.css';
</style>
