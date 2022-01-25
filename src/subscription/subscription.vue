<template>
  <div class="subscription">
    <SubscriptionSignup />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SubscriptionSignup from '@/subscription/signup/subscription-signup.vue';

export default defineComponent({
  name: 'Subscription',

  /**
   * 标题
   */
  title() {
    return '订阅';
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
    SubscriptionSignup,
  },
});
</script>

<style scoped>
@import './styles/subscription.css';
</style>
