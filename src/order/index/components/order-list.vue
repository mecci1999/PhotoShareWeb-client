<template>
  <div class="order-list">
    OrderList
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default defineComponent({
  name: 'OrderList',

  /**
   * 属性
   */
  props: {
    filter: {
      type: Object,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      prevScrollTop: 0,
    };
  },

  /**
   * 监视
   */
  watch: {
    filter() {
      this.getOrders({ filter: this.filter });
    },
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      orders: 'order/index/orders',
      hasMore: 'order/index/hasMore',
      loading: 'order/index/loading',
    }),
  },

  /**
   * 已创建
   */
  created() {
    // 组件初始化完成请求动作
    this.getOrders({ filter: this.filter });

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
      getOrders: 'order/index/getOrders',
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
          this.getOrders({ filter: this.filter });
        }

        this.prevScrollTop = scrollTop;
      }
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/order-list.css';
</style>
