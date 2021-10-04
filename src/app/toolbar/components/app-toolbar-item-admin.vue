<template>
  <div :class="appToolbarItemAdminClasses">
    <button class="button basic" @click="onClickAdminButton">
      <AppIcon name="admin_panel_settings"></AppIcon>
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'AppToolbarItemAdmin',

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
      useAdmin: 'user/useAdmin',
    }),

    appToolbarItemAdminClasses() {
      return ['app-toolbar-item', 'admin', { inactive: !this.useAdmin }];
    },
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
    ...mapMutations({
      setUseAdmin: 'user/setUseAdmin',
    }),

    ...mapActions({}),

    onClickAdminButton() {
      this.setUseAdmin(!this.useAdmin);

      const query = this.useAdmin ? { admin: true } : {};

      this.$router.replace({ query });
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppIcon,
  },
});
</script>

<style scoped>
@import './styles/app-toolbar-item-admin.css';
</style>
