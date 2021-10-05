<template>
  <div class="manage-post-audit-status">
    <CircleButton />
    ManagePostAuditStatus
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import CircleButton from '@/app/components/circle-button.vue';

export default defineComponent({
  name: 'ManagePostAuditStatus',

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
@import './styles/manage-post-audit-status.css';
</style>
