<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import AppLayout from '@/app/layout/app-layout';
import { mapMutations } from 'vuex';
import { getStroage } from './app.service';

export default {
  data() {
    return {
      layout: 'AppLayout',
    };
  },

  created() {
    // 用户令牌
    const token = getStroage('uid');

    if (token) {
      this.setToken(token);
    }
  },

  methods: {
    ...mapMutations({
      setToken: 'auth/setToken',
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
