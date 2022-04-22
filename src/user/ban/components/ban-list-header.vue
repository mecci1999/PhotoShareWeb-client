<template>
  <div class="ban-list-header">
    <div class="id">ID</div>
    <div class="user">用户</div>
    <div class="postAmount">作品数量</div>
    <div class="commentAmount">评论数量</div>
    <div class="status">状态</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BanListHeader',

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
@import './styles/ban-list-header.css';
</style>
