<template>
  <component :is="home"></component>
</template>

<script>
import PostIndex from '@/post/index/post-index.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      home: 'PostIndex',
    };
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
    }),
  },

  created() {
    // 用户封禁状态
    if (this.currentUser && this.currentUser.status === 'banned') {
      // 提示用户已被封禁
      this.pushMessage({ content: '您因发布违规内容，当前账号处于封禁状态。' });
    }
  },

  methods: {
    ...mapActions({
      pushMessage: 'notification/pushMessage',
    }),
  },

  components: {
    PostIndex,
  },
};
</script>
