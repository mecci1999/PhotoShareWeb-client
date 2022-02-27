<template>
  <div class="order-license-item" v-if="orderLicenseItem">
    <div class="thumbnail">
      <router-link :to="postImageLinkTo">
        <PostImage :file="file" />
      </router-link>
    </div>
    <div class="content">
      <div class="header">{{ title }}</div>
      <div class="meta">
        <OrderItemSales :sales="sales" />
      </div>
      <div class="extra">
        <UserAvatar :user="user" />
        <UserName :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import PostImage from '@/post/components/post-image.vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';
import OrderItemSales from '@/order/index/components/order-item-sales.vue';

export default defineComponent({
  name: 'OrderLicenseItem',

  /**
   * 属性
   */
  props: {
    order: {
      type: Object,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      orderLicenseItem: null,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    user() {
      return this.orderLicenseItem.user;
    },

    file() {
      return this.orderLicenseItem.file;
    },

    title() {
      return this.orderLicenseItem.title;
    },

    sales() {
      return this.orderLicenseItem.sales;
    },

    postImageLinkTo() {
      return {
        name: 'postShow',
        params: {
          postId: this.orderLicenseItem.id,
        },
      };
    },
  },

  /**
   * 已创建
   */
  async created() {
    // 使用getLicenseItem动作
    try {
      const response = await this.getOrderLicenseItem({
        order: this.order.id,
      });

      this.orderLicenseItem = response.data;
    } catch (error) {
      this.pushMessage({ content: error.data.message });
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      getOrderLicenseItem: 'order/show/getOrderLicenseItem',
      pushMessage: 'notification/pushMessage',
    }),
  },

  /**
   * 使用组件
   */
  components: {
    PostImage,
    OrderItemSales,
    UserAvatar,
    UserName,
  },
});
</script>

<style scoped>
@import './styles/order-license-item.css';
</style>
