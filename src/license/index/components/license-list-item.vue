<template>
  <div class="license-list-item">
    <div class="card">
      <div class="content">
        <div class="header">
          {{ licenseNumber }}
        </div>
        <div class="title">
          {{ item.resource.title }}
        </div>
        <div class="action">
          <button class="button basic">
            <AppIcon name="qr_code" color="#000" />
          </button>
        </div>
        <div class="meta">
          <UserAvatar :user="item.resource.user" link="user" />
          <UserName :user="item.resource.user" /> ©
        </div>
      </div>
      <div class="thumbnail">
        <PostImage :file="item.file" @click="onClickPostImage" />
        <AppQrcode v-if="false" />
      </div>
    </div>
    <div class="meta">
      <PaymentName :name="item.order.payment" />
      <AppDatetime :date="item.created" />
    </div>
    <a :href="fileDownloadUrl" ref="downloadLink"></a>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import AppDatetime from '@/app/components/app-datetime';
import AppIcon from '@/app/components/app-icon';
import AppQrcode from '@/app/components/app-qrcode';
import PaymentName from '@/payment/components/payment-name';
import PostImage from '@/post/components/post-image';
import UserAvatar from '@/user/components/user-avatar';
import UserName from '@/user/components/user-name';

export default defineComponent({
  name: 'LicenseListItem',

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
    ...mapGetters({
      fileDownloadUrl: 'download/create/fileDownloadUrl',
    }),

    licenseNumber() {
      return `${this.item.id}`.padStart(7, '0');
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
  methods: {
    ...mapActions({
      createDownload: 'download/create/createDownload',
      pushMessage: 'notification/pushMessage',
    }),

    async generateDownload() {
      try {
        await this.createDownload({
          fileId: this.item.file.id,
          data: {
            resourceType: 'post',
            resourceId: this.item.resource.id,
          },
        });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    async onClickPostImage() {
      await this.generateDownload();
      this.$refs.downloadLink.click();
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppIcon,
    AppQrcode,
    AppDatetime,
    UserAvatar,
    UserName,
    PaymentName,
    PostImage,
  },
});
</script>

<style scoped>
@import './styles/license-list-item.css';
</style>
