<template>
  <div class="post-side-sheet-header-download">
    <div class="image">
      <AppQrcode />
    </div>
    <div class="header">
      下载原版照片
    </div>
    <div class="description">
      生成二维码扫码下载或点击下载图标下载原版照片
    </div>
    <div class="action">
      <button class="button basic" @click="onClickDownloadButton">
        <AppIcon name="cloud_download" color="#ffffff3e" :size="32"></AppIcon>
      </button>
      <a :href="fileDownloadUrl" ref="downloadLink"></a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AppQrcode from '@/app/components/app-qrcode.vue';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'PostSideSheetHeaderDownload',

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
      fileDownloadUrl: 'download/create/fileDownloadUrl',
      download: 'download/create/download',
      sideSheetProps: 'layout/sideSheetProps',
    }),

    post() {
      return this.sideSheetProps.post;
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
    ...mapMutations({}),

    ...mapActions({
      pushMessage: 'notification/pushMessage',
      createDownload: 'download/create/createDownload',
    }),

    async onClickDownloadButton() {
      if (this.download) {
        this.$refs.downloadLink.click();
      } else {
        await this.generateDownload();
        if (this.download) {
          this.$refs.downloadLink.click();
        }
      }
    },

    async generateDownload() {
      try {
        await this.createDownload({
          fileId: this.post.file.id,
          data: {
            resourceType: 'post',
            resourceId: this.post.id,
          },
        });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppQrcode,
    AppIcon,
  },
});
</script>

<style scoped>
@import './styles/post-side-sheet-header-download.css';
</style>
