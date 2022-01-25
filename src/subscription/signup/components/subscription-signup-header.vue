<template>
  <div class="subscription-signup-header">
    <div class="title">{{ currentStep.title }}</div>
    <div class="description">{{ currentStep.description }}</div>
    <div class="content">
      <AppSteps :steps="steps" :current="currentStepName" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AppSteps from '@/app/components/app-steps.vue';

export default defineComponent({
  name: 'SubscriptionSignupHeader',

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
      currentStep: 'subscription/signup/currentStep',
      currentStepName: 'subscription/signup/currentStepName',
      steps: 'subscription/signup/steps',
    }),
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
    ...mapMutations({}),
    ...mapActions({}),
  },

  /**
   * 使用组件
   */
  components: {
    AppSteps,
  },
});
</script>

<style scoped>
@import './styles/subscription-signup-header.css';
</style>
