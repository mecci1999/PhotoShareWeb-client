<template>
  <div class="app-sidebar-item user">
    <UserAvatar
      :user="currentUser"
      :link="userAvatarLink"
      @click="onClickUserAvatar"
    ></UserAvatar>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'AppSidebarItemUser',

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
      currentUser: 'user/currentUser',
    }),

    userAvatarLink() {
      return this.currentUser ? null : 'login';
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
    onClickUserAvatar() {
      console.log('click');
    },
  },

  /**
   * 使用组件
   */
  components: {
    UserAvatar,
  },
});
</script>

<style scoped></style>
