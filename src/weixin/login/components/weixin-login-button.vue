<template>
  <div class="weixin-login-button">
    <button
      class="button large green outline circle"
      @click="onClickWeixinLoginButton"
    >
      wx
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeixinLoginButton',

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
  computed: {},

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
    onClickWeixinLoginButton() {
      this.$router.replace({ name: 'weixinLogin' });
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/weixin-login-button.css';
</style>
