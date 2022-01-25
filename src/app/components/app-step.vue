<template>
  <div class="app-step">
    <div class="number">
      {{ number }}
    </div>
    <div class="text">
      {{ title }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppStep',

  /**
   * 属性
   */
  props: {
    number: {
      type: Number,
    },
    title: {
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
  components: {},
});
</script>

<style scoped>
@import './styles/app-step.css';
</style>
