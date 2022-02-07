<template>
  <div class="subscription-signup-action">
    <transition name="subscription-payment">
      <SubscriptionPayment v-if="showSubscriptionPayment" />
    </transition>
    <button
      class="button"
      v-if="showSubscriptionButton"
      @click="onClickSubscriptionButton"
    >
      查看订阅
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import SubscriptionPayment from '@/subscription/components/subscription-payment.vue';

export default defineComponent({
  name: 'SubscriptionSignupAction',

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
      currentStepName: 'subscription/signup/currentStepName',
    }),

    showSubscriptionPayment() {
      return this.currentStepName === 'payment';
    },

    showSubscriptionButton() {
      return this.currentStepName === 'complete';
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
  methods: {
    ...mapMutations({}),

    ...mapActions({
      getValidSubscription: 'subscription/info/getValidSubscription',
    }),

    onClickSubscriptionButton() {
      this.getValidSubscription();
    },
  },

  /**
   * 使用组件
   */
  components: {
    SubscriptionPayment,
  },
});
</script>

<style scoped>
@import './styles/subscription-signup-action.css';
</style>
