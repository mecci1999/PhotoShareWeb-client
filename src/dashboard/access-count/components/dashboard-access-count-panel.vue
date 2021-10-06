<template>
  <div
    :class="dashboardAccessCountPanelClasses"
    @click="onClickDashboardAccessCountPanel"
  >
    <div class="header">
      {{ accessCount.title }}
    </div>
    <div class="content">
      {{ accessCount.value }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  name: 'DashboardAccessCountPanel',

  /**
   * 属性
   */
  props: {
    accessCount: {
      type: Object,
    },
  },

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
      currentAction: 'dashboard/accessCount/currentAction',
    }),

    dashboardAccessCountPanelClasses() {
      return ['dashboard-access-count-panel', { active: this.isActivePanel }];
    },

    isActivePanel() {
      return this.currentAction === this.accessCount.action;
    },
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
  methods: {
    ...mapMutations({
      setCurrentAction: 'dashboard/accessCount/setCurrentAction',
    }),

    onClickDashboardAccessCountPanel() {
      this.setCurrentAction(this.accessCount.action);
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/dashboard-access-count-panel.css';
</style>
