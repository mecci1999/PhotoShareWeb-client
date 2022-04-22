<template>
  <div class="ban-index">
    <div class="header">头部</div>
    <div class="content">
      <BanList></BanList>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BanList from '@/user/ban/components/ban-list.vue';

export default defineComponent({
  name: 'BanIndex',

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
    BanList,
  },
});
</script>

<style scoped>
@import './styles/ban-index.css';
</style>
