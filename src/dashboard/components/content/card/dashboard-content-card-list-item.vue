<template>
  <div class="dashboard-content-card-list-item">
    <div class="header">
      <div class="icon">
        <AppIcon :name="item.icon" :color="'#FFFFFF'" :size="20"></AppIcon>
      </div>
      <div class="title">{{ item.title }}</div>
    </div>
    <div class="text">
      <div class="amount">
        {{ this.item.title === '新增收益' ? '¥ ' : '' }}{{ item.value }}
      </div>
      <AppIcon name="trending_up" :color="'#FFFFFF'" :size="20"></AppIcon>
    </div>
    <div class="sum">
      总计: {{ this.item.title === '新增收益' ? '¥ ' : '' }}{{ item.sumCount }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'DashboardContentCardListItem',

  /**
   * 属性
   */
  props: {
    item: {
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
  computed: {},

  /**
   * 已创建
   */
  created() {
    console.log(this.item);
  },

  /**
   * 组件方法
   */
  methods: {},

  /**
   * 使用组件
   */
  components: {
    AppIcon,
  },
});
</script>

<style scoped>
@import './styles/dashboard-content-card-list-item.css';
</style>
