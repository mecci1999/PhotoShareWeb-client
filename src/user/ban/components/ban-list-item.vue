<template>
  <div class="ban-list-item">
    <div class="content">
      <div class="id">{{ item.user.id }}</div>
      <div class="user">
        <UserAvatar :user="item.user" link="user"></UserAvatar>
        <UserName :user="item.user"></UserName>
        <div class="icon" v-if="hasSubscription">
          <SubscriptionIcon :color="subscriptionIconColor"></SubscriptionIcon>
          <div class="name" :style="subscriptionIconNameStyles">
            {{ subscriptionIconName }}
          </div>
        </div>
      </div>
      <div class="postAmount">{{ item.postAmount }}</div>
      <div class="commentAmount">{{ item.commentAmount }}</div>
      <div class="status">
        <div :class="userStatusClasses" @click="onClickUserStatusButton">
          {{ item.status === 'normal' ? '正常' : '封禁中' }}
        </div>
        <transition name="hide-button">
          <div
            :class="hideButtonClasses"
            v-show="showHideButton"
            @click="onClickHideButton"
          >
            {{ item.status === 'normal' ? '封禁' : '解封' }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import UserName from '@/user/components/user-name.vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import SubscriptionIcon from '@/subscription/components/subscription-icon.vue';
import {
  STANDARD_SUBSCRIPTION_COLOR,
  PRO_SUBSCRIPTION_COLOR,
} from '@/app/app.config';

export default defineComponent({
  name: 'BanListItem',

  /**
   * 属性
   */
  props: {
    item: {
      type: Object,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      // 是否点击按钮
      showHideButton: false,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    userStatusClasses() {
      return [
        'userStatusButton',
        { normal: this.item.status === 'normal' },
        { ban: this.item.status === 'banned' },
      ];
    },

    hideButtonClasses() {
      return [
        'hideButton',
        { ban: this.item.status === 'normal' },
        { unseal: this.item.status === 'banned' },
      ];
    },

    ...mapGetters({
      userStatus: 'user/ban/userStatus',
    }),

    hasSubscription() {
      return this.item.subscription ? true : false;
    },

    subscriptionIconColor() {
      let color;

      const { subscription } = this.item;

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

      const { subscription } = this.item;

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

      if (this.hasSubscription && subscription.status === 'expired') {
        name = '已过期';
      }

      return name;
    },

    subscriptionIconNameStyles() {
      const { subscription } = this.item;

      if (this.hasSubscription && subscription.status === 'expired') {
        return;
      }

      return { background: this.subscriptionIconColor, color: '#FFFFFF' };
    },
  },

  /**
   * 监视
   */
  watch: {
    //
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
      setUserStatus: 'user/ban/setUserStatus',
    }),

    ...mapActions({
      changeUserStatus: 'user/ban/changeUserStatus',
    }),

    onClickUserStatusButton() {
      this.showHideButton = !this.showHideButton;
    },

    async onClickHideButton() {
      this.setUserStatus(this.item.status);

      const userId = this.item.user.id;

      let status;
      switch (this.item.status) {
        case 'normal':
          status = 'banned';
          break;
        case 'banned':
          status = 'normal';
          break;
      }

      await this.changeUserStatus({ userId, status });

      this.showHideButton = false;
    },
  },

  /**
   * 使用组件
   */
  components: {
    UserAvatar,
    UserName,
    SubscriptionIcon,
  },
});
</script>

<style scoped>
@import './styles/ban-list-item.css';
</style>
