<template>
  <div class="subscription-info">
    <SubscriptionInfoCard @change="onChangeSubscriptionInfoCard" />
    <transition name="subscription-payment">
      <SubscriptionPayment v-if="showSubscriptionPayment" />
    </transition>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import SubscriptionInfoCard from '@/subscription/info/subscription-info-card.vue';
import SubscriptionPayment from '@/subscription/components/subscription-payment';

export default defineComponent({
  name: 'SubscriptionInfo',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      showSubscriptionPayment: false,
    };
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
    //
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setSelectedSubscriptionType: 'product/select/setSelectedSubscriptionType',
      setSelectedProductType: 'product/select/setSelectedProductType',
    }),

    ...mapActions({}),

    onChangeSubscriptionInfoCard({ actionType, validSubscription }) {
      if (actionType === 'upgrade') {
        this.setSelectedProductType('subscription');
        this.setSelectedSubscriptionType('pro');
      }

      if (actionType === 'subscribe') {
        this.setSelectedProductType('subscription');
        this.setSelectedSubscriptionType(validSubscription.type);
      }

      if (actionType !== 'cancel') {
        this.showSubscriptionPayment = true;
      } else {
        this.showSubscriptionPayment = false;
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    SubscriptionPayment,
    SubscriptionInfoCard,
  },
});
</script>

<style scoped>
@import './styles/subscription-info.css';
</style>
