<template>
  <div :class="orderStatusClasses">
    {{ text }}
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OrderStatus',

  /**
   * 属性
   */
  props: {
    status: {
      type: String,
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
    color() {
      let color = '';

      switch (this.status) {
        case 'pending':
          color = 'purple';
          break;
        case 'completed':
          color = 'green';
          break;
      }

      return color;
    },

    text() {
      let text = '';

      switch (this.status) {
        case 'pending':
          text = '待处理';
          break;
        case 'completed':
          text = '完成';
          break;
        case 'archived':
          text = '存档';
          break;
      }

      return text;
    },

    orderStatusClasses() {
      return ['order-status', this.color];
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
@import './styles/order-status.css';
</style>
