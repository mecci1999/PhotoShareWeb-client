<template>
  <div class="subscription-signup-content">
    SubscriptionSignupContent
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default defineComponent({
  name: 'SubscriptionSignupContent',

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
      subscriptionProducts: 'product/show/subscriptionProducts',
    }),
  },

  /**
   * 已创建
   */
  created() {
    // 调取订阅产品
    this.getSubscriptionProducts();

    // 重置选择的订阅类型
    this.setSelectedSubscriptionType('');
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setSelectedSubscriptionType: 'product/select/setSelectedSubscriptionType',
    }),

    ...mapActions({
      getSubscriptionProducts: 'product/show/getSubscriptionProducts',
    }),
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/subscription-signup-content.css';
</style>
