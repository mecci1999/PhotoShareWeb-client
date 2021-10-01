<template>
  <div class="app-toolbar-item search">
    <button class="button basic" @click="onClickSearchButton">
      <AppIcon :name="searchIcon"></AppIcon>
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'AppToolbarItemSearch',

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
      showAppSearch: 'toolbar/showAppSearch',
    }),

    searchIcon() {
      return this.showAppSearch ? 'close' : 'search';
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
    ...mapMutations({
      setShowAppSearch: 'toolbar/setShowAppSearch',
    }),

    onClickSearchButton() {
      this.setShowAppSearch(!this.showAppSearch);
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

<style scoped></style>
