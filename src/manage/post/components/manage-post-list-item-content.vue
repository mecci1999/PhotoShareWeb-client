<template>
  <div class="manage-post-list-item-content">
    <div class="thumbnail">
      <UserAvatar :user="item.user" link="user"></UserAvatar>
    </div>
    <div class="meta">
      <UserName :user="item.user"></UserName>
    </div>
    <div class="header">
      <div class="text">
        <router-link class="link" :to="itemTitleLinkTo">
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';

export default defineComponent({
  name: 'ManagePostListItemContent',

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
    itemTitleLinkTo() {
      return {
        name: 'postShow',
        params: {
          postId: this.item.id,
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
@import './styles/manage-post-list-item-content.css';
</style>
