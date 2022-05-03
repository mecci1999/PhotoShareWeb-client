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
      <div class="status">
        <div :class="userStatusClasses" @click="onClickUserStatusButton">
          {{ item.status === 'normal' ? '正常' : '封禁中' }}
        </div>
        <transition name="hide-button">
          <div
            :class="hideButtonClasses"
            v-show="showHideButton"
            @click="onClickHideButton"
          >
            {{ item.status === 'normal' ? '封禁' : '解封' }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
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
    return {
      // 是否点击按钮
      showHideButton: false,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    userStatusClasses() {
      return [
        'userStatusButton',
        { normal: this.item.status === 'normal' },
        { ban: this.item.status === 'banned' },
      ];
    },

    hideButtonClasses() {
      return [
        'hideButton',
        { ban: this.item.status === 'normal' },
        { unseal: this.item.status === 'banned' },
      ];
    },

    ...mapGetters({
      userStatus: 'user/ban/userStatus',
    }),
  },

  /**
   * 监视
   */
  watch: {
    //
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
    ...mapMutations({
      setUserStatus: 'user/ban/setUserStatus',
    }),

    ...mapActions({
      changeUserStatus: 'user/ban/changeUserStatus',
    }),

    onClickUserStatusButton() {
      this.showHideButton = !this.showHideButton;
    },

    async onClickHideButton() {
      this.setUserStatus(this.item.status);

      const userId = this.item.user.id;

      let status;
      switch (this.item.status) {
        case 'normal':
          status = 'banned';
          break;
        case 'banned':
          status = 'normal';
          break;
      }

      await this.changeUserStatus({ userId, status });

      this.showHideButton = false;
    },
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
@import './styles/ban-list-item.css';
</style>
