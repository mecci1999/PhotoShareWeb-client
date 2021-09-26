<template>
  <div class="manage">
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  name: 'Manage',

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
    if (window) {
      window.addEventListener('keydown', this.onKeyDownWindow);
    }
  },

  unmounted() {
    if (window) {
      window.removeEventListener('keydown', this.onKeyDownWindow);
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      manageSelectedItems: 'manage/select/manageSelectedItems',
    }),

    onKeyDownWindow(event) {
      if (this.hasSelected && event.key === 'Escape') {
        this.manageSelectedItems({
          resourcrType: 'post',
          actionType: 'reset',
        });
      }
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/manage.css';
</style>
