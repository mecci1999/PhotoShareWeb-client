<template>
  <div class="ban-list">
    <BanListHeader></BanListHeader>
    <BanListItem
      v-for="item in users"
      :key="item.user.id"
      :item="item"
    ></BanListItem>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import BanListHeader from './ban-list-header.vue';
import BanListItem from './ban-list-item.vue';

export default defineComponent({
  name: 'BanList',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      prevScrollTop: 0,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      users: 'user/ban/users',
      hasMore: 'user/ban/hasMore',
      loading: 'user/ban/loading',
    }),
  },

  /**
   * 已创建
   */
  created() {
    // 组件初始化完成请求动作
    this.getUsers();

    console.log(this.users);

    // 监听窗口滚动条事件
    if (window) {
      window.addEventListener('scroll', this.onScrollWindow);

      // 触发之后，滚动条恢复
      window.scrollTo({ top: 0 });
    }
  },

  /**
   * 取消挂载后
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
    ...mapMutations({}),

    ...mapActions({
      getUsers: 'user/ban/getUsers',
    }),

    onScrollWindow() {
      if (document) {
        const {
          scrollHeight,
          scrollTop,
          clientHeight,
        } = document.documentElement;

        const height = clientHeight + scrollTop + 200;

        const touchDown = scrollHeight - height < 0;

        const scrollDown = scrollTop > this.prevScrollTop;

        if (touchDown && scrollDown && !this.loading && this.hasMore) {
          this.getUsers();
        }

        this.prevScrollTop = scrollTop;
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    BanListHeader,
    BanListItem,
  },
});
</script>

<style scoped>
@import './styles/ban-list.css';
</style>
