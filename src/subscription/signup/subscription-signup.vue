<template>
  <div class="subscription-signup">
    <SubscriptionSignupHeader />
    <SubscriptionSignupContent />
    <SubscriptionSignupAction />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import SubscriptionSignupHeader from '@/subscription/signup/components/subscription-signup-header.vue';
import SubscriptionSignupContent from '@/subscription/signup/components/subscription-signup-content.vue';
import SubscriptionSignupAction from '@/subscription/signup/components/subscription-signup-action.vue';
import { socket } from '@/app/app.service';

export default defineComponent({
  name: 'SubscriptionSignup',

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
    ...mapGetters({}),
  },

  /**
   * 已创建
   */
  created() {
    socket.on('subscriptionChanged', this.onSubscriptionChanged);
  },

  /**
   * 取消挂载
   */
  unmounted() {
    socket.off('subscriptionChanged', this.onSubscriptionChanged);
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setCurrentStepName: 'subscription/signup/setCurrentStepName',
    }),

    ...mapActions({}),

    onSubscriptionChanged() {
      this.setCurrentStepName('complete');
    },
  },

  /**
   * 使用组件
   */
  components: {
    SubscriptionSignupAction,
    SubscriptionSignupContent,
    SubscriptionSignupHeader,
  },
});
</script>

<style scoped>
@import './styles/subscription-signup.css';
</style>
