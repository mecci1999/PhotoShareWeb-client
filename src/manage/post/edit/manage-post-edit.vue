<template>
  <div class="manage-post-edit">
    <PageSideSheetStatus v-if="!hasSelected" content="请选择要编辑的项目" />
    <ManagePostEditSelected v-if="hasSelected" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import ManagePostEditSelected from '@/manage/post/edit/manage-post-edit-selected.vue';
import PageSideSheetStatus from '@/app/layout/components/page-side-sheet-status.vue';

export default defineComponent({
  name: 'ManagePostEdit',

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
    ...mapGetters({
      hasSelected: 'manage/select/hasSelected',
    }),
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
    PageSideSheetStatus,
    ManagePostEditSelected,
  },
});
</script>

<style scoped>
@import './styles/manage-post-edit.css';
</style>
