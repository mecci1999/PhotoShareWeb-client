<template>
  <div class="comment-list-item-content">
    <div class="quote" v-if="item.repliedComment">
      <div class="thumbnail">
        <UserAvatar :user="repliedCommentUser" link="user"></UserAvatar>
      </div>
      <div class="replied-user">
        <UserName :user="repliedCommentUser"></UserName>
      </div>
      <div class="replied-content">{{ item.repliedComment.content }}</div>
    </div>
    <div class="content">{{ item.content }}</div>
    <div class="meta" v-if="item.post">
      <router-link class="link" :to="postTitleLinkTo">
        # {{ item.post.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';

export default defineComponent({
  name: 'CommentListItemContent',

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
  computed: {
    postTitleLinkTo() {
      return {
        name: 'postShow',
        params: {
          postId: this.item.post.id,
        },
      };
    },

    repliedCommentUser() {
      return {
        id: this.item.repliedComment.userId,
        name: this.item.repliedComment.name,
        avatar: this.item.repliedComment.avatar,
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
@import './styles/comment-list-item-content.css';
</style>
