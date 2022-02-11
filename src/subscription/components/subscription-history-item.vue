<template>
  <div class="subscription-history-item">
    <div class="datetime">
      <AppDatetime :date="item.created" format="long"></AppDatetime>
    </div>
    <div class="content">
      {{ item.content }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppDatetime from '@/app/components/app-datetime.vue';

export default defineComponent({
  name: 'SubscriptionHistoryItem',

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
    AppDatetime,
  },
});
</script>

<style scoped>
@import './styles/subscription-history-item.css';
</style>
