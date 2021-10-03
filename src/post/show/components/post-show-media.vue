<template>
  <div :class="postShowMediaClasses">
    <img class="image" :src="image" @load="onLoadImage" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { getImageBase64 } from '@/file/file.service';

export default defineComponent({
  name: 'PostShowMedia',

  /**
   * 属性
   */
  props: {
    post: {
      type: Object,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      loading: true,
      image: null,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    postShowMediaClasses() {
      return ['post-show-media', { loading: this.loading }];
    },
  },

  /**
   * 已创建
   */
  async created() {
    this.image = await getImageBase64(this.post.file.size.large);
  },

  /**
   * 组件方法
   */
  methods: {
    onLoadImage() {
      this.loading = false;
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/post-show-media.css';
</style>
