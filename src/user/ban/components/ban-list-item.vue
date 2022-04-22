<template>
  <div class="ban-list-item">
    <div class="content">
      <div class="id">{{ item.user.id }}</div>
      <div class="user">
        <UserAvatar :user="item.user"></UserAvatar>
        <UserName :user="item.user"></UserName>
      </div>
      <div class="postAmount">{{ item.postAmount }}</div>
      <div class="commentAmount">{{ item.commentAmount }}</div>
      <div class="status">{{ item.status === 'normal' ? '正常' : '封禁' }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserName from '@/user/components/user-name.vue';
import UserAvatar from '@/user/components/user-avatar.vue';

export default defineComponent({
  name: 'BanListItem',

  /**
   * 属性
   */
  props: {
    item: {
      type: Object,
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
    UserAvatar,
    UserName,
  },
});
</script>

<style scoped>
@import './styles/ban-list-item.css';
</style>
