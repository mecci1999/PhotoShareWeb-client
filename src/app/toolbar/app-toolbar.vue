<template>
  <div class="app-toolbar">
    <transition class="app-toolbar-item-layout">
      <div class="app-toolbar-item layout" v-if="showPostListLayoutSwitcher">
        <PostListLayoutSwitcher></PostListLayoutSwitcher>
      </div>
    </transition>
    <PostShowNavigator></PostShowNavigator>
    <AppToolbarItemSearch></AppToolbarItemSearch>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import AppToolbarItemSearch from '@/app/toolbar/components/app-toolbar-item-search.vue';
import PostListLayoutSwitcher from '@/post/index/components/post-list-layout-switcher.vue';
import PostShowNavigator from '@/post/show/components/post-show-navigator.vue';

export default defineComponent({
  name: 'AppToolbar',

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
      showPostListLayoutSwitcher: 'toolbar/showPostListLayoutSwitcher',
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
  methods: {},

  /**
   * 使用组件
   */
  components: {
    AppToolbarItemSearch,
    PostListLayoutSwitcher,
    PostShowNavigator,
  },
});
</script>

<style scoped>
@import './styles/app-toobar.css';
</style>
