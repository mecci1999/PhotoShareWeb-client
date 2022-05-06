<template>
  <div class="dashboard">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'Dashboard',

  /**
   * 标题
   */
  title() {
    return '后台数据';
  },

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
   * 监听
   */
  watch: {
    canUseAdmin(value) {
      if (value) {
        this.dashboardType = 'dashboardAdmin';
      } else {
        this.dashboardType = 'dashboard';
      }
    },
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      canUseAdmin: 'user/canUseAdmin',
    }),

    dashboardType() {
      return this.canUseAdmin ? 'dashboardAdmin' : 'dashboard';
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
  methods: {},

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/dashboard.css';
</style>
