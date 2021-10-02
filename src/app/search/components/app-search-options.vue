<template>
  <div class="app-search-options">
    <AppSearchOption
      v-for="option in options"
      :key="option.type"
      :option="option"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppSearchOption from '@/app/search/components/app-search-option.vue';

export default defineComponent({
  name: 'AppSearchOptions',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      options: [
        {
          title: '标签',
          value: 'tags',
          query: 'name',
        },
        {
          title: '用户',
          value: 'users',
          query: 'name',
        },
        {
          title: '相机',
          value: 'cameras',
          query: 'makeModel',
        },
        {
          title: '镜头',
          value: 'lens',
          query: 'makeModel',
        },
      ],
    };
  },

  /**
   * 计算属性
   */
  computed: {},

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
    AppSearchOption,
  },
});
</script>

<style scoped>
@import './styles/app-search-options.css';
</style>
