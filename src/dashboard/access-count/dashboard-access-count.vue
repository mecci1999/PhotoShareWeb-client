<template>
  <div class="dashboard-access-count">
    DashboardAccessCount
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';

export default defineComponent({
  name: 'DashboardAccessCount',

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
  computed: {},

  /**
   * 已创建
   */
  async created() {
    //
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({}),
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/dashboard-access-count.css';
</style>
