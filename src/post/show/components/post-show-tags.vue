<template>
  <div class="post-show-tags">
    <PostTag
      v-for="tag in tags"
      :key="tag.name"
      :tag="tag"
      :size="size"
      :hasMoreTag="hasMoreTag"
      :postId="postId"
    ></PostTag>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import PostTag from '@/post/components/post-tag.vue';

export default defineComponent({
  name: 'PostShowTags',

  /**
   * 属性
   */
  props: {
    tags: {
      type: Array,
    },

    size: {
      type: String,
      default: 'normal',
    },

    hasMoreTag: {
      type: Boolean,
      default: false,
    },

    postId: {
      type: Number,
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
  computed: {},

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
  components: {
    PostTag,
  },
});
</script>

<style scoped>
@import './styles/post-show-tags.css';
</style>
