<template>
  <div class="manage-post">
    <ManagePostList />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
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
    this.setSideSheetComponent('ManagePostSideSheet');
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setSideSheetComponent: 'layout/setSideSheetComponent',
    }),
  },

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
