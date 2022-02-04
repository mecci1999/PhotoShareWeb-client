<template>
  <div class="subscription">
    <component
      v-if="subscriptionComponent"
      :is="subscriptionComponent"
    ></component>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import SubscriptionSignup from '@/subscription/signup/subscription-signup.vue';
import SubscriptionInfo from '@/subscription/info/subscription-info.vue';

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
  computed: {
    ...mapGetters({
      validSubscription: 'subscription/info/validSubscription',
      loading: 'subscription/info/loading',
    }),

    subscriptionComponent() {
      let subscriptionComponent = '';

      if (!this.loading && this.validSubscription) {
        subscriptionComponent = 'SubscriptionInfo';
      }

      if (!this.loading && !this.validSubscription) {
        subscriptionComponent = 'SubscriptionSignup';
      }

      return subscriptionComponent;
    },
  },

  /**
   * 已创建
   */
  created() {
    this.getValidSubscription();
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      getValidSubscription: 'subscription/info/getValidSubscription',
    }),
  },

  /**
   * 使用组件
   */
  components: {
    SubscriptionInfo,
    SubscriptionSignup,
  },
});
</script>

<style scoped>
@import './styles/subscription.css';
</style>
