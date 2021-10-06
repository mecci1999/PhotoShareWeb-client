<template>
  <label class="checkbox-field" :for="id">
    <input
      class="input"
      :id="id"
      :type="type"
      :name="name"
      :value="value"
      :checked="isChecked"
      @change="onChangeInput"
    />
    <div class="icon" v-if="useIcon"></div>
    <div class="text">{{ text }}</div>
  </label>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CheckboxField',

  /**
   * 属性
   */
  props: {
    modelValue: {},

    type: {
      type: String,
      default: 'checkbox',
    },

    name: {
      type: String,
    },

    value: {
      type: String,
    },

    text: {
      type: String,
    },

    useIcon: {
      type: Boolean,
      default: true,
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
    id() {
      return `${this.name}-${this.value}`;
    },

    isArray() {
      return Array.isArray(this.modelValue);
    },

    isChecked() {
      let isChecked;

      if (this.isArray) {
        isChecked = this.modelValue.includes(this.value);
      } else {
        isChecked = this.modelValue === this.value;
      }

      return isChecked;
    },
  },

  /**
   * 事件
   */
  emits: ['update:modelValue'],

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
    onChangeInput(event) {
      let value = event.target.value;

      if (this.isArray) {
        if (this.isChecked) {
          value = this.modelValue.filter(item => item != value);
        } else {
          value = [...this.modelValue, value];
        }
      }

      this.$emit('update:modelValue', value);
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/checkbox-field.css';
</style>
