<template>
  <div class="post-side-sheet-header-download">
    <div class="image">
      <AppQrcode />
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
import AppQrcode from '@/app/components/app-qrcode.vue';

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
  components: {
    AppQrcode,
  },
});
</script>

<style scoped>
@import './styles/post-side-sheet-header-download.css';
</style>
