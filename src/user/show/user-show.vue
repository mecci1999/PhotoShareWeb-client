<template>
  <div class="user-show" v-if="user">
    <div class="user-show-header">
      <UserAvatar :user="user" size="large"></UserAvatar>
      <UserName :user="user" size="large"></UserName>
    </div>
    <UserShowMenu :user="user"></UserShowMenu>
    <div class="user-show-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';
import UserShowMenu from '@/user/show/components/user-show-menu.vue';

export default defineComponent({
  name: 'UserShow',

  /**
   * 属性
   */
  props: {
    userId: {
      type: String,
    },
  },

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
      user: 'user/show/user',
    }),
  },

  /**
   * 监视
   */
  watch: {
    userId() {
      this.getUserById(this.userId);
    },
  },

  /**
   * 已创建
   */
  created() {
    // 获取用户
    this.getUserById(this.userId);

    if (window) {
      window.addEventListener('scroll', this.onScrollWindow);
    }
  },

  /**
   * 取消挂载
   */
  unmounted() {
    if (window) {
      window.removeEventListener('scroll', this.onScrollWindow);
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      getUserById: 'user/show/getUserById',
    }),

    ...mapMutations({
      setTouchdown: 'user/show/setTouchdown',
    }),

    onScrollWindow() {
      if (document) {
        // 解构数据
        const {
          scrollTop,
          scrollHeight,
          clientHeight,
        } = document.documentElement;

        if (scrollTop + clientHeight + 50 >= scrollHeight) {
          this.setTouchdown(true);
        }
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    UserAvatar,
    UserName,
    UserShowMenu,
  },
});
</script>

<style scoped>
@import './styles/user-show.css';
</style>
