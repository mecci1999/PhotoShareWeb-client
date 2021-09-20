<template>
  <div class="post-show-header">
    <div class="content">
      <div class="text">
        <div class="title">{{ post.title }}</div>
        <PostShowEdit :post="post"></PostShowEdit>
      </div>
      <div class="meta">
        <UserName :user="post.user"></UserName>
      </div>
    </div>
    <div class="thumbnail">
      <UserAvatar :user="post.user" size="medium" link="user"></UserAvatar>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';
import PostShowEdit from '@/post/show/components/post-show-edit.vue';

export default defineComponent({
  name: 'PostShowHeader',

  /**
   * 属性
   */
  props: {
    post: {
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
    PostShowEdit,
  },
});
</script>

<style scoped>
@import './styles/post-show-header.css';
</style>
