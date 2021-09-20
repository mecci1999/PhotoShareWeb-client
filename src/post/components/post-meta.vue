<template>
  <div class="post-meta">
    <div class="actions">
      <router-link class="link" :to="previewLinkTo">
        -> 查看 "<i>{{ post.title }}</i
        >"
      </router-link>
    </div>
    <div class="meta">
      <UserAvatar :user="post.user" link="user"></UserAvatar>
      <UserName :user="post.user"></UserName>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';

export default defineComponent({
  name: 'PostMeta',

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
  computed: {
    previewLinkTo() {
      return {
        name: 'postShow',
        params: {
          postId: this.post.id,
        },
      };
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
@import './styles/post-meta.css';
</style>
