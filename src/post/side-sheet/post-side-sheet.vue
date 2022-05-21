<template>
  <div class="post-side-sheet">
    <PostSideSheetHeader />
    <PostSideSheetTab />
    <PostSideSheetContent />
    <PostSideSheetActions />
    <PostSideSheetFooter />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { socket } from '@/app/app.service';
import PostSideSheetContent from '@/post/side-sheet/components/post-side-sheet-content.vue';
import PostSideSheetHeader from '@/post/side-sheet/components/post-side-sheet-header.vue';
import PostSideSheetActions from '@/post/side-sheet/components/post-side-sheet-actions.vue';
import PostSideSheetFooter from '@/post/side-sheet/components/post-side-sheet-footer.vue';
import PostSideSheetTab from '@/post/side-sheet/components/post-side-sheet-tab.vue';

export default defineComponent({
  name: 'PostSideSheet',

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
      sideSheetProps: 'layout/sideSheetProps',
      selectedProduct: 'product/select/selectedProduct',
      selectedPaymentName: 'payment/select/selectedPaymentName',
      post: 'post/show/post',
      currentUser: 'user/currentUser',
    }),
  },

  /**
   * 已创建
   */
  async created() {
    await this.initialize();

    // 检查啊当前用户是否为当前作品的作者
    if (this.currentUser.id === this.post.user.id) {
      this.setCanDownload(true);
    }

    socket.on('licenseStatusChanged', this.onLicenseStatusChanged);
    socket.on('subscriptionStatusChanged', this.onSubscriptionStatusChanged);
  },

  /**
   * 取消挂载
   */
  unmounted() {
    socket.off('licenseStatusChanged', this.onLicenseStatusChanged);
    socket.off('subscriptionStatusChanged', this.onSubscriptionStatusChanged);
  },

  /**
   * 监视
   */
  watch: {
    async sideSheetProps() {
      await this.initialize();

      // 检查啊当前用户是否为当前作品的作者
      if (this.currentUser.id === this.post.user.id) {
        this.setCanDownload(true);
      }
    },

    async selectedProduct(value, oldValue) {
      if (oldValue !== null) {
        await this.initialize();
      }
    },

    async selectedPaymentName(value, oldValue) {
      if (oldValue) {
        await this.updateOrderResolver();
      }
    },
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      initialize: 'post/sideSheet/initialize',
      updateOrderResolver: 'order/edit/updateOrderResolver',
      pushMessage: 'notification/pushMessage',
    }),

    ...mapMutations({
      setCanDownload: 'download/setCanDownload',
    }),

    onLicenseStatusChanged() {
      this.setCanDownload(true);
      this.pushMessage({ content: '成功购买许可' });
    },

    onSubscriptionStatusChanged() {
      this.setCanDownload(true);
      this.pushMessage({ content: '成功订阅会员' });
    },
  },

  /**
   * 使用组件
   */
  components: {
    PostSideSheetTab,
    PostSideSheetFooter,
    PostSideSheetActions,
    PostSideSheetHeader,
    PostSideSheetContent,
  },
});
</script>

<style scoped>
@import './styles/post-side-sheet.css';
</style>
