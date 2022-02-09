<template>
  <span class="app-datetime">
    {{ localDate }}
  </span>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppDatetime',

  /**
   * 属性
   */
  props: {
    date: {
      type: String,
    },

    format: {
      type: String,
      default: 'long',
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
    localDate() {
      const longFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
      };

      const shortFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };

      let options;

      switch (this.format) {
        case 'long':
          options = longFormatOptions;
          break;
        case 'short':
          options = shortFormatOptions;
          break;
      }

      const localDate = new Date(this.date).toLocaleDateString(
        navigator.language,
        options,
      );

      return localDate;
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
@import './styles/app-datetime.css';
</style>
