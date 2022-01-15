<template>
  <div class="post-side-sheet-content-license" v-if="hasLicenseProduct">
    <div
      class="line"
      v-for="(line, index) in licenseProduct.description"
      :key="index"
    >
      {{ line }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'PostSideSheetContentLicense',

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
      hasLicenseProduct: 'product/show/hasLicenseProduct',
      licenseProduct: 'product/show/licenseProduct',
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
  components: {},
});
</script>

<style scoped>
@import './styles/post-side-sheet-content-license.css';
</style>
