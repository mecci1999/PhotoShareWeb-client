<template>
  <div class="post-side-sheet-content-meta">
    <div class="item" v-for="(item, index) in postFileMetadata" :key="index">
      <div class="title">{{ item.title }}</div>
      <div class="value">{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default defineComponent({
  name: 'PostSideSheetContentMeta',

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
      postFileMetadata: 'post/sideSheet/postFileMetadata',
    }),
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
    ...mapActions({}),
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/post-side-sheet-content-meta.css';
</style>
