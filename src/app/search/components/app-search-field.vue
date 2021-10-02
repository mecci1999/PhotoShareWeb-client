<template>
  <div class="app-search-field">
    <button class="button basic" @click="onClickSearchIconButton">
      <AppIcon name="search"></AppIcon>
    </button>
    <TextField
      v-model="keyword"
      :placeholder="placeholder"
      @keydown.enter="onKeyDownSearchField"
      ref="searchField"
    ></TextField>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';
import TextField from '@/app/components/text-field.vue';

export default defineComponent({
  name: 'AppSearchField',

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
      searchOption: 'search/searchOption',
      searchKeyword: 'search/searchKeyword',
    }),

    keyword: {
      get() {
        return this.searchKeyword;
      },

      set(value) {
        this.setSearchKeyword(value);
      },
    },

    placeholder() {
      return `搜索${this.searchOption.title}`;
    },
  },

  /**
   * 已创建
   */
  created() {
    //
  },

  /**
   * 挂载
   */
  mounted() {
    this.foucusSearchField();
  },

  /**
   * 监听
   */
  watch: {
    searchOption() {
      this.foucusSearchField();
    },
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setSearchKeyword: 'search/setSearchKeyword',
    }),
    ...mapActions({
      search: 'search/search',
      pushMessage: 'notification/pushMessage',
    }),

    async submitSearch() {
      const response = await this.search();

      console.log(response.data);

      if (!response.data.length) {
        this.pushMessage({ content: `没有找到相关${this.searchOption.title}` });
      }
    },

    onClickSearchIconButton() {
      this.submitSearch();
    },

    onKeyDownSearchField() {
      this.submitSearch();
    },

    foucusSearchField() {
      this.$refs.searchField.$el.querySelector('input').focus();
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppIcon,
    TextField,
  },
});
</script>

<style scoped>
@import './styles/app-search-field.css';
</style>
