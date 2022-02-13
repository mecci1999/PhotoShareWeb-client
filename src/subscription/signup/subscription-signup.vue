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
    ...mapGetters({
      currentUser: 'user/currentUser',
    }),
  },

  /**
   * 已创建
   */
  created() {
    socket.on('subscriptionChanged', this.onSubscriptionChanged);

    this.setCurrentStepName('select');
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
      setSubscriptionOrders: 'order/create/setSubscriptionOrders',
    }),

    ...mapActions({
      getCurrentUser: 'user/getCurrentUser',
    }),

    onSubscriptionChanged() {
      this.setSubscriptionOrders(null);
      this.setCurrentStepName('complete');
      this.getCurrentUser(this.currentUser.id);
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
