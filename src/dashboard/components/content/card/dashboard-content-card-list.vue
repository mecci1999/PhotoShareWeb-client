<template>
  <div class="dashboard-content-card-list">
    <DashboardContentCardListItem
      v-for="item in list"
      :key="item.title"
      :item="item"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import DashboardContentCardListItem from './dashboard-content-card-list-item.vue';

export default defineComponent({
  name: 'DashboardContentCardList',

  /**
   * 属性
   */
  props: {
    list: {
      type: Array,
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
  computed: {},

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
    DashboardContentCardListItem,
  },
});
</script>

<style scoped>
@import './styles/dashboard-content-card-list.css';
</style>
