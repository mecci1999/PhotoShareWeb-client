<template>
  <div class="dashboard-user-info">
    <div class="header">
      <UserAvatar :user="currentUser" size="medium" />
      <UserName :user="currentUser" size="large" />
    </div>
    <div></div>
    <div class="subScription-info">
      <div class="title">订阅状态</div>
      <div class="text">{{ subscriptionInfo }}</div>
    </div>
    <div class="post-amount">
      <div class="title">我的作品数量</div>
      <div class="text">{{ postInfo }}</div>
    </div>
    <div class="comment-amount">
      <div class="title">我的评论数量</div>
      <div class="text">{{ commentInfo }}</div>
    </div>
    <div class="like-amount">
      <div class="title">我的点赞次数</div>
      <div class="text">{{ likeInfo }}</div>
    </div>
    <div class="download-amount">
      <div class="title">我的下载次数</div>
      <div class="text">{{ downloadInfo }}</div>
    </div>
    <div class="registry-time">
      <div class="title">注册时间</div>
      <div class="text">{{ registryTime }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';

export default defineComponent({
  name: 'DashboardUserInfo',

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

    subscriptionInfo() {
      if (this.currentUser.subscription) {
        if (this.currentUser.subscription.status === 'expired') {
          return '已过期';
        }

        return `于${this.currentUser.subscription.expiredtime}到期`;
      } else {
        return '未开通';
      }
    },

    postInfo() {
      if (this.currentUser.postAmount === 0) {
        return '暂未发布任何素材';
      } else {
        return `${this.currentUser.postAmount}`;
      }
    },

    commentInfo() {
      if (this.currentUser.commentAmount === 0) {
        return '暂未发布任何评论';
      } else {
        return `${this.currentUser.commentAmount}`;
      }
    },

    likeInfo() {
      if (this.currentUser.commentAmount === 0) {
        return '暂未点赞任何作品';
      } else {
        return `${this.currentUser.likeAmount}`;
      }
    },

    downloadInfo() {
      if (this.currentUser.downloadAmount === 0) {
        return '暂未下载任何作品';
      } else {
        return `${this.currentUser.downloadAmount}`;
      }
    },

    registryTime() {
      const year = this.currentUser.registrytime.slice(0, 4);
      const month = this.currentUser.registrytime.slice(4, 6);
      const day = this.currentUser.registrytime.slice(6, 8);
      const hour = this.currentUser.registrytime.slice(-2);

      return `${year}年${month}月${day}日${hour}时`;
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
@import './styles/dashboard-user-info.css';
</style>
