<template>
  <div class="weixin-login">
    <WeixinLoginHeader />
    <component :is="currentLoginStep.component"></component>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import WeixinLoginHeader from '@/weixin/login/components/weixin-login-header.vue';
import WeixinLoginIframe from '@/weixin/login/components/weixin-login-iframe.vue';

export default defineComponent({
  name: 'WeixinLogin',

  /**
   * 标题
   */
  title() {
    return '微信登录';
  },

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
      currentLoginStep: 'weixin/login/currentLoginStep',
    }),
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
    WeixinLoginIframe,
    WeixinLoginHeader,
  },
});
</script>

<style scoped>
@import './styles/weixin-login.css';
</style>
