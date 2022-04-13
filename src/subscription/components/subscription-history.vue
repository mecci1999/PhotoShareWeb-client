<template>
  <div class="subscription-history">
    <SubscriptionHistoryItem
      v-for="item in subscriptionHistory"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import SubscriptionHistoryItem from '@/subscription/components/subscription-history-item.vue';

export default defineComponent({
  name: 'SubscriptionHistory',

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
      subscriptionHistory: 'subscription/info/subscriptionHistory',
    }),
  },

  /**
   * 已创建
   */
  created() {
    this.getSubscriptionHistory();
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({}),

    ...mapActions({
      getSubscriptionHistory: 'subscription/info/getSubscriptionHistory',
    }),
  },

  /**
   * 使用组件
   */
  components: {
    SubscriptionHistoryItem,
  },
});
</script>

<style scoped>
@import './styles/subscription-history.css';
</style>
