<template>
  <div class="app-search">
    <AppSearchField />
    <AppSearchOptions />
    <transition name="app-search-result-list">
      <AppSearchResultList v-if="hasSearchResults" />
    </transition>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AppSearchOptions from '@/app/search/components/app-search-options.vue';
import AppSearchField from '@/app/search/components/app-search-field.vue';
import AppSearchResultList from '@/app/search/components/app-search-result-list.vue';

export default defineComponent({
  name: 'AppSearch',

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
      hasSearchResults: 'search/hasSearchResults',
    }),
  },

  /**
   * 已创建
   */
  created() {
    if (window) {
      window.addEventListener('keydown', this.onKeyDownWindow);
    }
  },

  /**
   * 取消挂载
   */
  unmounted() {
    if (window) {
      window.removeEventListener('keydown', this.onKeyDownWindow);
    }

    this.setSearchResults(null);
    this.setSearchKeyword('');
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setSearchResults: 'search/setSearchResults',
      setSearchKeyword: 'search/setSearchKeyword',
    }),

    ...mapActions({}),

    onKeyDownWindow(event) {
      if (event.key === 'Escape') {
        this.setSearchResults(null);
        this.setSearchKeyword('');
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppSearchResultList,
    AppSearchOptions,
    AppSearchField,
  },
});
</script>

<style scoped>
@import './styles/app-search.css';
</style>
