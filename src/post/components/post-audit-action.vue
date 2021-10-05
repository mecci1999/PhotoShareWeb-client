<template>
  <div class="post-audit-action">
    <CircleButton />
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
    ...mapActions({}),
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
