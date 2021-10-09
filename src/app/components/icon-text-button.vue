<template>
  <div class="icon-text-button">
    <button :class="buttonClasses">
      <div class="icon">
        <AppIcon :name="icon" :color="iconColor" />
      </div>
      <div class="text" v-if="text">
        {{ text }}
      </div>
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'IconTextButton',

  /**
   * 属性
   */
  props: {
    icon: {
      type: String,
    },

    text: {
      type: String,
    },

    isActive: {
      type: Boolean,
    },

    size: {
      type: String,
      default: 'large',
    },

    variations: {
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
    buttonClasses() {
      const classes = [
        'button',
        'icon',
        'text',
        this.size,
        { outline: !this.isActive },
      ];

      if (this.variations) {
        classes.push(this.variations);
      }

      return classes;
    },

    iconColor() {
      return this.isActive ? '#fff' : '';
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
  components: {
    AppIcon,
  },
});
</script>

<style scoped>
@import './styles/icon-text-button.css';
</style>
