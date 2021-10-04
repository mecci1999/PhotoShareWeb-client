<template>
  <div class="app-toolbar">
    <template v-if="!showAppSearch">
      <transition name="app-toolbar-item-layout">
        <div class="app-toolbar-item layout" v-if="showPostListLayoutSwitcher">
          <PostListLayoutSwitcher></PostListLayoutSwitcher>
        </div>
      </transition>
      <transition name="app-toolbar-item-navigator">
        <div class="app-toolbar-item navigator" v-if="showPostShowNavigator">
          <PostShowNavigator></PostShowNavigator>
        </div>
      </transition>
      <transition name="app-toolbar-item-side-sheet">
        <AppToolbarItemSideSheet v-if="showSideSheetItem" />
      </transition>
      <AppToolbarItemAdmin v-if="showAdminItem && isAdmin" />
    </template>
    <AppSearch v-if="showAppSearch" />
    <AppToolbarItemSearch></AppToolbarItemSearch>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import AppToolbarItemSearch from '@/app/toolbar/components/app-toolbar-item-search.vue';
import PostListLayoutSwitcher from '@/post/index/components/post-list-layout-switcher.vue';
import PostShowNavigator from '@/post/show/components/post-show-navigator.vue';
import AppToolbarItemSideSheet from '@/app/toolbar/components/app-toolbar-item-side-sheet.vue';
import AppSearch from '@/app/search/app-search.vue';
import AppToolbarItemAdmin from '@/app/toolbar/components/app-toolbar-item-admin.vue';

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
      showPostShowNavigator: 'toolbar/showPostShowNavigator',
      showSideSheetItem: 'toolbar/showSideSheetItem',
      showAppSearch: 'toolbar/showAppSearch',
      showAdminItem: 'toolbar/showAdminItem',
      isAdmin: 'user/isAdmin',
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
    AppToolbarItemAdmin,
    AppSearch,
    AppToolbarItemSideSheet,
    AppToolbarItemSearch,
    PostListLayoutSwitcher,
    PostShowNavigator,
  },
});
</script>

<style scoped>
@import './styles/app-toobar.css';
</style>
