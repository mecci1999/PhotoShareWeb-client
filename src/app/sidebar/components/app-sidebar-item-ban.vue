<template>
  <div class="app-sidebar-item ban" v-if="isLoggedIn">
    <router-link class="link" :to="{ name: 'managePost' }">
      <AppIcon name="gavel"></AppIcon>
      <div class="text">审核</div>
    </router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppIcon from '@/app/components/app-icon.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'AppSidebarItemBann',

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
      isLoggedIn: 'auth/isLoggedIn',
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
    AppIcon,
  },
});
</script>

<style scoped>
@import './styles/app-sidebar-item-bann.css';
</style>
