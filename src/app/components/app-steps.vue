<template>
  <div class="app-steps">
    <AppStep
      v-for="(step, index) in steps"
      :key="step.name"
      :title="step.title"
      :number="index + 1"
      :class="{ active: current === step.name }"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppStep from '@/app/components/app-step.vue';

export default defineComponent({
  name: 'AppSteps',

  /**
   * 属性
   */
  props: {
    steps: {
      type: Array,
    },

    current: {
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
  components: {
    AppStep,
  },
});
</script>

<style scoped>
@import './styles/app-steps.css';
</style>
