<template>
  <div class="weixin-login-header">
    <div class="thumbnail">
      <WeixinIcon size="64"></WeixinIcon>
    </div>
    <div class="header">
      {{ currentLoginStep.title }}
    </div>
    <div class="description">
      {{ currentLoginStep.description }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import WeixinIcon from '@/weixin/components/weixin-icon.vue';

export default defineComponent({
  name: 'WeixinLoginHeader',

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
    WeixinIcon,
  },
});
</script>

<style scoped>
@import './styles/weixin-login-header.css';
</style>
