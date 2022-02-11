<template>
  <div class="subscription-card">
    <div class="thumbnail">
      <slot name="thumbnail"></slot>
    </div>
    <div class="content">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="meta">
        <slot name="meta"></slot>
      </div>
      <div class="description">
        <slot name="description"></slot>
      </div>
    </div>
    <div class="action">
      <slot name="action"></slot>
    </div>
    <div class="extra" v-if="$slots.extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SubscriptionCard',

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
  methods: {},

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/subscription-card.css';
</style>
