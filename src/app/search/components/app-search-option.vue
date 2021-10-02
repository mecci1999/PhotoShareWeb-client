<template>
  <div :class="appSearchOptionClasses">
    <button class="button basic" @click="onClickOptionButton(option)">
      {{ option.title }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default defineComponent({
  name: 'AppSearchOption',

  /**
   * 属性
   */
  props: {
    option: {
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
    ...mapGetters({
      searchOption: 'search/searchOption',
      searchKeyword: 'search/searchKeyword',
    }),

    appSearchOptionClasses() {
      return [
        'app-search-option',
        { active: this.searchOption.value === this.option.value },
      ];
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
      setSearchOption: 'search/setSearchOption',
      setSearchResults: 'search/setSearchResults',
    }),

    ...mapActions({
      search: 'search/search',
    }),

    onClickOptionButton(option) {
      this.setSearchResults(null);
      this.setSearchOption(option);

      if (this.searchKeyword) {
        this.search();
      }
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/app-search-option.css';
</style>
