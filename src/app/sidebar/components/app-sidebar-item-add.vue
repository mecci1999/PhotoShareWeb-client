<template>
  <div class="app-sidebar-item add" v-if="isLoggedIn">
    <router-link class="link" :to="{ name: 'postCreate' }">
      <AppIcon name="add_a_photo"></AppIcon>
      <div class="text">发布</div>
    </router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppIcon from '@/app/components/app-icon.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'AppSidebarItemAdd',

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

<style scoped></style>
