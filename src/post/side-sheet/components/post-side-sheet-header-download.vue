<template>
  <div class="post-side-sheet-header-download">
    <div class="image">
      IMAGE
    </div>
    <div class="header">
      HEADER
    </div>
    <div class="description">
      DESCRIPTION
    </div>
    <div class="action">
      ACTION
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

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
    ...mapGetters({}),
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
@import './styles/post-side-sheet-header-download.css';
</style>
