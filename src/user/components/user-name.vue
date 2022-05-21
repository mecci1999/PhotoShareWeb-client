<template>
  <div :class="userNameClasses">
    <div class="text">
      <router-link :to="userNameLinkTo" class="link" @click="$emit('click')">{{
        user.name
      }}</router-link>
    </div>
    <div class="icon" v-if="hasSubscription">
      <router-link class="link" :to="subscriptionIconLinkTo">
        <SubscriptionIcon :color="subscriptionIconColor"></SubscriptionIcon>
      </router-link>
      <div class="name" :style="subscriptionIconNameStyles">
        {{ subscriptionIconName }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import SubscriptionIcon from '@/subscription/components/subscription-icon.vue';
import {
  STANDARD_SUBSCRIPTION_COLOR,
  PRO_SUBSCRIPTION_COLOR,
} from '@/app/app.config';

export default defineComponent({
  name: 'UserName',

  /**
   * 属性
   */
  props: {
    user: {
      type: Object,
    },

    size: {
      type: String,
    },
  },

  emits: ['click'],

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

    userNameClasses() {
      return ['user-name', this.size];
    },

    userNameLinkTo() {
      return {
        name: 'userPosts',
        params: { userId: this.user.id },
      };
    },

    hasSubscription() {
      return this.user.subscription ? true : false;
    },

    subscriptionIconLinkTo() {
      return { name: 'subscription' };
    },

    subscriptionIconColor() {
      let color;

      const { subscription } = this.user;

      if (this.hasSubscription && subscription.status === 'valid') {
        switch (subscription.type) {
          case 'standard':
            color = STANDARD_SUBSCRIPTION_COLOR;
            break;
          case 'pro':
            color = PRO_SUBSCRIPTION_COLOR;
            break;
        }
      }

      return color;
    },

    subscriptionIconName() {
      let name;

      const { subscription, id } = this.user;

      if (this.hasSubscription && subscription.status === 'valid') {
        switch (subscription.type) {
          case 'standard':
            name = '标准版';
            break;
          case 'pro':
            name = '专业版';
            break;
        }
      }

      // 只有当前用户能看到自己的订阅是否过期
      if (
        this.hasSubscription &&
        this.currentUser &&
        subscription.status === 'expired' &&
        this.currentUser.id === id
      ) {
        name = '已过期';
      }

      return name;
    },

    subscriptionIconNameStyles() {
      const { subscription } = this.user;

      if (this.hasSubscription && subscription.status === 'expired') {
        return;
      }

      return { background: this.subscriptionIconColor, color: '#FFFFFF' };
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
    SubscriptionIcon,
  },
});
</script>

<style scoped>
@import './styles/user-name.css';
</style>
