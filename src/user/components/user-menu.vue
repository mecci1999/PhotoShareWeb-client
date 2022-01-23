<template>
  <div class="user-menu">
    <CloseButton @click="$emit('close')"></CloseButton>
    <div class="user-menu-header">
      <UserName :user="currentUser" @click="$emit('close')"></UserName>
    </div>
    <div
      class="user-menu-items"
      v-for="(menuItems, menuIndex) in menu"
      :key="menuIndex"
    >
      <div
        class="user-menu-item"
        v-for="(item, index) in menuItems"
        :key="index"
        @click="$emit('close')"
      >
        <router-link class="link" :to="item.linkTo">{{
          item.text
        }}</router-link>
      </div>
    </div>
    <div class="user-menu-footer">
      <button class="button block" @click="onClickLogoutButton">
        退出登录
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import CloseButton from '@/app/components/close-button.vue';
import UserName from '@/user/components/user-name.vue';

export default defineComponent({
  name: 'UserMenu',

  /**
   * 属性
   */
  props: {},

  /**
   * 事件
   */
  emits: ['close'],

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

    menu() {
      return [
        [
          {
            linkTo: {
              name: 'userPosts',
              params: { userId: this.currentUser.id },
            },
            text: '作品',
          },
          {
            linkTo: {
              name: 'userComments',
              params: { userId: this.currentUser.id },
            },
            text: '评论',
          },
        ],
        [
          {
            linkTo: {
              name: 'userAccount',
              params: { userId: this.currentUser.id },
            },
            text: '账户',
          },
          {
            linkTo: {
              name: 'managePost',
              params: { userId: this.currentUser.id },
            },
            text: '管理',
          },
        ],
        [
          {
            linkTo: {
              name: 'subscription',
              params: { userId: this.currentUser.id },
            },
            text: '订阅',
          },
        ],
      ];
    },
  },

  /**
   * 已创建
   */
  created() {
    // 监听window的keyup事件
    if (window) {
      window.addEventListener('keyup', this.onKeyUpWindow);
    }
  },

  /**
   * 取消挂载
   */
  unmounted() {
    if (window) {
      window.removeEventListener('keyup', this.onKeyUpWindow);
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),

    onKeyUpWindow(event) {
      if (event.key === 'Escape') {
        this.$emit('close');
      }
    },

    onClickLogoutButton() {
      this.$emit('close');
      this.logout();
    },
  },

  /**
   * 使用组件
   */
  components: {
    CloseButton,
    UserName,
  },
});
</script>

<style scoped>
@import './styles/user-menu.css';
</style>
