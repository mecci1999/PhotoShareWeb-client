<template>
  <div class="manage-post-list-item-skeleton">
    <div class="manage-post-list-item-media skeleton">
      <div class="image"></div>
    </div>
    <div class="manage-post-list-item-content skeleton">
      <div class="thumbnail"></div>
      <div class="meta"></div>
      <div class="header">
        <div class="text"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ManagePostListItemSkeleton',

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
@import './styles/manage-post-list-item-skeleton.css';
</style>
