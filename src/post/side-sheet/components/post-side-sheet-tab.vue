<template>
  <div class="post-side-sheet-tab" v-if="showPostSideSheetTab">
    <div
      :class="['item', { active: item.isActive }]"
      v-for="item in tabItems"
      :key="item.value"
    >
      <button class="button basic" @click="onClickTabButton(item.value)">
        {{ item.title }}
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default defineComponent({
  name: 'PostSideSheetTab',

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
      selectedProductType: 'product/select/selectedProductType',
      hasLicenseProduct: 'product/show/hasLicenseProduct',
      hasSubscriptionProducts: 'product/show/hasSubscriptionProducts',
      canDownload: 'download/canDownload',
    }),

    tabItems() {
      return [
        {
          title: '许可',
          value: 'license',
          isActive: this.selectedProductType === 'license',
        },
        {
          title: '订阅',
          value: 'subscription',
          isActive: this.selectedProductType === 'subscription',
        },
      ];
    },

    showPostSideSheetTab() {
      return (
        !this.canDownload &&
        this.hasLicenseProduct &&
        this.hasSubscriptionProducts
      );
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
      setSelectedProductType: 'product/select/setSelectedProductType',
    }),

    ...mapActions({}),

    onClickTabButton(value) {
      this.setSelectedProductType(value);
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/post-side-sheet-tab.css';
</style>
