<template>
  <i :class="['subscription-icon', icon]" :style="subscriptionIconStyles"></i>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SubscriptionIcon',

  /**
   * 属性
   */
  props: {
    color: {
      type: String,
    },
    size: {
      type: String,
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
    icon() {
      let icon = 'diamond';

      if (this.size === 'large') {
        icon = 'diamond-64';
      }

      return icon;
    },

    subscritpionIconStyles() {
      let styleObject = { color: this.color };

      if (this.size) {
        styleObject = { ...styleObject, fontSize: `${this.size}px` };
      }

      return styleObject;
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
@import './styles/subscription-icon.css';
</style>
