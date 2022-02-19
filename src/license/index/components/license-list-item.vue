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
          <button class="button basic" @click="onClickQrcodeButton">
            <AppIcon name="qr_code" color="#000" />
          </button>
        </div>
        <div class="meta">
          <UserAvatar :user="item.resource.user" link="user" />
          <UserName :user="item.resource.user" /> ©
        </div>
      </div>
      <div class="thumbnail">
        <transition name="license-list-item-thumbnail">
          <PostImage
            :file="item.file"
            @click="onClickPostImage"
            v-if="!showQrcode"
          />
        </transition>
        <transition name="license-list-item-thumbnail">
          <AppQrcode
            v-if="showQrcode"
            :padding="8"
            :size="112"
            background="none"
          />
        </transition>
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
import AppDatetime from '@/app/components/app-datetime.vue';
import AppIcon from '@/app/components/app-icon.vue';
import AppQrcode from '@/app/components/app-qrcode.vue';
import PaymentName from '@/payment/components/payment-name.vue';
import PostImage from '@/post/components/post-image.vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';

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
    return {
      showQrcode: false,
    };
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

    async onClickQrcodeButton() {
      this.showQrcode = !this.showQrcode;
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
