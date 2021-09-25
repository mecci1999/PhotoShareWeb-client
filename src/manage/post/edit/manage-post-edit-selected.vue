<template>
  <div class="manage-post-edit-selected">
    <ManageSelectedStatus></ManageSelectedStatus>
    <ManagePostEditSelectedList></ManagePostEditSelectedList>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ManageSelectedStatus from '@/manage/components/manage-selected-status.vue';
import ManagePostEditSelectedList from './components/manage-post-edit-selected-list.vue';

export default defineComponent({
  name: 'ManagePostEditSelected',

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
    ManageSelectedStatus,
    ManagePostEditSelectedList,
  },
});
</script>

<style scoped>
@import './styles/manage-post-edit-selected.css';
</style>
