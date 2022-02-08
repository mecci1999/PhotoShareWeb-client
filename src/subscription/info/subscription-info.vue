<template>
  <div class="subscription-info">
    <SubscriptionInfoCard />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import SubscriptionInfoCard from '@/subscription/info/subscription-info-card.vue';

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
    SubscriptionInfoCard,
  },
});
</script>

<style scoped>
@import './styles/subscription-info.css';
</style>
