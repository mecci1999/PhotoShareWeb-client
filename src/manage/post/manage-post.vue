<template>
  <div class="manage-post">
    <ManagePostList />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ManagePostList from '@/manage/post/components/manage-post-list.vue';

export default defineComponent({
  name: 'ManagePost',

  title() {
    return '内容管理';
  },

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
  components: {
    ManagePostList,
  },
});
</script>

<style scoped>
@import './styles/manage-post.css';
</style>
