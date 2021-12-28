<template>
  <div class="post-download-action">
    <button class="button basic" @click.stop="onClickDownloadButton">
      <AppIcon name="cloud_download"></AppIcon>
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'PostDownloadAction',

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
    ...mapMutations({
      setSideSheetComponent: 'layout/setSideSheetComponent',
      setSideSheetProps: 'layout/setSideSheetProps',
    }),

    ...mapActions({
      openSideSheet: 'layout/openSideSheet',
    }),

    onClickDownloadButton() {
      // 设置页面侧板组件
      this.setSideSheetComponent('PostSideSheet');

      // 设置页面侧板属性
      this.setSideSheetProps({
        post: this.post,
        disableCloseButton: false,
      });

      this.openSideSheet();
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppIcon,
  },
});
</script>

<style scoped>
@import './styles/post-download-action.css';
</style>
