<template>
  <div class="subscription-info-card">
    <subscription-card
      v-if="showSubscriptionInfoCard"
      :class="subscriptionInfoCardClasses"
      :style="subscriptionInfoCardStyles"
    >
      <template #thumbnail>
        <SubscriptionIcon
          :color="subscription.meta.color"
          size="large"
        ></SubscriptionIcon>
      </template>
      <template #header>
        {{ subscription.title }}
      </template>
      <template #description>
        至 {{ validSubscription.expired }} 到期
      </template>
      <template #meta>
        <div class="item" v-for="(item, index) in metaItems" :key="index">
          <div class="title">{{ item.title }}</div>
          <div class="value">{{ item.value }}</div>
        </div>
      </template>
    </subscription-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import SubscriptionCard from '@/subscription/components/subscription-card.vue';
import SubscriptionIcon from '@/subscription/components/subscription-icon.vue';

export default defineComponent({
  name: 'SubscriptionInfoCard',

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
      subscription: 'subscription/info/subscription',
      validSubscription: 'subscription/info/validSubscription',
    }),

    metaItems() {
      return [
        {
          title: '本周下载',
          value: this.validSubscription.weeklyDownloads,
        },
        {
          title: '每周限额',
          value: this.validSubscription.weeklyDownloadsLimit || '∞',
        },
        {
          title: '剩余天数',
          value: this.validSubscription.daysRemaining,
        },
      ];
    },

    showSubscriptionInfoCard() {
      return this.subscription && this.validSubscription;
    },

    subscriptionInfoCardClasses() {
      return [
        'stack',
        'colored',
        'shadow',
        'bordered-meta',
        'pointer',
        { inactive: this.validSubscription.isExpired },
      ];
    },

    subscriptionInfoCardStyles() {
      return {
        '--color': this.subscription.meta.color,
      };
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
  methods: {},

  /**
   * 使用组件
   */
  components: {
    SubscriptionCard,
    SubscriptionIcon,
  },
});
</script>

<style scoped>
@import './styles/subscription-info-card.css';
</style>
