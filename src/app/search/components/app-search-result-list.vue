<template>
  <div class="app-search-result-list">
    <div class="header">
      <CloseButton @click="onClickCloseButton"></CloseButton>
    </div>
    <div class="content">
      <AppSearchResultListItem
        v-for="(result, index) in searchResults"
        :key="index"
        :item="result"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AppSearchResultListItem from '@/app/search/components/app-search-result-list-item.vue';
import CloseButton from '@/app/components/close-button.vue';

export default defineComponent({
  name: 'AppSearchResultList',

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
      searchResults: 'search/searchResults',
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
    ...mapMutations({
      setSearchResults: 'search/setSearchResults',
    }),

    ...mapActions({}),

    onClickCloseButton() {
      this.setSearchResults(null);
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppSearchResultListItem,
    CloseButton,
  },
});
</script>

<style scoped>
@import './styles/app-search-result-list.css';
</style>
