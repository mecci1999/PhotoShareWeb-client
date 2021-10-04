<template>
  <label class="checkbox-field" for="demo">
    <input class="input" id="demo" type="radio" name="demo" value="value" />
    <div class="icon"></div>
    <div class="text">选项</div>
  </label>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CheckboxField',

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
  components: {},
});
</script>

<style scoped>
@import './styles/checkbox-field.css';
</style>
