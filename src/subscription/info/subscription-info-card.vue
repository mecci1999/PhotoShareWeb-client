<template>
  <div class="subscription-info-card">
    <subscription-card
      v-if="showSubscriptionInfoCard"
      :class="subscriptionInfoCardClasses"
      :style="subscriptionInfoCardStyles"
      @click="onClickSubscriptionCard"
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
        至 <AppDatetime :date="validSubscription.expired" /> 到期
      </template>
      <template #meta>
        <div class="item" v-for="(item, index) in metaItems" :key="index">
          <div class="title">{{ item.title }}</div>
          <div class="value">{{ item.value }}</div>
        </div>
      </template>
      <template #action>
        <button
          class="button outline"
          @click.stop="onClickUpgradeButton"
          v-if="showUpgradeButton"
          :disabled="disabledUpgradeButton"
        >
          {{ upgradeButtonText }}
        </button>
        <button
          class="button outline"
          @click.stop="onClickSubscribeButton"
          :disabled="disabledSubscribeButton"
        >
          {{ subscribeButtonText }}
        </button>
      </template>
      <template #extra>
        <SubscriptionHistory
          v-show="showSubscriptionHistory"
        ></SubscriptionHistory>
      </template>
    </subscription-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import SubscriptionCard from '@/subscription/components/subscription-card.vue';
import SubscriptionIcon from '@/subscription/components/subscription-icon.vue';
import AppDatetime from '@/app/components/app-datetime.vue';
import { socket } from '@/app/app.service';
import SubscriptionHistory from '@/subscription/components/subscription-history.vue';

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
    return {
      isUpgrading: false,
      isSubscribing: false,
      showSubscriptionHistory: false,
    };
  },

  /**
   * 事件
   */
  emits: ['change'],

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

    subscribeButtonText() {
      let subscribeButtonText;

      if (this.isSubscribing) {
        subscribeButtonText = this.validSubscription.isExpired
          ? '取消重订'
          : '取消订阅';
      } else {
        subscribeButtonText = this.validSubscription.isExpired
          ? '重订'
          : '续订';
      }

      return subscribeButtonText;
    },

    upgradeButtonText() {
      return this.isUpgrading ? '取消升级' : '升级';
    },

    showUpgradeButton() {
      return this.validSubscription.type === 'standard';
    },

    disabledUpgradeButton() {
      return this.isSubscribing;
    },

    disabledSubscribeButton() {
      return this.isUpgrading;
    },
  },

  /**
   * 已创建
   */
  created() {
    socket.on('subscriptionChanged', this.onChangeSubscriptionChanged);
  },

  /**
   * 取消挂载
   */
  unmounted() {
    socket.off('subscriptionChanged', this.onChangeSubscriptionChanged);
  },

  /**
   * 组件方法
   */
  methods: {
    onClickSubscribeButton() {
      this.isSubscribing = !this.isSubscribing;

      this.$emit('change', {
        actionType: this.isSubscribing ? 'subscribe' : 'cancel',
        validSubscription: this.validSubscription,
      });
    },

    onClickUpgradeButton() {
      this.isUpgrading = !this.isUpgrading;

      this.$emit('change', {
        actionType: this.isUpgrading ? 'upgrading' : 'cancel',
        validSubscription: this.validSubscription,
      });
    },

    onChangeSubscriptionChanged() {
      this.isUpgrading = false;
      this.isSubscribing = false;
    },

    onClickSubscriptionCard() {
      this.showSubscriptionHistory = !this.showSubscriptionHistory;
    },
  },

  /**
   * 使用组件
   */
  components: {
    SubscriptionHistory,
    AppDatetime,
    SubscriptionCard,
    SubscriptionIcon,
  },
});
</script>

<style scoped>
@import './styles/subscription-info-card.css';
</style>
