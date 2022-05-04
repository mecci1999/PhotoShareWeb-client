<template>
  <div class="post-like-action">
    <div class="icon">
      <button class="button basic" @click="onClickLikeButton">
        <AppIcon :name="likeIcon" :color="userLikeColor"></AppIcon>
      </button>
    </div>
    <div class="text">{{ post.totalLikes }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'PostLikeAction',

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
    likeIcon() {
      return this.post.liked ? 'favorite' : 'favorite_border';
    },

    userLikeColor() {
      return this.post.liked ? '#EA2027' : '';
    },

    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
      currentUser: 'user/currentUser',
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
  methods: {
    ...mapActions({
      pushMessage: 'notification/pushMessage',
      createUserLikePost: 'like/create/createUserLikePost',
      deleteUserLikePost: 'like/destroy/deleteUserLikePost',
    }),

    onClickLikeButton() {
      if (!this.isLoggedIn) {
        return this.pushMessage({ content: '请先登录' });
      }

      // 用户封禁状态时，不能发布作品
      if (this.currentUser && this.currentUser.status === 'banned') {
        return this.pushMessage({
          content: '当前账号处于封禁状态，无法点赞他人作品。',
        });
      }

      if (this.post.liked) {
        this.deleteUserLikePost({ postId: this.post.id });
      } else {
        this.createUserLikePost({ postId: this.post.id });
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
@import './styles/post-like-action.css';
</style>
