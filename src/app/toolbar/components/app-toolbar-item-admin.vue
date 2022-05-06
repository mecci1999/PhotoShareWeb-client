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

      // 在数据页面点击管理员按钮情况
      if (this.$route.path === '/dashboard') {
        // 跳转至管理员数据页面
        this.$router.replace({ name: 'dashboardAdmin' });
      } else if (this.$route.path === '/dashboard/admin') {
        // 跳转至用户数据页面
        this.$router.replace({ name: 'dashboardAccessCount' });
      } else {
        const query = { ...this.$route.query };

        if (this.useAdmin) {
          query.admin = true;
        } else {
          delete query.admin;
        }

        this.$router.replace({ query });
      }
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
