<template>
  <div class="post-audit-action">
    <div class="icon">
      <CircleButton :icon="icon" @click="onClickButton" :disabled="disabled" />
    </div>
    <div class="text">
      <button class="button basic" @click="onClickButton">{{ text }}</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import CircleButton from '@/app/components/circle-button.vue';

export default defineComponent({
  name: 'PostAuditAction',

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
   * 事件
   */
  emits: ['change'],

  /**
   * 计算属性
   */
  computed: {
    icon() {
      return 'add_task';
    },

    text() {
      return '提交审核';
    },

    disabled() {
      return false;
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
    ...mapActions({}),

    onClickButton() {
      //
    },
  },

  /**
   * 使用组件
   */
  components: {
    CircleButton,
  },
});
</script>

<style scoped>
@import './styles/post-audit-action.css';
</style>
