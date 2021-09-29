<template>
  <div
    :class="fileCreateDragZoneClasses"
    @dragover.prevent
    @drop.prevent="onDropDragZone"
    @dragenter="onDragEnterDragZone"
    @dragleave="onDragLeaveDragZone"
  >
    <FileField
      name="file"
      @change="onChangeFile"
      fileType="image/jpg,image/jpeg"
      :text="fileFieldText"
    ></FileField>
    <div class="description">直接把图像文件拖放到这里</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import FileField from '@/app/components/file-field.vue';

export default defineComponent({
  name: 'FileCreateDragZone',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      isOverlay: false,
    };
  },

  emits: ['change'],

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      previewImage: 'file/create/previewImage',
    }),

    fileFieldText() {
      return '选择文件';
    },

    fileCreateDragZoneClasses() {
      return [
        'file-create-drag-zone',
        { overlay: this.isOverlay },
        { active: this.previewImage },
      ];
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
      pushMessage: 'notification/pushMessage',
    }),

    onChangeFile(files) {
      this.$emit('change', files);
    },

    onDropDragZone(event) {
      // 规定的上传类型
      const allowedFileTypes = ['image/jpg', 'image/jpeg'];

      // 上传的文件
      const selectedFile = event.dataTransfer.files[0];

      // 进行判断，观察当前上传的文件类型是否是规定的类型
      if (allowedFileTypes.some(type => type === selectedFile.type)) {
        this.$emit('change', event.dataTransfer.files);
      } else {
        this.pushMessage({ content: '不支持上传此类型的文件' });
      }

      this.isOverlay = false;
    },

    onDragEnterDragZone() {
      this.isOverlay = true;
    },

    onDragLeaveDragZone() {
      this.isOverlay = false;
    },
  },

  /**
   * 使用组件
   */
  components: {
    FileField,
  },
});
</script>

<style scoped>
@import './styles/file-create-drag-zone.css';
</style>
