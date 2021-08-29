<template>
  <div class="user-show" v-if="user">
    <div class="user-show-header">
      <UserAvatar :user="user" size="large"></UserAvatar>
      <UserName :user="user" size="large"></UserName>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';

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
   * 已创建
   */
  created() {
    // 获取用户
    this.getUserById(this.userId);
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      getUserById: 'user/show/getUserById',
    }),
  },

  /**
   * 使用组件
   */
  components: {
    UserAvatar,
    UserName,
  },
});
</script>

<style scoped>
@import './styles/user-show.css';
</style>
