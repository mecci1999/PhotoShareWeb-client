<template>
  <div :class="weixinLoginIframeClasses">
    <div class="image skeleton"></div>
    <div class="content"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'WeixinLoginIframe',

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

    weixinLoginIframeClasses() {
      return ['weixin-login-iframe', { loading: false }];
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
  components: {},
});
</script>

<style scoped>
@import './styles/weixin-login-iframe.css';
</style>
