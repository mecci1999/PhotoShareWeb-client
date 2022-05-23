<template>
  <div :class="fileCreateClasses">
    <FileCreateMedia
      v-if="previewImage || previewVideo"
      :isShowImage="imageFile"
      :isShowVideo="videoFile"
    />
    <FileCreateDragZone
      @change="onChangeDragZone"
      v-if="showFileCreateDragZone"
    />
    <FileCreateStatus v-if="uploading" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import FileCreateDragZone from '@/file/create/components/file-create-drag-zone.vue';
import FileCreateMedia from '@/file/create/components/file-create-media.vue';
import FileCreateStatus from '@/file/create/components/file-create-status.vue';

export default defineComponent({
  name: 'FileCreate',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      imageFile: false,
      videoFile: false,
    };
  },

  emits: ['change'],

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      previewImage: 'file/create/previewImage',
      uploading: 'file/create/uploading',
      isPendingAudit: 'post/create/isPendingAudit',
      isApprovedAudit: 'post/create/isApprovedAudit',
      previewVideo: 'file/create/previewVideo',
    }),

    fileCreateClasses() {
      return ['file-create', { active: this.previewImage }];
    },

    showFileCreateDragZone() {
      return !this.uploading && !this.isPendingAudit && !this.isApprovedAudit;
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
    ...mapMutations({
      setSelectedFile: 'file/create/setSelectedFile',
      setPreviewImage: 'file/create/setPreviewImage',
      setPreviewVideo: 'file/create/setPreviewVideo',
    }),

    ...mapActions({
      pushMessage: 'notification/pushMessage',
    }),

    async onChangeDragZone(files) {
      const file = files[0];
      console.log(file);

      if (!file) return;
      // 判断一下上传的文件类型
      if (file.type.slice(0, 5) === 'video') {
        this.videoFile = true;

        try {
          const result = await this.createVideoPreview(file);

          this.setSelectedFile(file);

          this.setPreviewVideo(result);
          console.log(this.previewVideo);
          this.$emit('change', files);
        } catch (error) {
          this.pushMessage({ content: error });
        }
      } else {
        this.imageFile = true;
        try {
          const result = await this.createImagePreview(file);
          this.setSelectedFile(file);

          this.setPreviewImage(result);

          this.$emit('change', files);
        } catch (error) {
          this.pushMessage({ content: error });
        }
      }
    },

    createImagePreview(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = event => {
          const image = new Image();

          image.src = event.target.result;

          image.onload = () => {
            // 进行判断图片的大小
            if (image.width > 960) {
              resolve(event.target.result);
            } else {
              reject('图像宽度小于 1280 像素');
            }
          };
        };
      });
    },

    createVideoPreview(file) {
      return new Promise((resolve, reject) => {
        const blob = new Blob(file, { type: 'video/mp4' });

        const reader = new FileReader();

        reader.readAsDataURL(blob);

        reader.onload = event => {
          const video = new HTMLVideoElement();

          video.src = event.target.result;

          video.onload = () => {
            // 进行判断视频文件的大小
            if (video.size <= 31457280) {
              resolve(event.target.result);
            } else {
              reject('视频过大');
            }
          };
        };
      });
    },
  },

  /**
   * 使用组件
   */
  components: {
    FileCreateStatus,
    FileCreateMedia,
    FileCreateDragZone,
  },
});
</script>

<style scoped>
@import './styles/file-create.css';
</style>
