<template>
  <div class="app-qrcode" v-html="qrcodeSvg" :style="appQrcodeStyles"></div>
</template>

<script>
import { defineComponent } from 'vue';
import Qrcode from 'qrcode-svg';

export default defineComponent({
  name: 'AppQrcode',

  /**
   * 属性
   */
  props: {
    content: {
      type: String,
      default: 'https://ninghao.net',
    },

    padding: {
      type: Number,
      default: 2,
    },

    color: {
      type: String,
      default: 'rgba(0, 0, 0, 0.9)',
    },

    background: {
      type: String,
      default: 'rgba(255, 255, 255, 0.1)',
    },

    size: {
      type: Number,
      default: 128,
    },
  },

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
    qrcodeSvg() {
      const content = this.content ? this.content : 'https://ninghao.net';

      const qrcode = new Qrcode({
        content,
        container: 'svg-viewbox',
        join: true,
        width: this.size,
        height: this.size,
        padding: this.padding,
        background: this.background,
        color: this.color,
      });

      return qrcode.svg();
    },

    appQrcodeStyles() {
      return {
        width: `${this.size}px`,
      };
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
@import './styles/app-qrcode.css';
</style>
