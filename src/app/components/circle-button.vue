<template>
  <div class="circle-button">
    <button :class="buttonClasses" @click="onClickButton" :disabled="disabled">
      <AppIcon color="#fff" size="16" :name="icon"></AppIcon>
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppIcon from './app-icon.vue';

export default defineComponent({
  name: 'CircleButton',

  /**
   * 属性
   */
  props: {
    icon: {
      type: String,
    },

    active: {
      type: Boolean,
    },

    disabled: {
      type: Boolean,
    },
  },

  /**
   * 数据
   */
  data() {
    return {};
  },

  /**
   * 事件
   */
  emits: ['click'],

  /**
   * 计算属性
   */
  computed: {
    buttonClasses() {
      return ['button', 'basic', 'circle', { active: this.active }];
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
  methods: {
    onClickButton() {
      this.$emit('click');
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppIcon,
  },
});
</script>

<style scoped>
@import './styles/circle-button.css';
</style>
