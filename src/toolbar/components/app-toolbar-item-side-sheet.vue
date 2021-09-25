<template>
  <div class="app-toolbar-item-side-sheet">
    AppToolbarItemSideSheet
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'AppToolbarItemSideSheet',

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
  },

  /**
   * 使用组件
   */
  components: {
  },
});
</script>

<style scoped>
@import './styles/app-toolbar-item-side-sheet.css';
</style>
