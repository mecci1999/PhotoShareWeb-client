<template>
  <div class="license-list">
    <LicenseListItem
      v-for="license in licenses"
      :key="license.id"
      :item="license"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import LicenseListItem from '@/license/index/components/license-list-item.vue';

export default defineComponent({
  name: 'LicenseList',

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
      licenses: 'license/index/licenses',
    }),
  },

  /**
   * 已创建
   */
  created() {
    this.getLicenses();
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({}),

    ...mapActions({
      getLicenses: 'license/index/getLicenses',
    }),
  },

  /**
   * 使用组件
   */
  components: {
    LicenseListItem,
  },
});
</script>

<style scoped>
@import './styles/license-list.css';
</style>
