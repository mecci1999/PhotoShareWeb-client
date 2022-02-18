<template>
  <div class="post-image">
    <img class="image" :src="imageUrl" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { API_BASE_URL } from '@/app/app.config';

export default defineComponent({
  name: 'PostImage',

  /**
   * 属性
   */
  props: {
    file: {
      type: Object,
    },

    size: {
      type: String,
      default: 'thumbnail',
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
    imageUrl() {
      return `${API_BASE_URL}/files/${this.file.id}/serve?size=${this.size}`;
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
  methods: {},

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/post-image.css';
</style>
