<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import AppLayout from '@/app/layout/app-layout';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { getStroage, socket, apiHttpClient } from './app.service';

export default {
  data() {
    return {
      layout: 'AppLayout',
    };
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
    }),
  },

  created() {
    // 用户令牌
    const token = getStroage('nid');

    if (token) {
      this.setToken(token);
      this.configApiHttpClientAuthHeader(token);
    }

    // 当前用户Id
    const currentUserId = getStroage('uid');

    if (currentUserId) {
      this.getCurrentUser(currentUserId);
    }

    // 设置请求头部
    socket.on('connect', () => {
      apiHttpClient.defaults.headers.common['X-Socket-Id'] = socket.id;
      this.setSocketId(socket.id);
    });

    // 用户封禁状态
    if (this.currentUser && this.currentUser.status === 'banned') {
      // 提示用户已被封禁
      this.pushMessage({ content: '您因发布违规内容，当前账号处于封禁状态。' });
    }
  },

  methods: {
    ...mapMutations({
      setToken: 'auth/setToken',
      setSocketId: 'user/setSocketId',
    }),

    ...mapActions({
      configApiHttpClientAuthHeader: 'auth/configApiHttpClientAuthHeader',
      getCurrentUser: 'user/getCurrentUser',
      pushMessage: 'notification/pushMessage',
    }),
  },

  components: {
    AppLayout,
  },
};
</script>

<style>
@import './styles/normalize.css';
@import './styles/base.css';
@import './styles/theme.css';
@import './styles/app.css';
@import './styles/page.css';
@import './styles/form.css';
@import './styles/button.css';
</style>
